var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Song = require('../models/Song.js');

var Album = require('../models/Album.js');
var Artist = require('../models/Artist.js');


//----------------------
/* GET ALL ARTISTS */
router.get('/artist/', function(req, res, next) {
  Artist.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});
/* SAVE ARTIST */
router.post('/artist/', function(req, res, next) {
  Artist.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//----------------

//albums
router.get('/album/', function(req, res, next) {
  Album.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});


//albums2 populate
router.get('/albums/', function(req, res, next) {


  Album.find().populate('artist')
  .exec(function (err, data) {
    if (err) { return next(err); }
    res.json(data);
  });
});


// Book.find({}, 'title author ')
// .populate('author')
// .exec(function (err, list_books) {
//   if (err) { return next(err); }
//   // Successful, so render
//   res.render('book_list', { title: 'Book List', book_list:  list_books});
// });

router.post('/album/', function(req, res, next) {
  Album.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});






//---------------------------------------------------
//songs


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