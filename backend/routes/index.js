var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


//ALL CONTROLLERS HAVE TO BE HERE?

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlArtist = require('../controllers/artist');
var ctrlAlbum = require('../controllers/album');
var ctrlSong = require('../controllers/song');
var ctrlPlaylist = require('../controllers/userplaylist');


//-------------- methods for each route

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//artists
router.get('/artists', ctrlArtist.getAllArtists);
router.post('/artists', ctrlArtist.postArtist);
router.put('/artists/' + ':id', ctrlArtist.editArtist);

//album
router.get('/album', ctrlAlbum.getAllAlbums);
router.post('/album', ctrlAlbum.postAlbum);
router.put('/album/' + ':id', ctrlAlbum.editAlbum);

//song 
router.get('/songs', ctrlSong.getAllSongs);
router.get('/songs/:id', ctrlSong.getSongById);
router.get('/song-search', ctrlSong.searchForSongs);
router.post('/songs', ctrlSong.postSong);

//playlist
router.get('/playlist', ctrlPlaylist.getAllPlaylists);
router.get('/playlist/' + ':id', ctrlPlaylist.getPlaylistById);
router.post('/playlist', ctrlPlaylist.postPlaylist);
router.put('/playlist/push/:id', ctrlPlaylist.addOneItemToPlaylist);
router.put('/playlist/pull/:id', ctrlPlaylist.deleteOneItemFromPlaylist);


module.exports = router;