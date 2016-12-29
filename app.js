var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about')
var userProvider = require('./userprovider').userProvider;

var app = express();
var jp2a = require( "jp2a" );

mongoose.connect('mongodb://localhost/mongo');

var db =mongoose.connection;
const CFONTS = require('cfonts');

CFONTS.say('ARETE', {
    font: 'block',        //define the font face
    align: 'left',        //define text alignment
    colors: ['white'],    //define all colors
    background: 'Black',  //define the background color
    letterSpacing: 1,     //define letter spacing
    lineHeight: 1,        //define the line height
    space: true,          //define if the output text should have empty lines on top and on the bottom
    maxLength: '0'        //define how many character can be on one line
});

jp2a( [ "public/images/asciidiscusthrower.jpg", "--width=50", "--background=light" ],  function( output ){
    console.log( output );
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

fs.readdirSync(__dirname + '/models').forEach(function(filename){
    if (~filename.indexOf('.js')) require(__dirname+ '/models/' + filename)
})


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/about', about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
