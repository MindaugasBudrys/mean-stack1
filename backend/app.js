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
var request = require('request');
var gridfs = require('gridfs-stream');

//for reading tags in files
const NodeID3 = require('node-id3');

//for getting mp3 file duration
var mp3Duration = require('mp3-duration');

var routesApi = require('./routes/index');
var app = express();

mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {

  var gfs = gridfs(connection.db);

  // Upload a file from loca file-system to gridfs (to use by maintainers)
  app.get('/api/file/upload', (req, res) => {

    var filename = req.query.filename;

    var writestream = gfs.createWriteStream({ filename: filename });
    fs.createReadStream(__dirname + "/public/" + filename).pipe(writestream);
    writestream.on('close', (file) => {
      res.send('Stored File: ' + file.filename + ' , id is: ' + file._id);
    });
  });

  //full album/folder addition to gridfs (to use by maintainers)
  app.get('/api/file/uploadalbum', (req, res) => {
    var albumID = req.query.albumID;
    var folderName = req.query.folderName;
    
    var fileList = [];
    fs.readdir(__dirname + "/public/" + folderName + '/', (err, files) => {

      fileList = files;

      for (var i = 0; i < fileList.length; i++) {

        let filepath = (__dirname + "/public/" + folderName + '/' + fileList[i]);
        let tags = NodeID3.read(filepath);

        var savedFileID = '';
        var writestream = gfs.createWriteStream({ filename: fileList[i] });
        fs.createReadStream(__dirname + "/public/" + folderName + '/' + fileList[i]).pipe(writestream);
        writestream.on('close', (file) => {
          savedFileID = file._id;

          var myJSONObject = {
            title: tags.title,
            track_number: tags.trackNumber,
            album: albumID,
            song_file: savedFileID
          };

          request({
            url: "http://localhost:3000/api/songs",
            method: "POST",
            json: true,
            body: myJSONObject
          }, function (error, response, body) {
          });
        });
      }
    });
  });

  // streams/downloads file by object id from gridfs (used by clients to stream music files)
  app.get('/api/file/download', (req, res) => {

    var objectID = req.query.objectID;

    gfs.exist({ _id: objectID }, (err, file) => {
      if (err || !file) {
        res.status(404).send('File Not Found');
        return
      }

      res.header('Content-Type', 'audio/mpeg');

      var readstream = gfs.createReadStream({ _id: objectID });
      readstream.pipe(res);
    });
  });

  //download a picture file by id from gridfs (used by clients)
  app.get('/api/file/download/picture', (req, res) => {

    var objectID = req.query.objectID;

    gfs.exist({ _id: objectID }, (err, file) => {
      if (err || !file) {
        res.status(404).send('File Not Found');
        return
      }

      res.header('Content-Type', 'image/jpeg');

      var readstream = gfs.createReadStream({ _id: objectID });
      readstream.pipe(res);
    });
  });

  // Delete a file from gridfs
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

  // Get file information(File Meta Data) from gridfs
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