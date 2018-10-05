var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');
 
// var conn = mongoose.createConnection('mongodb://localhost/mean-angular6');

mongoose.connect('mongodb://localhost/mean-angular6');
var conn = mongoose.connection;

 
// var conn = mongoose.connect('mongodb://localhost/mean-angular6', { promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection successful'))
//   .catch((err) => console.error(err));

  conn.once('open', function () {
    var gfs = Grid(conn.db, mongoose.mongo);


    // //filename to store in mongodb
    // var writestream = gfs.createWriteStream({
    //     filename: 'wutang.mp3'
    // });
    // fs.createReadStream('/jybanstestas/wutang.mp3').pipe(writestream);
 
    // writestream.on('close', function (file) {
    //     // do something with `file`
    //     console.log(file.filename + 'Written To DB');
    // });

    // var testjebat = {
    //   _id: '50e03d29edfdc00d34000001', // a MongoDb ObjectId
    //   filename: 'my_file.txt', // a filename
    //   mode: 'w', // default value: w
    // }


    gfs.files.find({ filename: 'wutang.mp3' }).toArray(function (err, files) {
      if (err) {
           throw (err);
      }
      console.log(files);
    });



  })

var apiRouter = require('./routes/book');
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist/mean-angular6')));
app.use('/', express.static(path.join(__dirname, '../frontend/dist/mean-angular6')));
app.use('/api', apiRouter);
// app.use('/xd', express.static('public'));
app.use(express.static('public'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
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