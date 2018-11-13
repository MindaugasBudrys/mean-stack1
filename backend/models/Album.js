var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AlbumSchema = new Schema({

  title: { type: String, required: true},
  // release_date: { type: Date},
  release_date: { type: Number},
  artist: { type: Schema.ObjectId, ref: 'Artist', required: true }, //ref to artist which must already be created
  genres: [{ type: Schema.ObjectId, ref: 'Genre' }], //array of genres
  duration: { type: Number}, 

});
module.exports = mongoose.model('Album', AlbumSchema, 'albums');