//server.js

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var engine = require('ejs-locals')
var path = require('path');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
require('./config/passport')(passport); // pass passport for configurati

app.use(express.static(__dirname + '/public'));

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

app.engine('ejs', engine)
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({secret: 'topsecrets', saveUninitialized: true, resave: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);