var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String,
  subType: String,
  date: Date,
  amount: Number,
  memo: String
})

module.exports = mongoose.model('receipt', schema)