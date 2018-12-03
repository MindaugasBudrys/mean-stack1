var mongoose = require('mongoose');
var UserPlaylist = mongoose.model('UserPlaylist');

module.exports.getAllPlaylists = function(req, res) {

    UserPlaylist.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });

};


module.exports.getPlaylistById = function(req, res) {

  UserPlaylist.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });


  // UserPlaylist
  // .findById(req.payload._id)
  // .exec(function(err, user) {
  //   res.status(200).json(user);
  // });

};


module.exports.postPlaylist = function(req, res) {

    UserPlaylist.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};


//????
module.exports.addOneItemToPlaylist = function(req, res) {

  UserPlaylist.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { song_list: req.body.song  }},
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });

    

};


//????
module.exports.deleteOneItemFromPlaylist = function(req, res) {

  UserPlaylist.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { 'song_list' : req.body.song }},
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

