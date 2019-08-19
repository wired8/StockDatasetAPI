'use strict';
const db = require('../lib/db');
const moment = require('moment');

exports.getAllTrades = function (cb) {
  db.all('SELECT * from trades', function(err, rows) {
    if (err) {
      return cb(err);
    }
    const trades = rows.map(x => {
      return JSON.parse(x.json);
    });
    return cb(null, trades);
  });

};

exports.getTradesByUserId = function (userId, cb) {
  const sql = `SELECT * FROM trades WHERE json_extract(json, '$.user.id') = ${userId}`;
  db.all(sql, function(err, rows) {
    if (err) {
      return cb(err);
    }
    const trades = rows.map(x => {
      return JSON.parse(x.json);
    });
    return cb(null, trades);
  });
};

exports.getTradesById = function (id, cb) {
  const sql = `SELECT * FROM trades WHERE json_extract(json, '$.id') = ${id}`;
  db.all(sql, function(err, rows) {
    if (err) {
      return cb(err);
    }
    return cb(null, rows);
  });
};

exports.getTradesByType = function (symbol, type, start, end, cb) {
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
      return (x.type === type && (moment(x.timestamp).isBetween(start, end), null, '[)'));
    });

    if (!rows.length) {
      return cb({message: 'no trades during period'});
    }

    return cb(null, rows);
  });
};

exports.addTrades = function (trade, cb) {
  db.run('INSERT INTO trades (id, json) VALUES (?,?)', trade.id, JSON.stringify(trade), function(err) {
    if (err) {
      return cb(err);
    } else {
      return cb();
    }
  });
};

exports.removeTrades = function (cb) {
  console.log('Remove all trades from db');
  db.run('DELETE FROM trades', function(err) {
    if (err) {
      return cb(err);
    } else {
      return cb();
    }
  });
};