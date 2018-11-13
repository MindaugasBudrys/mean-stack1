var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Album = require('../models/Album.js');

const albumPath = "/albums/";

/* GET ALL ALBUMS */
router.get(albumPath, function(req, res, next) {
  Album.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

//post album
router.post(albumPath, function(req, res, next) {
  Album.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


//albums2 populate WORKS
// router.get('/albums/', function(req, res, next) {
//   Album.find().populate('artist')
//   .exec(function (err, data) {
//     if (err) { return next(err); }
//     res.json(data);
//   });
// });


module.exports = router;