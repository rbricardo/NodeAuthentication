const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, min: 16, max: 30, required: true},
});

const UserModel = mongoose.model('UserCollection', UserSchema);