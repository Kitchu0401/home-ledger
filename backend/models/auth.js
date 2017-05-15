var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  authKey: String
})

module.exports = mongoose.model('auth', schema)