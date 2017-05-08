var express = require('express')
var mongoose = require('mongoose')
var Receipt = require('./../models/receipt.js')

var router = express.Router()

// POST save receipt
router.post('/', function (req, res, next) {
  let id = req.body._id || new mongoose.mongo.ObjectId()
  let receipt = req.body
  let options = { new: true, upsert: true }
  Receipt.findByIdAndUpdate(id, receipt, options)
  .then(function (a,b,c) {
    res.send(a)
  })
  .catch(function (err) {
    console.error(err)
    res.send(err)
  })
})

// GET receipt list
router.get('/', function (req, res, next) {
  Promise.all([
    // getting summed total amount
    Receipt.aggregate(
      {
        $group: { 
          _id: null,
          sumTotalAmount: { $sum: "$amount" },
        }
      },
      {
        $project: { 
          _id: 0,
          sumTotalAmount: 1
        }
      }
    ),
    // getting grouped receipt lists
    Receipt.aggregate(
      {
        $group: { 
          _id: "$date",
          date: { $first: "$date" },
          sumAmount: { $sum: "$amount" },
          receipts: { $addToSet: "$$CURRENT" }
        }
      },
      {
        $sort: { 
          date: -1
        }
      }
    )
  ])
  .then(function (result) {
    let data = {
      'sumTotalAmount': result[0][0].sumTotalAmount,
      'receiptList': result[1]
    }
    
    res.send(data)
  })
  /*
  Receipt
  .aggregate(
    {
      $group: { 
        _id: "$date",
        date: { $first: "$date" },
        sumAmount: { $sum: "$amount" },
        receipts: { $addToSet: "$$CURRENT" }
      }
    },
    {
      $sort: { 
        date: -1
      }
    }
  )
  .exec()
  .then(function (data) {
    res.send(data)
  })
  .catch(function (err) {
    console.error(err)
    res.send(err)
  })
  */
})

// GET receipt
router.get('/:id', function (req, res, next) {
  Receipt
  .findOne(new mongoose.Types.ObjectId(req.params.id))
  .exec()
  .then(function (data) {
    res.send(data)
  })
  .catch(function (err) {
    console.error(err)
    res.send(err)
  })
})

module.exports = router
