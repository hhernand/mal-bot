module.exports = {
  memberByID: function(id, con, callback) {
    let sql = 'SELECT * FROM member WHERE memberID = "' + id + '"';
    con.query(sql, (err, member) => {
      if (err) callback(err);
      callback(member);
    });
  },

  memberByName: function(name, con, callback) {
    let sql = 'SELECT * FROM member WHERE name = "' + name + '"';
    con.query(sql, (err, member) => {
      if (err) callback(err);
      callback(member);
    });
  },

  charByName: function(type, fname, lname, con, callback) {
    let sql = '';
    if (fname != '' && lname != '') {
      sql = 'SELECT * FROM ' + type + ' WHERE fname LIKE "%' + fname + '%" AND lname LIKE "%' + lname + '%"';
    }
    else if (fname == '') {
      sql = 'SELECT * FROM ' + type + ' WHERE lname LIKE "%' + lname + '%"';
    }
    else {
      sql = 'SELECT * FROM ' + type + ' WHERE fname LIKE "%' + fname + '%"';
    }
    con.query(sql, (err, char) => {
      if (err) callback(err);
      callback(char);
    });
  },

  itemByID: function(id, con, callback) {
    let sql = 'SELECT * FROM item WHERE itemID = ' + id;
    con.query(sql, (err, item) => {
      if (err) callback(err);
      callback(item);
    });
  },

  itemByName: function(name, con, callback) {
    let sql = 'SELECT * FROM item WHERE name = "' + name + '"';
    con.query(sql, (err, item) => {
      if (err) callback(err);
      callback(item);
    });
  },

  owns: function(id, con, callback) {
    let sql = 'SELECT * FROM owns WHERE memberID = "' + id + '"';
    con.query(sql, (err, owns) => {
      if (err) callback(err);
      callback(owns);
    });
  },

  ownsSpecific: function(memberID, itemID, con, callback) {
    let sql = 'SELECT * FROM owns WHERE memberID = "' + memberID + '" and itemID = ' + itemID;
    con.query(sql, (err, owns) => {
      if (err) callback(err);
      callback(owns);
    });
  },

  shop: function(con, callback) {
    let sql = 'SELECT * FROM item WHERE cost > 0';
    con.query(sql, (err, items) => {
      if (err) callback(err);
      callback(items);
    })
  },

  commands: function(con, callback) {
    let sql = 'SELECT * FROM command WHERE type not like "mod"';
    con.query(sql, (err, commands) => {
      if (err) callback(err);
      callback(commands);
    })
  },

  commandSpecific: function(specific, con, callback) {
    let sql = 'SELECT * FROM command WHERE name = "' + specific + '"';
    con.query(sql, (err, command) => {
      if (err) callback(err);
      callback(command);
    })
  },

  tagByName: function(name, con, callback) {
    let sql = 'SELECT * FROM tag WHERE name = "' + name + '"';
    con.query(sql, (err, tag) => {
      if (err) callback(err);
      callback(tag);
    });
  },
}
