'use strict';

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.log('Error when creating the database', err);
    throw err;
  } else {
    console.log('Database created!');
    db.run('CREATE TABLE IF NOT EXISTS trades(id INTEGER PRIMARY KEY, json TEXT)', function(err, result) {
      if (err) {
        console.error('Error creating trades table!',err);
        throw err;
      }
    });
  }
});

module.exports = db;