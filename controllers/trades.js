'use strict';
var trades = require('../data/alltrades.json');

exports.getTrades = function (cb) {
  const json = {};

  return cb(null, trades);
};

exports.getTradesByUser = function (userId, cb) {
  const json = trades.filter(x => {
    if (x.user.id == userId) {
      return x;
    }
  });

  return cb(null, json);
};

exports.addTrades = function (trade, cb) {
  return cb();
};

exports.removeTrades = function (cb) {
  console.log('Remove all trades from db');
  return cb();
};