const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //require: true,
    },
    
    created: {
        type: Date,
        default: Date.now
    }
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;