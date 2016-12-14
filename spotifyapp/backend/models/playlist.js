var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	title: { type: String, required: true }, 
	userId: { type: String, required: true },
	created: Date

  // name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // favorite: String,
  // created_at: Date,
  // updated_at: Date
});

var model = mongoose.model('Playlist', schema);

// Make this available to our other files
module.exports = model;