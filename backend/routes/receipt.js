var express = require('express');
var receipts = require('./receipt.json');

var router = express.Router();

// GET receipt list
router.get('/', function(req, res, next) {
    var modifiedResult = receipts.reduce((prev, curr) => {
        if ( !prev[curr.date] ) {
            prev[curr.date] = {
                date: curr.date,
                totalAmount: curr.type === '0' ? curr.amount : curr.amount * -1,
                receipts: [curr]
            }
        } else {
            prev[curr.date].totalAmount = curr.type === '0' ? prev[curr.date].totalAmount + curr.amount : prev[curr.date].totalAmount - curr.amount;
            prev[curr.date].receipts.push(curr);
        }

        return prev;
    }, {});

    res.send(modifiedResult);
});

// GET movie
// router.get('/:id', function(req, res, next) {
//     var id = parseInt(req.params.id, 10);
//     res.send(movies.find((movie) => {
//         return movie.id === id;
//     }));
// });

module.exports = router;
