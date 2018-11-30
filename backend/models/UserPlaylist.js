var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserPlaylistSchema = new Schema({

  title: { type: String, required: true},
  description: { type: String},
  user: {type: Schema.ObjectId, ref: 'User', required:true},
  playlist: [{type: Schema.ObjectId, ref: 'Song'}]
  
});
module.exports = mongoose.model('UserPlaylist', UserPlaylistSchema, 'userplaylist');