var express = require('express')
var mongoose = require('mongoose')
var Receipt = require('./../models/receipt.js')

var router = express.Router()

// POST save receipt
router.post('/', function (req, res, next) {
  let id = req.body._id || new mongoose.mongo.ObjectId()
  let receipt = req.body
  let options = { new: true, upsert: true }
  Receipt
  .findByIdAndUpdate(id, receipt, options)
  .then((modified) => { res.send(modified) })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

// GET receipt list
router.get('/', function (req, res, next) {
  Promise.all([
    // getting summed total amount
    Receipt.aggregate(
      {
        $match: {
          state: 1
        }
      },
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
        $match: {
          state: 1
        }
      },
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
          date: "$date",
          amount: "$amount",
          receipt: "$$CURRENT"
        }
      },
      {
        $group: { 
          _id: {
            year: "$year",
            month: "$month",
            day: "$day"
          },
          date: { $first: "$date" },
          sumAmount: { $sum: "$amount" },
          receipts: { $addToSet: "$receipt" }
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
    res.send({
      'sumTotalAmount': result[0][0].sumTotalAmount,
      'receiptList': result[1]
    })
  })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

// GET receipt
router.get('/:id', function (req, res, next) {
  Receipt
  .findById(req.params.id)
  .then((found) => { res.send(found) })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

// DELETE update receipt's state to 0
router.delete('/:id', function (req, res, next) {
  Receipt
  .findByIdAndUpdate(req.params.id, { state: 0 }, { new: true })
  .then((modified) => { res.send(modified) })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

module.exports = router
