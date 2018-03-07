const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
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
    reviewprice: Number,
    comments: String,
    ratingDistrict: Number,
    ratingBuilding: Number,
    ratingLandlord: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);