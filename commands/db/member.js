const async = require('async');
const access = require('../../utils/access.js');

module.exports = {
  addMember: function(msg, con) {
    let id = msg.author.id;
    let name = msg.content.split(" ")[1];
    let sql = 'INSERT INTO member VALUES ("' + id + '", "' + name + '", 0)';
    con.query(sql);
    let res = 'Greetings ' + name + '. Welcome to ODD.'
    msg.channel.send(res);
  },

  myInfo: function(msg, ds, con) {
    let id = msg.author.id;

    access.memberByID(id, con, function(member) {
      if (member.length == 1) {
        let user = member[0].name;
        let num = member[0].money;

        access.owns(id, con, function(owned) {
          if (owned.length == 0) {
            const embed = new ds.RichEmbed()
              .setTitle(msg.author.username)
              .setColor('BLUE')
              .setThumbnail(msg.author.avatarURL)
              .addField('DA Username', user, true)
              .addField('Money', num, true);

            msg.channel.send(embed);
          }
          else {
            var res = '';
            var q = '';

            async.eachSeries(owned, function(el, callback) {

              access.itemByID(el.itemID, con, function(entry) {
                if (el.quantity > 1) q = ' x ' + String(el.quantity);
                res += entry[0].name + q + '\n';
                callback();
              });

              q = '';
            },
            function(err, owned) {
              const embed = new ds.RichEmbed()
                .setTitle(msg.author.username)
                .setColor('BLUE')
                .setThumbnail(msg.author.avatarURL)
                .addField('DA Username', user, true)
                .addField('Money', num, true)
                .addField('Items', res);

              msg.channel.send(embed);
            });
          }
        });
      }
    });
  },
}
