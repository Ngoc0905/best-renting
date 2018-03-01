const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdFindingSchema = new Schema ({
    address: {
        street_number: Number,
        route: String,
        city: String,
        region: String,
        country: String,
        postal: String
    },
    comments: String,
    contact: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('AdFinding', AdFindingSchema);