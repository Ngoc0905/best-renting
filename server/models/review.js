const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    address: {
        street_number: Number,
        route: String,
        city: String,
        region: String,
        country: String,
        postal: String
    },
    number: Number,
    floor: Number,
    building: String,
    ratingDistrict: Number,
    ratingBuilding: Number,
    ratingLandlord: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);