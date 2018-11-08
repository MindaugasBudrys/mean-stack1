var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
var fs = require('fs');
var gridfs = require('gridfs-stream');


var apiRouter = require('./routes/song');

var app = express();
 
// var conn = mongoose.createConnection('mongodb://localhost/mean-angular6');

mongoose.connect('mongodb://localhost:27017/mean-angular6')
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
      fs.createReadStream(__dirname + "/public/" + filename).pipe(writestream);
      writestream.on('close', (file) => {
          res.send('Stored File: ' + file.filename);
      });
  });

  // Download a file from MongoDB - then save to local file-system
  // streams/downloads file by object id
  app.get('/api/file/download', (req, res) => {
  // Check file exist on MongoDB
  
  var filename = req.query.filename;
  var objectID = req.query.objectID;
  
      gfs.exist({ _id: objectID}, (err, file) => {
          if (err || !file) {
              res.status(404).send('File Not Found');
      return
          } 
    
    res.header('Content-Type', 'audio/mpeg',);

    //TO DO:
    // 1. content-length idet del duration? gal kazka pafixins pvz chrome?
    // 2. https://developer.mozilla.org/en-US/docs/Web/HTTP/Configuring_servers_for_Ogg_media






    // res.header('Content-Length', );
    // console.log(file.status);
    // console.log(file.);

    var readstream = gfs.createReadStream({_id: objectID});
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
      
      gfs.files.find({ filename: filename }).toArray( (err, files) => {
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
app.use('/api', apiRouter);
// app.use('/xd', express.static('public'));
// app.use(express.static('public'))


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});
module.exports = app;
