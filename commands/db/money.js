const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  rewardMoney: function(msg, con) {
    let data = msg.content.split(" ");
    let user = data[1];
    let add = Number(data[2]);

    access.memberByName(user, con, function(member) {
      if (member.length == 1) {
        let id = member[0].memberID;
        helper.gainMoney(id, add, con);
        msg.channel.send("£" + add + " given to " + user + ".");
      }
    });
  }
}
