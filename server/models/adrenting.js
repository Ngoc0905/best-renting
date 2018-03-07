const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdRentingSchema = new Schema ({
    address: {
        required: true,
        type: {
            street_number: String,
            route: String,
            city: String,
            region: String,
            country: String,
            postal: String,
            lat: Number,
            lng: Number
        }   
    },
    number: Number,
    floor: Number,
    building: String,
    rentprice: Number,
    description: String,
    contact: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('AdRenting', AdRentingSchema);