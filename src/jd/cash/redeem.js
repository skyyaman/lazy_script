const Cash = require('./index');
const {sleepTime} = require('../../lib/cron');
const {singleRun} = require('../../lib/common');
const {cash} = require('../../../charles/api');

class CashRedeem extends Cash {
  static scriptName = 'CashRedeem';
  static scriptNameDesc = '领现金-兑换红包';
  static times = 1;
  static repeatDoTask = false;
  static concurrent = true;
  static concurrentOnceDelay = 0;

  static async doMain(api, shareCodes) {
    const self = this;

    await sleepTime(24);
    await getRedPacket();

    function getRedPacket() {
      return api.doForm('cash_getRedPacket', cash.cash_getRedPacket[0]).then(data => {
        if (!self.isSuccess(data)) return self.log(data.data.bizMsg);
        self.log(`兑换红包成功: ${data.data.result.amountYuan}`);
        // 继续兑换
        return getRedPacket();
      });
    }
  }
}

singleRun(CashRedeem).then();

module.exports = CashRedeem;