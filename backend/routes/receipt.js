var express = require('express');
var receipts = require('./receipt.json');

var router = express.Router();

// GET receipt list
router.get('/', function(req, res, next) {
    res.send(receipts);
});

// GET movie
// router.get('/:id', function(req, res, next) {
//     var id = parseInt(req.params.id, 10);
//     res.send(movies.find((movie) => {
//         return movie.id === id;
//     }));
// });

module.exports = router;
