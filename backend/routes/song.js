var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Song = require('../models/Song.js');
var Album = require('../models/Album.js');

// var Album = require('../models/Album.js');
// var Artist = require('../models/Artist.js');

const songPath = "/songs/";

// GET ALL SONGS (NO POPULATING)
// router.get(songPath, function(req, res, next) {
//   Song.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });



//-----------------------------------------
router.get(songPath, function(req, res, next) {
  Song.find().populate({ 
    path: 'album',
    populate: { path: 'artist'}
  })
  .exec(function (err, data) {
    if (err) { return next(err); }
    res.json(data);
  });
});



/* GET SINGLE SONG BY ID */
router.get(songPath + ':id', function(req, res, next) {
  Song.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE SONG */
router.post(songPath, function(req, res, next) {
  Song.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* UPDATE SONG */
router.put(songPath + ':id', function(req, res, next) {
  Song.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* DELETE SONG */
router.delete(songPath + ':id', function(req, res, next) {
  Song.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;