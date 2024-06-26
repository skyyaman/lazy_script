const Template = require('../base/template');

const {sleep, writeFileJSON, singleRun} = require('../../lib/common');
const _ = require('lodash');
const {getMoment} = require('../../lib/moment');

const {doForm: _doForm, doFormWithClientTime: _doFormWithClientTime} = require('./api');

class LiteEarnCoins extends Template {
  static scriptName = 'LiteEarnCoins';
  static scriptNameDesc = '赚金币';
  static shareCodeTaskList = [];
  static commonParamFn = () => ({});
  static needInSpeedApp = true;
  static times = 1;
  static concurrent = true;
  static activityEndTime = '2024-05-07';

  static isSuccess(data) {
    return data['code'] === 0;
  }

  static async doMain(api) {
    const self = this;
    const doForm = _doForm.bind(0, api);
    const doFormWithClientTime = _doFormWithClientTime.bind(0, api);

    await handleDoTask();
    await getBubbles();
    await log();

    async function handleDoTask() {
      const taskList = await doForm('newTaskCenterPage').then(data => data.data || []);
      if (_.isEmpty(taskList)) {
        throw new Error('接口有异常');
      }
      for (const {taskName, taskType: activeType, taskInfo: {status}} of taskList) {
        if (status === 1/* || ['邀好友赚金币'].includes(taskName)*/) continue;
        if ([1, 2, 3].includes(activeType)) {
          await doTask(activeType);
        } else {
          await doFormWithClientTime('marketTaskRewardPayment', {activeType});
        }
      }

      async function doTask(activeType) {
        let activeId = '';
        if (activeType === 3) {
        } else {
          activeId = await doForm('queryNextTask', {activeType}).then(data => _.property('data.nextResource')(data));
          if (!activeId) return;
        }
        const commonData = {activeId, activeType};
        // await doForm('checkTaskResource', commonData);
        let {
          code,
          data: enterAndLeaveData,
          message,
        } = await doFormWithClientTime('enterAndLeave', _.assign({messageType: '1'}, commonData));
        let {
          uuid,
          taskInfo,
        } = enterAndLeaveData || {};
        if (code === 801) {
          api.logSignOut();
        }
        if (code !== 0) {
          if (message === '无此进入uuid信息') {
            commonData.activeId += '&__in_task_view__=jdLiteiOS';
          } else if (message === '当前任务已完成') {
            commonData.activeType = `${activeType}`;
          }
          uuid = await doFormWithClientTime('enterAndLeave', _.assign({messageType: '1'}, commonData)).then(_.property('data.uuid'));
        }
        if (!taskInfo) return;
        const videoTimeLength = taskInfo['videoBrowsing'] || '';
        await sleep(videoTimeLength || 10);
        const nextData = _.assign({messageType: '2', uuid, videoTimeLength}, commonData);
        await doFormWithClientTime('enterAndLeave', nextData).then(data => {
          if (data.message === '当前任务已完成') {
            nextData.activeType = `${activeType}`;
          }
          return doFormWithClientTime('enterAndLeave', nextData);
        });
        let rewardPaymentData = await doFormWithClientTime('rewardPayment', nextData);
        if ([901/*当前任务已完成*/, 906/*奖励非法*/].includes(rewardPaymentData.code) && uuid) {
          await sleep();
          rewardPaymentData = await doFormWithClientTime('rewardPayment', nextData);
        } else if (!self.isSuccess(rewardPaymentData)) {
          return;
        }
        const reward = _.get(rewardPaymentData, 'data.reward');
        reward && api.log(`获得金币 ${reward}`);
        const {
          isTaskLimit,
          taskCompletionLimit,
          taskCompletionProgress,
        } = _.get(rewardPaymentData, 'data.taskInfo', {});
        if (isTaskLimit === 1 || !taskCompletionLimit) return;
        if (taskCompletionProgress < taskCompletionLimit) return doTask(activeType);
      }
    }

    async function getBubbles() {
      const {taskBubbles} = await doForm('queryJoyPage').then(data => data.data) || {};
      if (!taskBubbles) return;
      for (const {id, activeType} of taskBubbles) {
        await doFormWithClientTime('joyTaskReward', {id, activeType});
      }
    }

    function log() {
      return doForm('queryJoyPage').then(data => {
        if (!self.isSuccess(data)) return;
        const {balanceVO} = data.data;
        const {goldBalance, estimatedAmount} = balanceVO;
        api.log(`红包(可兑换): ${estimatedAmount}, 金币: ${goldBalance}`);
      });
    }
  }
}

singleRun(LiteEarnCoins).then();

module.exports = LiteEarnCoins;
