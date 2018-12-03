var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

module.exports.getAllArtists = function(req, res) {

    Artist.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });

};

module.exports.postArtist = function(req, res) {

    Artist.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

};

module.exports.searchArtists = function(req, res) {

  Artist.find({"name": { "$regex": req.query.title, "$options": "i" }}, function (err, post) {
    if (err) {console.log(err)}
    res.json(post);
  });

};




module.exports.editArtist = function(req, res) {

  Artist.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

};

