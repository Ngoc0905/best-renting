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

router.delete('/reviews/:id', (req, res, next) => {
    Review.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.json(true);
    });
});

router.put('/reviews/:id', (req, res, next) => {
    const review = req.params.id;
    const reviewUpdate = {
        address: req.body.address,
        number: req.body.number,
        floor: req.body.floor,
        building: req.body.building,
        price: req.body.price,
        comments: req.body.comments,
        ratingDistrict: req.body.ratingDistrict,
        ratingBuilding: req.body.ratingBuilding,
        ratingLandlord: req.body.ratingLandlord
    };

    Review.findByIdAndUpdate(review, reviewUpdate, (err, updatedReview) => {
        if (err) return next(err);
        res.json(updatedReview);
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

router.put('/adrentings/:id', (req, res, next) => {
    const adrenting = req.params.id;
    const adrentingUpdate = {
        address: req.body.address,
        number: req.body.number,
        floor: req.body.floor,
        building: req.body.building,
        price: req.body.price, 
        description: req.body.description,
        contact: req.body.contact,
    };
    AdRenting.findByIdAndUpdate(adrenting, adfindingUpdate, (err, updatedAdRenting) => {
        if (err) return next(err);
        res.json(updatedAdRenting);
    });
});

module.exports = router;