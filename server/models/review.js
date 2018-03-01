const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
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
    comments: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);