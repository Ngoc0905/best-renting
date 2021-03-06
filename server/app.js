const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./models/user');
const config = require('./config');
const {
  Strategy,
  ExtractJwt
} = require('passport-jwt');
const cors = require('cors');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
const history = require('express-history-api-fallback');
const users = require('./routes/users');
const authRoutes = require('./routes/auth');
const reviewsRoutes = require('./routes/reviews');
const adrentingsRoutes = require('./routes/adrentings');
const adfindingsRoutes = require('./routes/adfindings');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use(passport.initialize());
const strategy = new Strategy({
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    User.findById(payload.id).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(new Error('User not found'));
      }
    });
  }
);
passport.use(strategy);

app.get(
  '/api/secret',
  passport.authenticate('jwt', config.jwtSession), (req, res) => {
    res.json(req.user);
  }
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', users);
app.use('/api', authRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', adrentingsRoutes);
app.use('/api', adfindingsRoutes);

const clientRoot = path.join(__dirname, '../client/dist');
app.use('/', express.static(clientRoot));
app.use(history('index.html', { root: clientRoot }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;