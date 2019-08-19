'use strict';

const tradesController = require('../controllers/trades');
const stocksController = require('../controllers/stocks');

// Routes related to trades
module.exports = function(app) {
  /**
   * Get All Trades Filtered By Trade Type, Start Date, End Date
   */
  app.get('/stocks/:symbol/trades', function (req, res, next) {
    let symbol = req.params.symbol;
    let tradeType = req.query.type;
    let startDate = req.query.start;
    let endDate = req.query.end;

    tradesController.getTradesByType(symbol, tradeType, startDate, endDate, function (err, result) {
      if (err) {
        if (err.message === 'symbol not found') {
          return res.status(404).send({});
        }
        if (err.message === 'no trades during period') {
          return res.status(200).send([]);
        }
        return res.status(500).send(result);
      }
      return res.status(200).send(result);
    });
  });

  /**
   * Get Stock Price
   */
  app.get('/stocks/:symbol/price', function (req, res, next) {
    let symbol = req.params.symbol;
    let startDate = req.query.start;
    let endDate = req.query.end;

    stocksController.getStockPrice(symbol, startDate, endDate, function (err, result) {
      if (err) {
        if (err.message === 'symbol not found') {
          return res.status(404).send({});
        }
        if (err.message === 'no trades during period') {
          return res.status(200).send('There are no trades in the given date range');
        }
        return res.status(500).send(result);
      }
      return res.status(200).send(result);
    });
  });
};


  
