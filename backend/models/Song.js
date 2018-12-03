var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SongSchema = new Schema({

  title: {type: String, required: true},
  duration: {type: Number},
  album: {type: Schema.ObjectId, ref: 'Album', required: true}, //ref to album
  featuring_artists: [{ type: Schema.ObjectId, ref: 'Artist' }], //array of featuring artists
  track_number: {type: String},

  //still not sure how song file id should be like, this is probably ok
  song_file: {type: Schema.ObjectId, ref: 'GFS', required: true}
  // song_file: {type: Schema.Types.Object, ref: 'GFS'},
});
SongSchema.index({title: 'text', 'album.title': 'text'});

module.exports = mongoose.model('GFS', new Schema({}, {strict: false}), 'fs.files' );
module.exports = mongoose.model('Song', SongSchema, 'songs');
