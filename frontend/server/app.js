var cors = require('cors');
var passport = require('passport');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var auth = require('./routes/auth')
var news  = require('./routes/news')
// var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static',express.static(path.join(__dirname, '../client/build/static/')));

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin",'*');
//   res.header("Access-Control-Allow-Headers", "X-Requested");
//   next();
// })
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

app.use(passport.initialize());
var localSignUpStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignUpStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth_checker')
app.use('/news', authCheckMiddleware)
app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  res.render('404 Not Found')
});


module.exports = app;
