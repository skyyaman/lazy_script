const _ = require('lodash');

let urls = `
https://prodev.m.jd.com/wq/active/zhgThYzJUUTJiwRcJNNf2jNkcVL/index.html?isMiniProgram=1&taskId=N7sek9aeWBUdsMr4bV3gGm24pwj&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=41Sqa52au2f5PvupGf5oyB1aHApy&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/34G4aLZqete3T2VDrQfwa4z5hdAm/index.html?isMiniProgram=1&taskId=k5HVYAbszb7hkjfU4x8RxP8847P&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=3xKzyMsMN8Y6mvsEd2w9PLYD4UXU&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/ydoAn3s66UT2m1gACvhm3zHpxdF/index.html?isMiniProgram=1&taskId=beiqwgek371zZhku4RBYicQ6heY&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=kiXUhribMU1swY4Cv46ac6UDb3o&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/T7dXCMdvEi1wnmKE4AKV3Yzds7P/index.html?isMiniProgram=1&taskId=5Y2urpLvRtVmacyKcUuvrcMWt2o&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=aE65v2C2rS9kxU6ZMYp4fxx1c1Y&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/4BGAWjgaaZYgWexk9tRCrUJiPnbf/index.html?isMiniProgram=1&taskId=GNX5VVNsxoEsLknu7NhBUAmvGNo&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=4NupgbKzDR1oVkbhVeMghwMbBUrz&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2QbwsNkqqeNvi5GHCNazwDk9aUpf/index.html?isMiniProgram=1&taskId=21b2oSaa8syUud3ay1FeHh7NcfMp&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=kVveKyY6MgJdW4VfBuKQAKcNeHs&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2MPC9TkXiz3wqTVKrXn8MiFTnwKe/index.html?isMiniProgram=1&taskId=3Fn8ZB55ryU3uCW3qUsHGeVKgHYB&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=48CYjHwFUcwcbNg4BnEv1DCrXPP4&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/36TEJ3vwe5ZyzCmpkSUVnondXWNo/index.html?isMiniProgram=1&taskId=4A4tNcyGWMKfjJ142nZyHhY1uX6c&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=436a8YDa5J86uGEwMH9yLDjScUi9&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3u8cjhs828cfvWNfLcas4Pja259T/index.html?isMiniProgram=1&taskId=3FCQS1fEnrv6YkAhxqvhf1cmeozD&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=2YJZt8e9dByDkMncEzA1wTt7xSAp&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/cE6bjVtP1MuFjJAW5qSm8risNWW/index.html?isMiniProgram=1&taskId=QGuX78dJFuH5Ci94KTKLvoBkNDy&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=3r6DaJvN1x8h8VDomGJHnrFZVT5N&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3iUrxumuSBfGQ6e1tNR9aXnMte6E/index.html?isMiniProgram=1&taskId=4FG4ZrXENVeSzFTjVAzb7o7gHxih&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=sqRwhyYJDEaqmGeHtBJCkRyp6tY&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/28YeXVJGJAMx74itdyTELfrjDBGE/index.html?isMiniProgram=1&taskId=3XGeDGXnLrgL4d6LQ5VHbEyStfTJ&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=3LDnRyuhF8qRJmYaigm4YFz5NwKJ&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3qL26JBFAKyMytA9iz3QrfHmBDcD/index.html?isMiniProgram=1&taskId=35eLcRSU15NDkj6DQJfbGtcow3oj&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=4DTUJKaU7EBrwn64dmcf2SrqvQBj&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2RAzYKucUKMEJvnERgKyMrAsVLUF/index.html?isMiniProgram=1&taskId=56nWprFq6YBQjqoJcpgnxszYbW3&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=3KUonXvqqjsp3tchuuN8PAMx3Qho&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/4PLLV89hQf5WxwphbTGU1TyHYCoq/index.html?isMiniProgram=1&taskId=Epe47CLeRmWXYzNHEf7cdsqBsdv&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=CDGqmq2LSXe4wGSg7R8CC7Cqovd&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3LTkfg7avJfVmU6PFbAe5LXq1zQE/index.html?isMiniProgram=1&taskId=3B2A3ZXVr23f8BBDJgceNibVeHBR&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=2nSApGo9czTfL92DkcMvtdjYSpR8&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/41jxHQxuiY2oH92MTHmpVzrz2Xvm/index.html?isMiniProgram=1&taskId=cDZ4FbY4Wqg12mTsH3bydknFjaR&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=atoRzsDoiaowfiQZb6m2LfSQw6F&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/25GqCGZRzPr2s4v1ZBPiDPR2Uyca/index.html?isMiniProgram=1&taskId=SK5bpMr5kdrFQDcR2GuPiXPtuDn&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=4R9d37iZVaZiZFNNUjQ1jiZMbxHo&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3YtVAuEDBhUjfbJcSnbVpsJR1dfJ/index.html?babelChannel=ttt1&isMiniProgram=1&taskId=3xf2zFfR14QFre13q63WsJ9Doqb1&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=28eBiBKpV3NPpTxindCDZSuAsFpS&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/341osRSo5a1rN9tgwM9xhHuTbFxR/index.html?isMiniProgram=1&taskId=q3BPJeVfB7cPRqN6PmUTivZRzRg&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=4X7ZWptcZ7rozY2Wz7pg61wXvT4q&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2PhfCTqDYLwMn2dtxtVYo1iQcT2H/index.html?isMiniProgram=1&taskId=3C5qBW1oBLwj888Z9gKyc7KKo1of&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=35T5JNizyJ32ajzEQG7HyVEBUcdv&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3duvfwJZWS7Jui1PhHGtn3LuEU25/index.html?isMiniProgram=1&taskId=2BLkLv2FnPE83iFGvoZPLv68wCc8&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=22V8W8hbaD9G5y9FjT9SuGMGZYF9&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/48DEUPoW7zwAKvYq63XG2sg4XazX/index.html?isMiniProgram=1&taskId=3KzQiQnfwhPq1M1orPFoMBmL81L9&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=rspy1WKP55RBW3YBHYuGs2y55yF&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2pg3a4nVEQfiHLzs2HRHtw982kk2/index.html?isMiniProgram=1&taskId=2pTfswV5zD9cgt3h5S5N5XXGiJxq&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=BozgzBGyETrovmnQygNRebYs6Yw&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2rG9j5mg4GjbCrtLhDTDWs59Q9F5/index.html?isMiniProgram=1&taskId=21kaeaBFeJ3opsHCXwZT31VSyYX3&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=2JkR87ssvuv9sPews61qHuzfPdRx&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/N681mDg348iZb3vCuYNM6Jqeb3n/index.html?isMiniProgram=1&taskId=44Lk6xpgq4x3wFYPUe8VKzWTYYGQ&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=2dcgFFizsPbYQBFjB8zuvwDHXunk&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/rL7eJx9bB19FaaFfyGFjZTBHnsF/index.html?isMiniProgram=1&taskId=4BjnQR6HMNDU9bqEp1fcmgoGnATk&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=c4trKDtCFmsg5M2rn4EM1ayFrYW&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2MasrG2y9ZHehqm9ZygLYQyTu1DK/index.html?isMiniProgram=1&taskId=45eM71oKkzC5XRucJX5E9tucKaVV&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=2cxyia32LDeYdvt5auYrLxkSgBuZ&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/93ipJZXDgnVN1NFfJtsvuiQ9UJR/index.html?isMiniProgram=1&taskId=2Sh3CKRH6VnBdaTzGThLpTect1F6&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=4JNuVbQVMxvcyvc9Lp7ZYn6ktHfX&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/38gvTMGdkz5mzz4WutdTDiQdbALN/index.html?isMiniProgram=1&taskId=4AoZB7huNV3umiHP8MnxDn9XeDEo&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=rMXP46uctoGcm6RDQmVRTPt5YHZ&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2oduPXfoApjYeEsxLLmd2edjS29o/index.html?isMiniProgram=1&taskId=4UTJaox8NNWqfwUYKMnjexrvPgp4&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=gydkCGAG2Nk128oSo83VBAKXLoH&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/3qSQit28iinmtH7NN1uRniBbXEws/index.html?isMiniProgram=1&taskId=L6u6YUY3WntrNzFc5C2SnPQCW5s&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=48NkzPANbR68QZtX4VfToCQ9E8bW&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
https://prodev.m.jd.com/wq/active/2am5NYXc2j35HVPCTTx52DPMXhbJ/index.html?isMiniProgram=1&taskId=3gdvVQ3pVGcogc2THodDEiHy8Urv&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=4DJJxbwD2MjWG8qWHMRC66C9dfNM&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
`;

// // 非12点抢的团(SK-11)
// urls = `
// https://prodev.m.jd.com/wq/active/4J8vT89TNgpwsKGCG4b6NH1NKEom/index.html?isMiniProgram=1&taskId=ZUxsfnm8y6ifNavE96ZdWDBjPk4&inviteId=Sv_h1QhgY81XeKR6b1A&activityId=3AtgviqSSkLEJJXyTjagE55yDF3U&cookie=%7B%22wxapp_type%22%3A%2214%22%7D
// `

const mainKey = 'activityId';
const urlList = _.filter(urls.split('\n'));
let urlData = _.uniqBy(urlList.map(url => {
  const result = {};
  [mainKey, 'taskId'].forEach(key => {
    result[key] = new URL(url).searchParams.get(key);
  });
  return result;
}), mainKey);
urlData = _.filter(urlData, mainKey);
console.log('url个数: ' + _.uniq(urlList).length);
console.log('data个数: ' + _.uniq(urlData).length);

module.exports = urlData;