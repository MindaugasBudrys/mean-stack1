var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var passport = require('passport');
require('./models/db');
require('./config/passport');


var mongoose = require('mongoose');
var fs = require('fs');

var requestLOL = require('request');

var gridfs = require('gridfs-stream');

//for file tag reading
const NodeID3 = require('node-id3');

//for getting mp3 file duration
var mp3Duration = require('mp3-duration');


// var songRouter = require('./routes/song');
// var artistRouter = require('./routes/artist');
// var albumRouter = require('./routes/album');
// var genreRouter = require('./routes/genre');

var routesApi = require('./routes/index');

var app = express();

// mongoose.connect('mongodb://localhost:27017/mean-angular6');


mongoose.Promise = global.Promise;

gridfs.mongo = mongoose.mongo;

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {

  var gfs = gridfs(connection.db);

  app.get('/', (req, res) => {
    res.send('Download/Upload GridFS files to MongoDB <br>- by JavaSampleApproach.com');
  });

  // Upload a file from loca file-system to MongoDB
  app.get('/api/file/upload', (req, res) => {

    var filename = req.query.filename;

    var writestream = gfs.createWriteStream({ filename: filename });
    fs.createReadStream(__dirname + "/public" + filename).pipe(writestream);
    writestream.on('close', (file) => {
      res.send('Stored File: ' + file.filename + ' , id is: ' + file._id);
    });
  });

  //full album/folder addition to mongo
  app.get('/api/file/uploadalbum', (req, res) => {


    // var albumID = "5bf451544a7c2026d063b0be";

    var albumID = req.query.albumID;
    var folderName = req.query.folderName;
    
    console.log(albumID);
    console.log(folderName);

    var fileList = [];
    fs.readdir(__dirname + "/public/" + folderName + '/', (err, files) => {

      fileList = files;
      console.log('FILELIST:             ------')
      console.log('file list ilgis: ' + fileList.length)
      console.log(fileList);


      console.log('LOOPAS VEIKIA.')
      for (var i = 0; i < fileList.length; i++) {

        let filepath = (__dirname + "/public/" + folderName + '/' + fileList[i]);
        console.log(filepath);
        let tags = NodeID3.read(filepath);
        console.log('TAGS nureadinom, title + trackNumber: -----------------------------')
        console.log(tags.title + "   --   " + tags.trackNumber);

        // mp3Duration(filepath, function (err, duration) {
        //   if (err) return console.log(err.message);
        //   // console.log(fileList)
        //   console.log(fileList[3] + ' is: ' + duration + ' seconds long');
        // });

        var savedFileID = '';
        var writestream = gfs.createWriteStream({ filename: fileList[i] });
        fs.createReadStream(__dirname + "/public/" + folderName + '/' + fileList[i]).pipe(writestream);
        writestream.on('close', (file) => {
          savedFileID = file._id;
          console.log('SAVEDFILEID: ');
          console.log(savedFileID);
          // res.send('Stored File: ' + file.filename + ' , id is: ' + file._id);


          var myJSONObject = {
            title: tags.title,
            track_number: tags.trackNumber,
            album: albumID,
            song_file: savedFileID
            // duration: ''
          };

          requestLOL({
            url: "http://localhost:3000/api/songs",
            method: "POST",
            json: true,   // <--Very important!!!
            body: myJSONObject
          }, function (error, response, body) {
            console.log('BANDOM POST IDET, cia json: --------------------------------')
            console.log(myJSONObject)
            // console.log(response);
          });
        });

      }

    });


  });



  //---------------------------


  // //TEST FOLDER ---------------------------------------
  // //upload folder
  // app.get('/api/file/uploadfolder', (req, res) => {

  //   var filename = req.query.filename;

  //       var writestream = gfs.createWriteStream({});
  //       fs.createReadStream(__dirname + "/public/" + filename).pipe(writestream);
  //       writestream.on('close', (file) => {
  //           res.send('Stored File: ' + file.filename);
  //       });
  //   });
  //   //-------------------------------------

  // Download a file from MongoDB - then save to local file-system
  // streams/downloads file by object id
  app.get('/api/file/download', (req, res) => {
    // Check file exist on MongoDB

    var filename = req.query.filename;
    var objectID = req.query.objectID;

    gfs.exist({ _id: objectID }, (err, file) => {
      if (err || !file) {
        res.status(404).send('File Not Found');
        return
      }

      res.header('Content-Type', 'audio/mpeg');

      //TO DO:
      // 1. content-length idet del duration? gal kazka pafixins pvz chrome?
      // 2. https://developer.mozilla.org/en-US/docs/Web/HTTP/Configuring_servers_for_Ogg_media






      // res.header('Content-Length', );
      // console.log(file.status);
      // console.log(file.);

      var readstream = gfs.createReadStream({ _id: objectID });
      // res.set('Content-Type', 'audio/mpeg');
      readstream.pipe(res);
    });
  });

  // Delete a file from MongoDB
  app.get('/api/file/delete', (req, res) => {

    var filename = req.query.filename;

    gfs.exist({ filename: filename }, (err, file) => {
      if (err || !file) {
        res.status(404).send('File Not Found');
        return;
      }

      gfs.remove({ filename: filename }, (err) => {
        if (err) res.status(500).send(err);
        res.send('File Deleted');
      });
    });
  });

  // Get file information(File Meta Data) from MongoDB
  app.get('/api/file/meta', (req, res) => {

    var filename = req.query.filename;

    gfs.exist({ filename: filename }, (err, file) => {
      if (err || !file) {
        res.send('File Not Found');
        return;
      }

      gfs.files.find({ filename: filename }).toArray((err, files) => {
        if (err) res.send(err);
        res.json(files);
      });
    });
  });
});


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist/mean-angular6')));
app.use('/', express.static(path.join(__dirname, '../frontend/dist/mean-angular6')));


app.use(passport.initialize());
app.use('/api', routesApi);
//used before:
// app.use('/api', songRouter);
// app.use('/api', albumRouter);
// app.use('/api', artistRouter);
// app.use('/api', genreRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});



module.exports = app;
