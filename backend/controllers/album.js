var mongoose = require('mongoose');
var Album = mongoose.model('Album');

module.exports.getAllAlbums = function(req, res) {

    Album.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });

};

module.exports.postAlbum = function(req, res) {

    Album.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};