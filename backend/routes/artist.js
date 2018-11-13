var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Artist = require('../models/Artist.js');

const artistPath = "/artists/";

/* GET ALL ARTISTS */
router.get(artistPath, function(req, res, next) {
  Artist.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

//post artist
router.post(artistPath, function(req, res, next) {
  Artist.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});




module.exports = router;