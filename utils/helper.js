const access = require('../utils/access.js');

module.exports = {
  extractItem: function(msg) {
    let first = msg.split(' ')[0];
    let second = msg.split(' ')[1];
    let phrase = first + ' ' + second + ' ';
    let item = msg.split(phrase)[1];
    return item;
  },

  grantItem: function(id, item, con) {
    access.ownsSpecific(id, item, con, function(owns) {
      if (owns.length == 1) {
        let newItem = owns[0].quantity + 1;
        let updateItem = 'UPDATE owns SET quantity = ' + newItem + ' WHERE memberID = "' + id + '" AND itemID = ' + item;
        con.query(updateItem);
      }
      else {
        let newEntry = 'INSERT INTO owns VALUES("' + id + '", ' + item + ', ' + 1 + ')';
        con.query(newEntry);
      }
    });
  },

  loseItem: function(id, item, con) {
    access.ownsSpecific(id, item, con, function(res) {
      if (res.length == 1) {
        let newCount = res[0].quantity - 1;
        if (newCount == 0) {
          let sql = 'DELETE FROM owns WHERE memberID = "' + id + '" AND itemID = ' + item;
          con.query(sql);
        }
        else {
          let sql = 'UPDATE owns SET quantity = ' + newCount + ' WHERE memberID = "' + id + '" AND itemID = ' + item;
          con.query(sql);
        }
      }
    });
  },

  gainMoney: function(id, num, con) {
    access.memberByID(id, con, function(rows) {
      let total = rows[0].money + num;
      sql = 'UPDATE member SET money = ' + total + ' WHERE memberID = "' + id + '"';
      con.query(sql);
    });
  },

  loseMoney: function(id, amount, con) {
    let sql = 'UPDATE member SET money = ' + amount + ' WHERE memberID = "' + id + '"';
    con.query(sql);
  }
}
