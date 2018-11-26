var mongoose = require('mongoose');




// var gracefulShutdown;
// var dbURI = 'mongodb://localhost/meanAuth';
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGOLAB_URI;
// }

// mongoose.connect(dbURI);




var dev_db_url = 'mongodb://holysmokes:kasekas1212@ds155352.mlab.com:55352/smokifydb';
mongoose.connect(dev_db_url);


require('./user');