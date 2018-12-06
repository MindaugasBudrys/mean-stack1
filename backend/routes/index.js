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
router.get('/song/:id', ctrlSong.getSongById);
router.post('/songs', ctrlSong.postSong);

//playlist
router.get('/playlist', ctrlPlaylist.getAllPlaylists);
router.get('/playlist/' + ':id', ctrlPlaylist.getPlaylistById);
router.get('/playlist/user/' + ':id', ctrlPlaylist.getAllUserPlaylists);
router.post('/playlist', ctrlPlaylist.postPlaylist);
router.put('/playlist/push/:id', ctrlPlaylist.addOneItemToPlaylist);
router.put('/playlist/pull/:id', ctrlPlaylist.deleteOneItemFromPlaylist);
router.delete('/playlist/:id', ctrlPlaylist.deletePlaylist);


//search (mby would be better to have a search controller?)
router.get('/search/songs/:id', ctrlSong.searchForSongs);
router.get('/search/artists/:id', ctrlArtist.searchArtists);
router.get('/search/albums/:id', ctrlAlbum.searchAlbums);
router.get('/search/playlists/:id', ctrlPlaylist.searchPlaylists);

// //-------------- methods for each route

// // profile routes
// router.get('/profile', auth, ctrlProfile.profileRead);

// // authentication
// router.post('/register', ctrlAuth.register);
// router.post('/login', ctrlAuth.login);

// //artists routes
// router.get('/artists', auth, ctrlArtist.getAllArtists);


// router.post('/artists', auth, ctrlArtist.postArtist);
// router.put('/artists/' + ':id', auth, ctrlArtist.editArtist);

// //album routes
// router.get('/album', auth, ctrlAlbum.getAllAlbums);
// router.post('/album', auth, ctrlAlbum.postAlbum);
// router.put('/album/' + ':id', auth, ctrlAlbum.editAlbum);

// //song routes
// router.get('/songs', auth, ctrlSong.getAllSongs);
// router.get('/song/:id', auth, ctrlSong.getSongById);
// router.post('/songs', auth, ctrlSong.postSong);

// //playlist routes
// router.get('/playlist', auth, ctrlPlaylist.getAllPlaylists);
// router.get('/playlist/' + ':id', auth, ctrlPlaylist.getPlaylistById);
// router.get('/playlist/user/' + ':id', auth, ctrlPlaylist.getAllUserPlaylists);
// router.post('/playlist', auth, ctrlPlaylist.postPlaylist);
// router.put('/playlist/push/:id', auth, ctrlPlaylist.addOneItemToPlaylist);
// router.put('/playlist/pull/:id', auth, ctrlPlaylist.deleteOneItemFromPlaylist);
// router.delete('/playlist/:id', auth, ctrlPlaylist.deletePlaylist);


// //search routes
// router.get('/search/songs/:id', auth, ctrlSong.searchForSongs);
// router.get('/search/artists/:id', auth, ctrlArtist.searchArtists);
// router.get('/search/albums/:id', auth, ctrlAlbum.searchAlbums);
// router.get('/search/playlists/:id', auth, ctrlPlaylist.searchPlaylists);




module.exports = router;