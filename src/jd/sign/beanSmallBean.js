const Template = require('../base/template');

const {sleep, writeFileJSON, singleRun} = require('../../lib/common');
const _ = require('lodash');

const {smallBean} = require('../../../charles/api');

// 活动入口
const indexUrl = 'https://h5.m.jd.com/rn/42yjy8na6pFsq1cx9MJQ5aTgu3kX/index.html';

class BeanSmallBean extends Template {
  static scriptName = 'BeanSmallBean';
  static scriptNameDesc = '豆小豆';
  static times = 1;

  static apiOptions = {
    options: {
      qs: {
        appid: 'ld',
      },
    },
  };

  static async doMain(api) {
    const self = this;

    const getTaskList = () => api.doForm('beanTaskList').then(data => _.property('data.taskInfos')(data) || []);
    const getTaskById = taskId => getTaskList().then(taskList => taskList.find(o => o['taskId'] === taskId));

    await findBeanScene();

    const taskList = await getTaskList();
    for (let {taskId, status, subTitleName, maxTimes, times, subTaskVOS, waitDuration = 0} of taskList) {
      const {title} = subTaskVOS[0] || {};
      if (maxTimes === times || status === 2 || ['下单抵现', '双签领豆'].includes(title)) continue;
      waitDuration = waitDuration || _.last(subTitleName.match(/(\d+)s/));
      for (let i = times; i < maxTimes; i++) {
        const taskInfo = _.property('subTaskVOS')(await getTaskById(taskId));
        if (!taskInfo) continue;
        const [{taskToken}] = taskInfo;
        await doTask(taskToken, +waitDuration);
      }
    }

    await findBeanScene();

    async function doTask(taskToken, waitDuration) {
      const _do = (actionType = 0) => api.doFormBody('beanDoTask', {actionType, taskToken});
      await _do(waitDuration ? 1 : void 0);
      if (!waitDuration) return;
      await sleep(waitDuration);
      await _do();
    }

    async function findBeanScene() {
      // 接口 404
      return;
      return api.doFormBody('findBeanScene', {
        'source': null,
        'orderId': null,
        'jklGroupCode': null,
        'jklShareCode': null,
        'jklActivityId': null,
        'rnVersion': '3.9',
        'rnClient': '1',
      }).then(data => {
        const {curScene} = data.data || {};
        if (!curScene) return;
        const {growth, level, sceneLevelConfig: {growthEnd, beanNum}} = curScene;
        const msg = [
          `当前成长值: ${growth}`,
          `等级: ${level}`,
          `下一个目标为: ${growthEnd}, 将得到豆豆: ${beanNum}`,
        ];
        api.log(msg.join(', '));
      });
    }
  }
}

singleRun(BeanSmallBean).then();

module.exports = BeanSmallBean;
