const access = require('../../utils/access.js');
const helper = require('../../utils/helper.js');

module.exports = {
  search: function(msg, ds, con) {
    let type = msg.content.split(' ')[1];

    if (type != 'agent' && type != 'civilian') {
      msg.channel.send('Character type has been misspelled or not declared. Are they an agent or a civilian?');
    }
    else {
      let name = msg.content.split(type + ' ')[1].split(' ');
      let names = helper.nameConcat(name, name.length);

      let fname = '';
      let lname = '';

      for (i = 0; i < names.length; i++) {
        if (i == 0) {
          lname = names[0][1];
        }
        else if (i == names.length - 1) {
          lname = '';
          fname = names[names.length - 1][0];
        }
        else {
          fname = names[i][0];
          lname = names[i][1];
        }

        access.charByName(type, fname, lname, con, function(char) {
          if (char.length == 1) {
            let id = '';
            let n = char[0].fname + ' ' + char[0].lname + ', age ' + char[0].age;
            let rank = '';
            let stats = '';
            let notes = '';

            if (type == 'agent') {
              id = 'ID # ' + char[0].aid + '\n';
              rank = 'Rank ' + char[0].rank + '\n';

              let stars = ['     ', '*    ', '**   ', '***  ', '**** ', '*****']
              stats = 'STAM: ' + stars[char[0].stam] + '   MAG:  ' + stars[char[0].mag] + '\n' +
                      'STR:  ' + stars[char[0].str] + '   HEAL: ' + stars[char[0].heal] + '\n' +
                      'SKL:  ' + stars[char[0].skl] + '   REGN: ' + stars[char[0].regn] + '\n' +
                      'INIT: ' + stars[char[0].init] + '   CRIT: ' + stars[char[0].crit] + '\n' +
                      'RST:  ' + stars[char[0].rst] + '   DSCR: ' + stars[char[0].dscr] + '\n' +
                      'AGI:  ' + stars[char[0].agi] + '   RNG:  ' + stars[char[0].rng] + '\n' +
                      'ACC:  ' + stars[char[0].acc] + '   POW:  ' + stars[char[0].pow] + '\n' +
                      'EVA:  ' + stars[char[0].eva] + '   SUPT: ' + stars[char[0].supt] + '     ';
            }
            else if (type == 'civilian') {
              notes = 'Important Notes: \n' + char[0].notes;
            }

            let info = '```' + id + n + '\n' + rank + char[0].species + '\n\n' + stats + notes + '```';

            const embed = new ds.RichEmbed()
              .setColor('GREEN')
              .setThumbnail(char[0].img)
              .setDescription(info);

            msg.channel.send(embed);
          }
        })
      }
    }
  }
}
