var express = require('express');
var router = express.Router();
var userController = require('./controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', userController.signup)

router.post('/sign-in', userController.signin)

router.post('/add-transaction/:id', userController.addTransaction)

router.get('/get-transactions/:id',userController.getTransactions)

router.post('/change-credit/:id', userController.changeCredit)

module.exports = router;
