var express = require('express')
var mongoose = require('mongoose')
var Auth = require('./../models/auth.js')

var router = express.Router()

router.post('/', function (req, res, next) {
  Auth
  .find({ authKey: req.body.authKey })
  .then((found) => { 
    res.send({ isAuthenticated: found.length > 0 }) })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

module.exports = router
