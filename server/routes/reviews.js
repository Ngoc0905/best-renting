const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');

const Review = require('../models/review');

router.post('/reviews', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
    const review = new Review(req.body);
    review.user = req.user._id;
    Review.create(review, (err) => {
        if (err) return next(err);
        res.json(review);
    });
});

router.get('/reviews', (req, res, next) => {
    let criteria = {};
    if (req.query.country)
        criteria['address.country'] = req.query.country;
    if (req.query.region)
        criteria['address.region'] = req.query.region;
    if (req.query.city)
        criteria['address.city'] = req.query.city;
    if (req.query.route)
        criteria['address.route'] = req.query.route;
    if (req.query.street_number)
        criteria['address.street_number'] = req.query.street_number;
    Review.find(criteria).populate("user").exec((err, reviews) => {
        if (err) return next(err);
        return res.json(reviews);
    });
});

module.exports = router;