'use strict';
const db = require('../lib/db');
const moment = require('moment');

exports.getStockPrice = function (symbol, start, end, cb) {
  const sql = `SELECT * FROM trades WHERE json_extract(json, '$.symbol') = '${symbol}'`;
  db.all(sql, function(err, rows) {
    if (err) {
      return cb(err);
    }
    if (!rows.length) {
      return cb({message: 'symbol not found'});
    }

    rows = rows.map(x => {
      return JSON.parse(x.json);
    });

    rows = rows.filter(x => {
      return ((moment(x.timestamp).isBetween(start, end), null, '[)'));
    });

    if (!rows.length) {
      return cb({message: 'no trades during period'});
    }

    const highest = Math.max.apply(Math, rows.map(function(s) { return s.price; }));
    const lowest = Math.min.apply(Math, rows.map(function(s) { return s.price; }));
    const stock = {
      "symbol": symbol,
      "highest": highest,
      "lowest": lowest
    };

    return cb(null, stock);
  });
};

