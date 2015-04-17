// app/routes.js

// Test code
var foodItem            = require('../app/models/fooditem');
// Test code

module.exports = function(app, passport) {

    // INDEX
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // SCORES
    app.get('/scores', isLoggedIn, function(req, res) {
        // TEST CODE - Passing JSON in plaintext to .ejs template
        var scores =    [{"name":"1% Milk","score":60},
                     {"name":"VM Scrambled Eggs","score":15},{"name":"Vanilla Soft Serve","score":-10}];
        // TEST CODE
        // We want scores = getScores() <---- grabs data from mongoDB
        res.render('displayitems.ejs', { user: req.user, foodScores : JSON.stringify(scores)});
    });

    // For testing -  we can add foods via html post
    app.post('/addfood', function(req, res) {
        console.log(req.body.foodname, req.body.score);
        res.send(addFood(req));
    });

    // LOGOUT 
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // GOOGLE ROUTES
    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile'] }));
    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/scores',
                    failureRedirect : '/'
            })
    );
};

// Add data from addfood

function addFood(req) {
    if (req.body.foodname != undefined && req.body.score != undefined) {
        var toUpdate = {
                    name            : req.body.foodname,        
                    daily           : true,
                    daily_score     : parseInt(req.body.score, 10),
                    alltime_score   : parseInt(req.body.score, 10),
                    carm            : true,
                    dewick          : true,
                    stats : {
                        freq : parseInt(req.body.score, 10)          
                    }
            };

        foodItem.update({"name" : req.body.foodname}, toUpdate, {upsert : true});
        return "Success!";
    } else {
        return "add Item failed :(";
    }
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
