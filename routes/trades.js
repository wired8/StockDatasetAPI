'use strict';

const tradesController = require('../controllers/trades');
  
// Routes related to trades
module.exports = function(app) {
  /**
   * Get All Trades Filtered by userID
   */
  app.get('/trades/users/:userID', function (req, res, next) {
    let userID = req.params.userID;
    tradesController.getTradesByUserId(userID, function (err, result) {
      if (err) {
        return res.status(500).send(result);
      }
      if (result.length === 0) {
        return res.status(404).send(result);
      }
      return res.status(200).send(result);
    });
  });

  /**
   * Get All Trades
   */
  app.get('/trades', function (req, res, next) {
    tradesController.getAllTrades(function (err, result) {
      if (err) {
        return res.status(400).send(result);
      }
      return res.status(200).send(result);
    });
  });

  /**
   * Add a new trade
   */
  app.post('/trades', function (req, res, next) {
    const trade = req.body;
    tradesController.addTrades(trade, function (err, result) {
      if (err) {
        return res.status(400).send(result);
      }
      return res.status(201).send(result);
    });
  });

};


  
