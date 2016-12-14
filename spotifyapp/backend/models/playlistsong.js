var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schema = new mongoose.Schema({
	playlist: { 
		type: ObjectId,
		required: true,
		ref: 'Playlist',
		index: true
	},
	song: { 
		type: ObjectId,
		required: true,
		ref: 'Song',
		index: true
	},
	created: Date

  // name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // favorite: String,
  // created_at: Date,
  // updated_at: Date
});

var model = mongoose.model('PlaylistSong', schema);

// Make this available to our other files
module.exports = model;