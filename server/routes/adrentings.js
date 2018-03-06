const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');

const AdRenting = require('../models/adrenting');

router.post('/adrenting', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
    const adrenting = new AdRenting(req.body);
    adrenting.user = req.user._id;
    AdRenting.create(adrenting, (err) => {
        if (err) return next(err);
        res.json(adrenting);
    });
});

router.get('/adrenting', (req, res, next) => {
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
    AdRenting.find(criteria, (err, adrentings) => {
        if (err) return next(err);
        return res.json(adrentings);
    });
});

router.delete('/adrentings/:id', (req, res, next) => {
    AdRenting.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.json(true);
    });
});

router.put('/adrentings/:id', (req, res, next) => {
    const adrenting = req.params.id;
    const adrentingUpdate = {
        address: req.body.address,
        number: req.body.number,
        floor: req.body.floor,
        building: req.body.building,
        rentprice: req.body.rentprice, 
        description: req.body.description,
        contact: req.body.contact
    };
    AdRenting.findByIdAndUpdate(adrenting, adrentingUpdate, (err, updatedAdRenting) => {
        if (err) return next(err);
        res.json(updatedAdRenting);
    });
});

module.exports = router;