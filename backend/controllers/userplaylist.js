var mongoose = require('mongoose');
var UserPlaylist = mongoose.model('UserPlaylist');

module.exports.getAllPlaylists = function(req, res) {

    UserPlaylist.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });

};

module.exports.getAllUserPlaylists = function(req, res) {

  UserPlaylist.find({ user: req.params.id}, function (err, products) {
      if (err) return next(err);
      res.json(products);
  });

};

module.exports.searchPlaylists = function(req, res) {

  UserPlaylist.find({"title": { "$regex": req.params.id, "$options": "i" }}, function (err, post) {
    if (err) {console.log(err)}
    res.json(post);
  });

};

module.exports.getPlaylistById = function(req, res) {

  UserPlaylist.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};

module.exports.postPlaylist = function(req, res) {

    UserPlaylist.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};

module.exports.addOneItemToPlaylist = function(req, res) {

  UserPlaylist.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { 'song_list': req.body.song  }},
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });

};

module.exports.deleteOneItemFromPlaylist = function(req, res) {

  UserPlaylist.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { 'song_list' : req.body.song }},
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

module.exports.deletePlaylist = function(req, res) {

  UserPlaylist.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};