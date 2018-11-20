var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Artist = require('../models/Artist.js');
var Album = require('../models/Album.js');

const artistPath = "/artists/";

/* GET ALL ARTISTS */
router.get(artistPath, function(req, res, next) {
  Artist.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// /* GET ALL ARTISTS */
// router.get('/artists/zaebal', function(req, res, next) {
//   Artist.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });

/* GET SINGLE ARTIST BY ID */
router.get(artistPath + ':id', function(req, res, next) {
  Artist.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET ALL ALBUMS BY ARTIST BY ID */
router.get(artistPath + ':id' + '/albums/', function(req, res, next) {
  console.log(req.params.id);

  //not working? tho it should? mby?
  Album.find({'artist': req.params.id}, function (err, albums){
    if (err) return next(err);
    res.json(albums);
  });

  // Album.find(function (err, products) {
  //   if (err) return next(err);
  //   res.json(products);
  // });


});

//   Book.find({}, 'title author ')
//     .populate('author')
//     


//post artist
router.post(artistPath, function(req, res, next) {
  console.log(req.body);
  Artist.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ARTIST */
router.put(artistPath + ':id', function(req, res, next) {
  Artist.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ARTIST */
router.delete(artistPath + ':id', function(req, res, next) {
  Artist.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
module.exports = router;