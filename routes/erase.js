'use strict';

const tradesController = require('../controllers/trades');

// Route to delete all trades
module.exports = function(app) {
  /**
   * Erase all trades
   */
  app.delete('/erase', function (req, res, next) {
    tradesController.removeTrades(function (err, result) {
      if (err) {
        console.error(err);
        return res.status(404).send('Could not remove trades!');
      }
      return res.status(200).send('All trades removed');
    });
  });
};

