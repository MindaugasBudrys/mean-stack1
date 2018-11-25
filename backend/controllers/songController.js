// var Song = require('../models/book');
// var Author = require('../models/author');
// var Genre = require('../models/genre');
// var BookInstance = require('../models/bookinstance');

// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');

// var async = require('async');

// exports.index = function(req, res) {

//     async.parallel({
//         book_count: function(callback) {
//             Book.count(callback);
//         },
//         book_instance_count: function(callback) {
//             BookInstance.count(callback);
//         },
//         book_instance_available_count: function(callback) {
//             BookInstance.count({status:'Available'},callback);
//         },
//         author_count: function(callback) {
//             Author.count(callback);
//         },
//         genre_count: function(callback) {
//             Genre.count(callback);
//         },
//     }, function(err, results) {
//         res.render('index', { title: 'Local Library Home', error: err, data: results });
//     });
// };


// // Display list of all books.
// exports.book_list = function(req, res, next) {

//   Book.find({}, 'title author ')
//     .populate('author')
//     .exec(function (err, list_books) {
//       if (err) { return next(err); }
//       // Successful, so render
//       res.render('book_list', { title: 'Book List', book_list:  list_books});
//     });

// };
