var mongoose = require('mongoose');
var Song = mongoose.model('Song');

module.exports.getAllSongs = function(req, res) {

  Song.find().populate({ 
    path: 'album',
    populate: { path: 'artist'}
  })
  .exec(function (err, data) {
    if (err) { return next(err); }
    res.json(data);
  });

};

module.exports.searchForSongs = function(req, res) {

  Song.find({"title": { "$regex": req.params.id, "$options": "i" }}).populate({ 
    path: 'album',
    populate: { path: 'artist'}
  })
  .exec(function (err, data) {
    if (err) { return next(err); }
    res.json(data);
  });;
  
};

module.exports.getSongById = function(req, res) {

  Song.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};


module.exports.postSong = function(req, res) {

    Song.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};