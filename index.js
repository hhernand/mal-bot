const Discord = require('discord.js');
const mysql = require('mysql');
const bot = new Discord.Client();

var con;

if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
};

bot.on('message', (message) => {
  let msg = message.content.toLowerCase();

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
