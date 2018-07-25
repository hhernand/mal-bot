const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  shopList: function(msg, ds, con) {
    var list = ''
    let iName = '';
    let iPrice = 0;
    access.shop(con, function(items) {
      for (let i = 0; i < items.length; i++) {
        iName = items[i].name;
        iPrice = items[i].cost;
        list += iName + ' - £' + iPrice + '\n';
      }
      const embed = new ds.RichEmbed()
        .setTitle('Oddity Shop')
        .setFooter('To purchase an item, type !buy 1 item. Items can also be sold back to Mal for 1/3 its original price using !sell 1 item. You can set the quantity.')
        .setColor('AQUA')
        .addField('Items', list, true)

      msg.channel.send(embed);
    })
  },

  buy: function(msg, con) {
    let buyerID = msg.author.id;
    let want = Number(msg.content.split(' ')[1]);
    if (!isNaN(want) && want > 0) {
      let item = helper.extractItem(msg.content);

      access.itemByName(item, con, function(i) {
        if (i.length == 0) {
          msg.channel.send('That item cannot be found in the shop.');
        }
        if (i.length == 1) {
          let price = i[0].cost * want;
          access.memberByID(buyerID, con, function(member) {
            if (member.length == 0) {
              msg.channel.send('You are currently not in the database.');
            }
            else {
              let mon = member[0].money;
              if (price > mon) {
                msg.channel.send('You currently do not have enough money to purchase that item.');
              }
              else {
                let newMon = mon - price;
                let iID = i[0].itemID;
                helper.grantItem(buyerID, iID, want, con);
                helper.loseMoney(buyerID, newMon, con);
                let res = 'You have purchased ' + want + ' ' + i[0].name + ' for £' + price + '. Please use !myinfo to confirm that you obtained your item.'
                msg.channel.send(res);
              }
            }
          })
        }
      })
    }
  }
}
