const mongoose = require('mongoose');

const dbConnection = 'mongodb://rbricardo:rick123@ds149960.mlab.com:49960/learningmongoose';

mongoose.connect(dbConnection);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        // unique: true,
    },
    matriculation: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    }, // URL
    rating: Number,
    type: {
        type: String,
        enum: ['motorista', 'passageiro', 'todos'],
        required: true,
    },
    vehicle: {
        licence: String,
        color: String,
        Model: String,
        Year: String,
        photo: String, // URL 
        type: {
            type: String,
            enum: ['carro', 'moto']
        },
    },
    startPlace: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    }, // Latitude e longitude
    birthDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;