const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');

const AdFinding = require('../models/adfinding');

router.post('/adfinding', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
    const adfinding = new AdFinding(req.body);
    adfinding.user = req.user._id;
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

router.delete('/adfindings/:id', (req, res, next) => {
    AdFinding.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.json(true);
    });
});

router.put('/adfindings/:id', (req, res, next) => {
    const adfinding = req.params.id;
    const adfindingUpdate = {
        address: req.body.address,
        comments: req.body.comments,
        contact: req.body.contact,
        daterent: req.body.daterent,
        rentprice: req.body.rentprice
    };
    AdFinding.findByIdAndUpdate(adfinding, adfindingUpdate, (err, updatedAdFinding) => {
        if (err) return next(err);
        res.json(updatedAdFinding);
    });
});

module.exports = router;