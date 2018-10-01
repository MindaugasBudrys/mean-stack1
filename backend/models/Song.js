var mongoose = require('mongoose');
var SongSchema = new mongoose.Schema({
  aritst_name: String,
  song_title: String,
  length: int,
  // author: String,
  // description: String,
  published_year: String,
  record_label: String,
  updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Book', BookSchema);