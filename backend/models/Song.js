var mongoose = require('mongoose');
var SongSchema = new mongoose.Schema({
  artist_name: String,
  song_title: String,
  length: String,
  // author: String,
  // description: String,
  published_year: String,
  record_label: String,
  updated_date: { type: Date, default: Date.now },
  file_id: String
});
module.exports = mongoose.model('Song', SongSchema);