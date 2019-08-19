var express = require('express');
var router = express.Router();
const tradesController = require('../controllers/trades');

// Route to delete all trades

router.delete('/erase', function(req, res, next) {
  tradesController.removeTrades(function(err, result) {
    if (err) {
      return res.status(404).send('Could not remove trades!');
    }
    return res.status(200).send('All trades removed');
  });
});


module.exports = router;
