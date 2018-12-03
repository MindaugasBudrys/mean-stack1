var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserPlaylistSchema = new Schema({

  title: { type: String, required: true},
  description: { type: String},

  //perfect versijoj turetu backendas idet sita, o ne gaut is user? 
  user: {type: Schema.ObjectId, ref: 'User', required:true},

  song_list: [{type: Schema.ObjectId, ref: 'Song'}],
  date_created: {type: Date, default: Date.now } 
});
module.exports = mongoose.model('UserPlaylist', UserPlaylistSchema, 'userplaylist');  