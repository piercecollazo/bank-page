const authHelper = require('./authHelper');
const User = require('../models/User')
const Transaction = require('../models/Transaction')

module.exports = {
  signup: async (req, res) => {
    try {
      let newUser = await authHelper.createUser(req.body);
      let hashedPassword = await authHelper.hashPassword(newUser.password);
      newUser.password = hashedPassword;
      let savedUser = await newUser.save()

      savedUser.password = undefined
      savedUser.timestamp = undefined

      res.status(200).json({
        message: 'User Successfully created! Please Login'
      })
    } catch (error) {
      let errorMessage = await authHelper.errorHandler(error);
      console.log(error)
      res.status(500).json({
        message: errorMessage
      })
    }
  },
  signin: async (req, res) => {
    try {
      let foundUser = await authHelper.findOneUser(req.body.email)
      if (foundUser === 404) {
        throw 'User not found, please sign up';
      }
      let comparedPassword = await authHelper.comparePassword(req.body.password, foundUser.password);
      if (comparedPassword === 409) {
        throw 'Check your email and password';
      }
      let jwtToken = await authHelper.createJwtToken(foundUser);
      res.status(200).json({
        token: jwtToken
      })
    } catch (error) {
      res.status(500).json({
        message: error
      })
    }
  },
  addTransaction: async (req, res) => {
    try{
        let foundUser = await User.findById(req.params.id)
        let newTransaction = await new Transaction({
            business: req.body.business,
            cashAmount: Number.parseFloat(req.body.cashAmount).toFixed(2),
            account: req.body.userId
        })
        let savedTransaction = await newTransaction.save();
        await foundUser.transactions.push(savedTransaction)
        foundUser.balance += Number(req.body.cashAmount)
        foundUser.save();
        res.status(200).json(savedTransaction)
    } catch(error){
        console.log(error)
        res.status(500).json({message: error})
      }

  },
  changeCredit: async (req,res) => {
    try{
        let foundUser = await User.findById(req.params.id)

        foundUser.creditScore = req.body.credit
        foundUser.save()
        res.status(200).json(foundUser)
    } catch(error){
        res.status(500).json({message: error})
    }
  },
  getTransactions: async (req,res) =>{
      try{
          let transactionList = await User.findById(req.params.id).populate('transactions').exec()
          res.status(200).json(transactionList.transactions)
      } catch(error){
          res.status(500).json({message: error})
      }
  }
}