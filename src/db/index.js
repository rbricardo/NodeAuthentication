const mongoose = require('mongoose');

const dbConnection = 'mongodb://rbricardo:rick123@ds149960.mlab.com:49960/learningmongoose';

mongoose.connect(dbConnection);

module.exports = mongoose;
