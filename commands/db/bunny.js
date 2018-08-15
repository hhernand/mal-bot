module.exports = {
  addBunny: function(msg, con) {
    let link = msg.content.split(" ")[3];
    con.query('SELECT * FROM bunny', (err, rows) => {
      let id = rows.length + 1;
      let sql = 'INSERT INTO bunny VALUES (' + id + ', "' + link + '")';
      con.query(sql);
    });
    msg.channel.send("Bunny has been added.");
  },
  showBunny: function(msg, con) {
    con.query('SELECT * FROM bunny', (err, rows) => {
      let num = rows.length;
      let id = (Math.floor(Math.random() * num)) + 1;
      let sql = 'SELECT link FROM bunny WHERE bid = ' + id;

      con.query(sql, (err2, rows2) => {
        msg.channel.send(rows2[0].link);
      });
    });
  }
};
