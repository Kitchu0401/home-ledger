var express = require('express')
var mongoose = require('mongoose')
var DustInfo = require('./../models/dustInfo')

var router = express.Router()

// GET receipt list
router.get('/', function (req, res, next) {
  DustInfo
  .findOne()
  .limit(1)
  .sort({ dataTime: -1 })
  .then((found) => { res.send(found) })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

// GET receipt list test
router.get('/test', function (req, res, next) {
  DustInfo
  .find()
  .then((found) => {
    res.send(found[Math.floor(Math.random() * found.length)])
  })
  .catch((error) => {
    console.error(error)
    res.setStatus(500).send(error)
  })
})

module.exports = router
