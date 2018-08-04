const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        // required: true
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
        // required: true,
    },
    password: {
        type: String,
        // required: true,
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
        // required: true,
        trim: true,
        // unique: true,
    },
    matriculation: {
        type: String,
        // required: true,
    },
    photo: {
        type: String,
    }, // URL
    rating: {
        String,
    },
    type: {
        type: String,
        // required: true,
    },
    vehicle: [{
        model: {
            type: String,
            // required: true
        },
        color: {
            type: String,
            //  required: true
        },
        licence: {
            type: String,
            // require: true,
        },
        year: {
            type: String,
            // require: true
        },
        photo: {
            type: String, // URL 
            // require: true
        },
        type: {
            type: String,
            enum: ['carro', 'moto'],
            // require: true
        },
    }],
    geoLocation: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    }, // Latitude e longitude
    birthDate: {
        type: Date,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;