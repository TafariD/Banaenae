//server.js

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var schedule = require('node-schedule');
//var cheerio  = require('cheerio');
//var path = require('path');
var configDB = require('./config/database.js');


// Connect to MongoDB via mongoose
mongoose.connect(configDB.url);
require('./config/passport')(passport); // pass passport for configurati

app.use(express.static(__dirname + '/public'));

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
// set up ejs engine for templating
app.set('view engine', 'ejs'); 

// required for passport
app.use(session({secret: 'topsecrets', saveUninitialized: true, resave: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
var schedule = require('node-schedule');

//daily scraper
//require('./app/scrape.js')(schedule, mongoose, cheerio);
// routes
require('./app/routes.js')(app, passport, mongoose, bodyParser); // load our routes and pass in our app and fully configured passport
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);