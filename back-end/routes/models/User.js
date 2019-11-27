const mongoose = require('mongoose');
const moment = require("moment");
const now = moment();

let generatedAccountNumber = ()=>{
    let account = ''
    while(account.length < 11){
        account += Math.floor(Math.random() * 10)
    }  
    return account  
  }

var UserSchema = new mongoose.Schema({
    email: {type: String, trim: true, unique: true, required: true, default: ''},
    name: {type:String, required: true, default: ''},
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref:'Transaction' }],
    password: {type: String, default: ''},
    creditScore: {type: Number, default: 600},
    balance: {type: Number, default: 0.00},
    accountNumber:{type: String, default:generatedAccountNumber()},
    timestamp: {type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")}
});

module.exports = mongoose.model('User', UserSchema);
