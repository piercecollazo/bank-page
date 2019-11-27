const mongoose = require('mongoose');
const moment = require("moment");
const now = moment();

var TransactionSchema = new mongoose.Schema({
    business: {type: String, default:'Unknown'},
    cashAmount: {type: Number, default:0},
    account: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    timestamp: {type: String, default: now.format("dddd, MMMM Do YYYY, h:mm:ss a")}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
