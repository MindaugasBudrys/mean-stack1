var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ArtistSchema = new Schema({

  name: { type: String, required: true},
  description: { type: String},

});
module.exports = mongoose.model('Artist', ArtistSchema, 'artists');