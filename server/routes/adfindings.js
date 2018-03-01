const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');

const AdFinding = require('../models/adfinding');

router.post('/adfinding', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
    const adfinding = new AdFinging(req.body);
    review.user = req.user._id;
    AdFinding.create(adfinding, (err) => {
        if (err) return next(err);
        res.json(adfinding);
    });
});

router.get('/adfinding', (req, res, next) => {
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
        AdFinding.find(criteria, (err, adfindings) => {
        if (err) return next(err);
        return res.json(adfindings);
    });
});

module.exports = router;