const access = require('../../utils/access.js');

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
  }
}
