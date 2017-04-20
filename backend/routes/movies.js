var express = require('express');
var movies = require('../movies.json');
var router = express.Router();

// GET movie list
router.get('/', function(req, res, next) {
    res.send(movies);
});

// GET movie
router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    res.send(movies.find((movie) => {
        return movie.id === id;
    }));
});

module.exports = router;
