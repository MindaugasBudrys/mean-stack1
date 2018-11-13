var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Genre = require('../models/Genre.js');
// var Album = require('../models/Album.js');

const genrePath = "/genres";

/* GET ALL GENRES */
router.get(genrePath, function(req, res, next) {
  Genre.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE GENRE BY ID */
router.get(genrePath + ':id', function(req, res, next) {
  Genre.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//post GENRE
router.post(genrePath, function(req, res, next) {
  Genre.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE GENRE */
router.put(genrePath + ':id', function(req, res, next) {
  Genre.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE GENRE */
router.delete(genrePath + ':id', function(req, res, next) {
  Genre.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;