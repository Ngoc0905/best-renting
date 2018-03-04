const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdFindingSchema = new Schema ({
    address: {
        street_number: String,
        route: String,
        city: String,
        region: String,
        country: String,
        postal: String,
        lat: Number,
        lng: Number
    },
    comments: String,
    contact: String,
    daterent: Date,
    rentprice: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('AdFinding', AdFindingSchema);