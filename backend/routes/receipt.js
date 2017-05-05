var express = require('express')
var receipts = require('./receipt.json')

var router = express.Router()

// POST save receipt
router.post('/', function(req, res, next) {
    res.send(req.body)
})

// GET receipt list
router.get('/', function(req, res, next) {
    try {
        var modifiedResult = receipts.reduce((prev, curr) => {
            if ( !prev[curr.date] ) {
                prev[curr.date] = {
                    date: curr.date,
                    totalAmount: curr.type === '0' ? curr.amount : curr.amount * -1,
                    receipts: [curr]
                }
            } else {
                prev[curr.date].totalAmount = curr.type === '0' ? prev[curr.date].totalAmount + curr.amount : prev[curr.date].totalAmount - curr.amount
                prev[curr.date].receipts.push(curr)
            }

            return prev
        }, {})

        res.send(modifiedResult)
    } catch(err) {
        console.error(err)
        res.send(err)
    }
})

// GET receipt
router.get('/:id', function(req, res, next) {
    try {
        var result = receipts.find((receipt) => {
            return Number(req.params.id) === receipt.id
        })

        res.send(result)
    } catch(err) {
        console.error(err)
        res.send(err)
    }
})

// GET movie
// router.get('/:id', function(req, res, next) {
//     var id = parseInt(req.params.id, 10)
//     res.send(movies.find((movie) => {
//         return movie.id === id
//     }))
// })

module.exports = router
