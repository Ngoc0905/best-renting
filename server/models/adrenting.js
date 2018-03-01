const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdRentingSchema = new Schema ({
    address: {
        street_number: String,
        route: String,
        city: String,
        region: String,
        country: String,
        postal: String
    },
    number: Number,
    floor: Number,
    building: String,
    description: String,
    contact: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('AdRenting', AdRentingSchema);