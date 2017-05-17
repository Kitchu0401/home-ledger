var mongoose = require('mongoose')

var schema = new mongoose.Schema({
  dataTime: Date,
  dataList: [{
    name: String, 
    value: Number
  }]
})

module.exports = mongoose.model('dustInfo', schema)
