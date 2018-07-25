const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  take: function(msg, con) {
    let data = msg.content.split(" ");
    let user = data[1];
    let item = helper.extractItem(msg.content);

    access.memberByName(user, con, function(member) {
      if (member.length == 1) {
        access.itemByName(item, con, function(i) {
          let mID = member[0].memberID;
          let iID = i[0].itemID;
          helper.loseItem(mID, iID, con);
          msg.channel.send(i[0].name + ' taken from ' + member[0].name + '.');
        });
      }
    });
  }
}
