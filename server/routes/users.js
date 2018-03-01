const express = require('express');
const router = express.Router();

const passport = require('passport');
const config = require('../config');

const Review = require('../models/review');
const AdFinding = require('../models/adfinding');
const AdRenting = require('../models/adrenting');

router.get('/users/:userId/reviews', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  Review.find({user: req.params.userId}, (err, reviews) => {
    if(err) return next(err);
    res.json(reviews);
  });
});

router.get('/users/:userId/adfinding', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  AdFinding.find({user: req.params.userId}, (err, posts) => {
    if(err) return next(err);
    res.json(posts);
  });
});

router.get('/users/:userId/adrenting', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  AdRenting.find({user: req.params.userId}, (err, posts) => {
    if(err) return next(err);
    res.json(posts);
  });
});

module.exports = router;