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


//-------------- methods for each route

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//artists
router.get('/artists', ctrlArtist.getAllArtists);
router.post('/artists', ctrlArtist.postArtist);




module.exports = router;