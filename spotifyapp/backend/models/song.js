var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	artist: { type: String, required: true },  
	title: { type: String, required: true },
	spotifySongId: { type: String, required: true },
	year: Date,
	created: Date,	
	album: String

});

var model = mongoose.model('Song', schema);

// Make this available to our other files
module.exports = model;