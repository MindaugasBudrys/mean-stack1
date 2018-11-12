var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Song = require('../models/Song.js');

/* GET ALL SONGS */
router.get('/', function(req, res, next) {
  Song.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});
/* GET SINGLE SONG BY ID */
router.get('/:id', function(req, res, next) {
  Song.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE SONG */
router.post('/', function(req, res, next) {
  Song.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* UPDATE SONG */
router.put('/:id', function(req, res, next) {
  Song.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* DELETE SONG */
router.delete('/:id', function(req, res, next) {
  Song.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;