const Discord = require('discord.js');
const mysql = require('mysql');
const bot = new Discord.Client();

const db = require('require-dir-all')('./commands/db');
const other = require('require-dir-all')('./commands/other');

var con;

if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
};

bot.on('message', (message) => {
  let msg = message.content.toLowerCase();

  // member commands

  if (message.channel.id == '466370937562857474') {
    if (msg.startsWith('!add ')) {
      db.member.addMember(message, con);
    }
  }

  if (msg == '!myinfo') {
    db.member.myInfo(message, Discord, con);
  }

  if (msg.startsWith('!search ')) {
    db.char.search(message, Discord, con);
  }

  if (msg.startsWith('!createtag')) {
    db.tag.createTag(message, con);
  }

  if (msg.startsWith('!t ')) {
    db.tag.tagRes(message, con);
  }

  if (msg.startsWith('!updatetag ')) {
    db.tag.updateTag(message, con);
  }

  if (msg.startsWith('!roll ')) {
    other.rng.roll(message);
  }

  if (msg.startsWith('!rng ')) {
    other.rng.rng(message);
  }

  if (msg == 'mal, bunny pls') {
    db.bunny.showBunny(message, con);
  }

  // shop

  if (message.channel.id == '466371378917015558') {
    if (msg == '!shop') {
      db.shop.shopList(message, Discord, con);
    }

    if (msg.startsWith('!buy ')) {
      db.shop.buy(message, con);
    }
  }

  // mod commands

  if (message.channel.id == '466375930907197451') {
    if (msg.startsWith('!rewardmoney ')) {
      db.money.rewardMoney(message, con);
    }

    if (msg.startsWith('!take ')) {
      db.item.take(message, con);
    }

    if (msg.startsWith('mal, add bunny')){
      db.bunny.addBunny(message, con);
    }
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
