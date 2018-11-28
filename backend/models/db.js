var mongoose = require('mongoose');

// var gracefulShutdown;
// var dbURI = 'mongodb://localhost/meanAuth';
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGOLAB_URI;
// }

// mongoose.connect(dbURI);

//mlab
var dev_db_url = 'mongodb://holysmokes:kasekas1212@ds155352.mlab.com:55352/smokifydb';
// mongodb://localhost:27017/mean-angular6
mongoose.connect(dev_db_url);

//local
// mongoose.connect('mongodb://localhost:27017/mean-angular6');

require('./User');
require('./Album');
require('./Artist');
require('./Genre');
require('./Song');