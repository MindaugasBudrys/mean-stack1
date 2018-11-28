var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AlbumSchema = new Schema({

  title: { type: String, required: true},

  //fix release date with proper date object
  // release_date: { type: Date},
  release_date: { type: String},

  artist: { type: Schema.ObjectId, ref: 'Artist', required: true }, //ref to artist which must already be created
  genres: [{ type: Schema.ObjectId, ref: 'Genre' }], //optional array of genres (which must also be already created)
  album_cover: {type: Schema.ObjectId, ref: 'AlbumPic', required: true},
  duration: { type: Number}
});
module.exports = mongoose.model('AlbumPic', new Schema({}, {strict: false}), 'fs.files' );
module.exports = mongoose.model('Album', AlbumSchema, 'albums');