var mongoose = require('mongoose');
var UserPlaylist = mongoose.model('UserPlaylist');

module.exports.getAllPlaylists = function(req, res) {

    UserPlaylist.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });

};

module.exports.postPlaylist = function(req, res) {

    UserPlaylist.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};


//????
module.exports.addOneItemToPlaylist = function(req, res) {

  UserPlaylist.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};


//????
module.exports.editPlaylist = function(req, res) {

  UserPlaylist.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};

