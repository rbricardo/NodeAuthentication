const mongoose = require('mongoose');

const dbConnection = 'mongodb://rbricardo:rick123@ds149960.mlab.com:49960/learningmongoose';

mongoose.connect(dbConnection);

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error ;('))
