const Discord = require('discord.js');
const mysql = require('mysql');
const bot = new Discord.Client();

const db = require('require-dir-all')('./commands/db');

var con;

if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
};

bot.on('message', (message) => {
  let msg = message.content.toLowerCase();

  // member commands

  if (msg.startsWith('!add ')) {
    db.member.addMember(message, con);
  }

  if (msg == '!myinfo') {
    db.member.myInfo(message, Discord, con);
  }

  // shop

  if (msg == '!shop') {
    db.shop.shopList(message, Discord, con);
  }

  // mod commands

  if (msg.startsWith('!rewardmoney ')) {
    db.money.rewardMoney(message, con);
  }

  // misc

  if (msg == 'hi mal!') {
    message.channel.send('Greetings ' + message.author.username + '.');
  }

  if (msg == 'thank you mal') {
    message.channel.send('Happy to be of assistance.');
  }

  if (msg == 'this is so sad mal play despacito') {
    message.channel.send("https://youtu.be/kJQP7kiw5Fk");
  }

});

bot.login(process.env.BOT_TOKEN);
