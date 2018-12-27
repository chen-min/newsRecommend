var createError = require('http-errors');
var express = require('express');
var path = require('path');

var news  = require('./routes/news')
// var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static',express.static(path.join(__dirname, '../client/build/static/')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin",'*');
  res.header("Access-Control-Allow-Headers", "X-Requested");
  next();
})
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  res.render('404 Not Found')
});


module.exports = app;
