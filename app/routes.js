// app/routes.js

// Test code
var foodItem            = require('./models/foodItem');
//var User                = require('./models/user');
// Test code

module.exports = function(app, passport) {

    // INDEX
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // SCORES
    app.get('/scores', isLoggedIn, function(req, res) {
        res.render('displayitems.ejs', { user: req.user});
    });

    app.get('/daily', function(req, res) {
        var query = foodItem.find({"daily" : true});
        query.select("id name daily_score").sort({"daily_score":-1}).exec(function(err, docs){
            res.send(docs);
        });
    });

    // For testing -  we can add foods via html post
    app.post('/addfood', function(req, res) {
        if (req.body.foodname == undefined || req.body.foodname == "" || 
            req.body.score == "" ||req.body.score == undefined) {
            res.send("bad input :(");
        } else {
            addFood(req, res);
        }
    });

    app.post('/votes', isLoggedIn, function(req, res) {
        //recieve the array
        if (req.body.upIds != undefined && req.body.downIds != undefined) {
            upIds = JSON.parse(req.body.upIds);
            downIds = JSON.parse(req.body.downIds);
            console.log(upIds);
            console.log(downIds);
            for (i in upIds) {
                up_score(upIds[i]);
            }
            for (i in downIds) {
                down_score(downIds[i]);
            }
            res.send("added");
        } else {
            res.send("cannot");
        }
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

function getScores() {
    var query = foodItem.find({"daily" : true});
    query.select("id name daily_score").sort({"daily_score":-1}).exec(function(err, docs){
        return docs;
    });
}

// Add data from addfood
function addFood(req, res) {
    var toUpdate = {
                name            : req.body.foodname,        
                daily           : true,
                daily_score     : parseInt(req.body.score, 10),
                alltime_score   : parseInt(req.body.score, 10),
                carm            : true,
                dewick          : true,
                stats           : {freq : 1}
    }
    foodItem.update({"name" : req.body.foodname}, toUpdate, {upsert : true}, function (err, num, raw) {
        console.log("in update");
        if (err) console.log("error in update");
        res.send("{'status':'success!'}");
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

function up_score(foodId) {
    foodItem.findOne({'_id' : foodId}, function(err, item){
        if(err) {
            console.log("you fucked up")
        } else if(item){
            item.daily_score   += 1;
            item.save();
        }
    });
}

function down_score(foodId) {
    foodItem.findOne({'_id' : foodId}, function(err, item){
        if(err) {
            console.log("you fucked up")
        } else if(item){
            item.daily_score   -= 1;
            item.save();
        }
    });
}
