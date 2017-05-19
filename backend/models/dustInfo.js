var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  dataTime: String,
  dataList: [{
    name: String, 
    value: Number,
    order: Number
  }]
})

module.exports = mongoose.model('dustInfo', schema)
