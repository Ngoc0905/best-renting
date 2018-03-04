const express = require('express');
const router = express.Router();

const passport = require('passport');
const config = require('../config');
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});

const Review = require('../models/review');
const AdFinding = require('../models/adfinding');
const AdRenting = require('../models/adrenting');
const User = require('../models/user');

router.get('/users/:userId/profile', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  User.findById(req.params.userId, (err, profile) => {
    if(err) return next(err);
    res.json(profile);
  });
});

router.get('/users/avatar', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if(err) return next(err);
    res.send(user.avatar);
  });
});

router.post('/users/:userId/profile', passport.authenticate('jwt', config.jwtSession), upload.single('avatar'), (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if(err) return next(err);
    if(!user) throw new Error(`User doesn't exist`);
    console.log(req.file);
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone || user.phone;
    user.avatar = req.file ? `/uploads/${req.file.filename}` : user.avatar;

    user.save((err) => {
      if(err) return next(err);
      res.json(user);
    });
  });
});

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