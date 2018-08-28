const helper = require('../../utils/helper.js');

module.exports = {
  roll: function(msg) {
    let num = Number(msg.content.split(" ")[1]);
    if (!isNaN(num)) {
      let res = msg.author + ' ' + helper.ro(num);
      msg.channel.send(res);
    }
  },

  rng: function(msg) {
    let min = Number(msg.content.split(" ")[1]);
    let max = Number(msg.content.split(" ")[2]);
    if (!isNaN(min) && !isNaN(max)) {
      let res = msg.author + ' ' + helper.rn(min, max);
      msg.channel.send(res);
    }
  }
}
