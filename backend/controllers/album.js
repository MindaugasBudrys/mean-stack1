var mongoose = require('mongoose');
var Album = mongoose.model('Album');

module.exports.getAllAlbums = function(req, res) {

    Album.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });

};

module.exports.searchAlbums = function(req, res) {

  Album.find({"title": { "$regex": req.query.title, "$options": "i" }}, function (err, post) {
    if (err) {console.log(err)}
    res.json(post);
  });

};

module.exports.postAlbum = function(req, res) {

    Album.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};

module.exports.editAlbum = function(req, res) {

  Album.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};