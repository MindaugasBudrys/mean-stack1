var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ArtistSchema = new Schema({

  name: { type: String, required: true},
  description: { type: String},
  artist_picture: {type: Schema.ObjectId, ref: 'GFS', required: true},

  //turetu but sitaip? bet px realiai
  //artist_picture: {type: Schema.ObjectId, ref: 'ArtistPic', required: true},
});
module.exports = mongoose.model('ArtistPic', new Schema({}, {strict: false}), 'fs.files' );
module.exports = mongoose.model('Artist', ArtistSchema, 'artists');