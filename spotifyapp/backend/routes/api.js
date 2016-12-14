var express = require('express');
var router = express.Router();

var Playlist = require('../models/playlist');
var Song = require('../models/song');
var PlaylistSong = require('../models/playlistsong')

/* GET all playlists for a user */
router.get('/playlists', function(req, res, next) {
  var userId = req.user.aud;

  Playlist.find({ userId: req.user.aud }, '', function(err, playlists) {
  	if (err) console.log(err);
  	console.log(playlists);

  	res.json(playlists);
  });

});
/* Get a single playlist by the playlist id*/
router.get('/playlists/:playlistId', function(req, res) {
	Playlist.findById(req.params.playlistId, '', function(err, playlists) {
	  if (err) console.log(err);

	  PlaylistSong.find({playlist: req.params.playlistId}, 'song')
	  	.populate('song')
	  	.exec(function(err, results){
	  		if (err) console.log(err);
	  		res.json({
	  			playlists: playlists,
	  			song: results
	  		});
	  });  
	});
});


/* create a single playlist for a user */
router.post('/playlists',function(req, res){
   var userId = req.user.aud;
   var title = req.body.title;

   if (!title) {
   	   res.status(400).send('Missing Title');
   }

   var newPlaylist = new Playlist ({
   	title: title,
   	userId: userId,
   	created: new Date()
   });
    newPlaylist.save(function(err,playlist){
    	if (err) console.log(err);

    	res.json(playlist);	
    });

	
});
/*delete remove a playlist*/
router.delete('/playlists/:playlistId',function(req,res){
  Playlist.findByIdAndRemove(req.params.playlistId, function(err) {
  if (err) console.log(err);

});

  res.json({
  removed: req.params.playlistId
  });
});

/*post add a song to a playlist*/
router.post('/playlists/:playlistId/songs',function(req, res){
  var artist = req.body.artist;
  var title = req.body.title;
  var playlistId = req.params.playlistId;
  var songId = req.body.spotifySongId;

  if (!artist || !title || !songId) {
  	res.status(400).send('Missing parameters');
  }

	var query = {
		spotifySongId: songId,
		artist: artist,
		title: title
	    },
	    update = { expire: new Date() },
	    options = { upsert: true, new: true, setDefaultsOnInsert: true };

	// Find the document
	Song.findOneAndUpdate(query, update, options, function(err, song) {
	    if (err) console.log(err);

	    console.log(song);

	    var newPlaylistSong = new PlaylistSong({
	    	song: song._id,
	    	playlist: playlistId
	    });

	    newPlaylistSong.save(function(err){
	    	res.json(song);
	    });

	    // do something with the document
	});
});


/*remove a song from a playlist*/
router.delete('/playlists/:playlistId/songs/:songId',function(req,res){
  res.json({
  playlistId: req.params.playlistId,
  songId: req.params.songId
  });
});


module.exports = router;

