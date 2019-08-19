const tradesController = require('../controllers/trades');
  
// Routes related to trades

module.exports = function(app) {
  /**
   * Get All Trades Filtered by userID
   */
  app.get('/trades/users/:userID', function (req, res, next) {
    let userID = req.params.userID;
    tradesController.getTradesByUser(userID, function (err, result) {
      return res.status(200).send(result);
    });
  });

  /**
   * Get All Trades
   */
  app.get('/trades', function (req, res, next) {
    tradesController.getTrades(function (err, result) {
      return res.status(200).send(result);
    });
  });

};


  
