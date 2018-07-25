module.exports = {
  roll: function(msg) {
    let num = Number(msg.content.split(" ")[1]);
    if (!isNaN(num)) {
      let res = msg.author + ' ' + Math.ceil(Math.random() * num);
      msg.channel.send(res);
    }
  },

  rng: function(msg) {
    let min = Number(msg.content.split(" ")[1]);
    let max = Number(msg.content.split(" ")[2]);
    if (!isNaN(min) && !isNaN(max)) {
      let res = msg.author + ' ' + Math.floor(Math.random() * (max-min+1) + min);
      msg.channel.send(res);
    }
  }
}
