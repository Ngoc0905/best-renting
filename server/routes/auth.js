const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const password = require('passport');
const config = require('../config');

const authenticate = User.authenticate();
router.post('/login', (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (email && password) {
        authenticate(email, password, (err, user, failed) => {
            if (err) {
                return next(err);
            }
            if (failed) {
                return res.status(401).json({
                    error: failed.message
                });
            }
            if (user) {
                const payload = {
                    id: user.id
                };
                const token = jwt.encode(payload, config.jwtSecret);
                res.json({
                    token,
                    name: user.name,
                    email: user.email,
                    id: user._id
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

router.post('/signup', (req, res, next) => {
    const {
        email,
        name,
        password
    } = req.body;

    const user = new User({
        email,
        name
    });

    User.register(user, password, (err) => {
        if (err) {
            return next(err);
        }
        res.json({
            success: true
        });
    });
});

module.exports = router;