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

//song Song
router.get('/songs', ctrlSong.getAllSongs);
router.get('/songs', ctrlSong.getSongById);
router.post('/songs', ctrlSong.postSong);



module.exports = router;