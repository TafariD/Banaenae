// app/routes.js

var foodItem            = require('./models/foodItem');
var Users                = require('./models/user');

module.exports = function(app, passport) {
    /**
     * FRONT END ROUTES 
     **/

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/daily', isLoggedIn, function(req, res) {
        var query = foodItem.find({"daily" : true});
        query.select("id name daily_score").sort({"daily_score":-1}).exec(function(err, docs){
            res.send(docs);
        });
    });


    app.get('/alltime', isLoggedIn, function(req, res) {
        var query = foodItem.find({});
        query.select("id name alltime_score daily").sort({"alltime_score":-1}).exec(function(err, docs){
            res.send(docs);
        });
    });



    /**
     * BACK END ROUTES 
     **/

    // Scores 
    app.get('/scores', isLoggedIn, function(req, res) {
        res.render('displayitems.ejs', { user: req.user});
    });

    app.get('/alltime_scores', isLoggedIn, function(req, res) {
        res.render('alltimeitems.ejs', { user: req.user});
    });
    // User upvoted/downvoted items
    app.get('/uservoted', function(req, res){
        var query = Users.findOne({'google.id':req.user.google.id});
        query.select("up_ids down_ids").exec(function(err, docs) {
            console.log(docs);
            res.send(JSON.stringify(docs));
        });
    });

    //POST votes
    app.post('/votes', isLoggedIn, function(req, res) {
        //recieve the array
        if (req.body.upIds != undefined && req.body.downIds != undefined) {
            upIds = JSON.parse(req.body.upIds);
            downIds = JSON.parse(req.body.downIds);
            //console.log(upIds);
            //console.log(downIds);
            updateScores(req.user.google.id, upIds, downIds);
            res.send("added");
        } else {
            res.send("cannot");
        }
    });

    /**
     * AUTHENTICATION
     */

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Google+ Authentication
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/scores',
                    failureRedirect : '/' 
            })
    );

    /**
     * Testing 
     */
    // For testing -  we can add foods via html post
    app.post('/addfood', function(req, res) {
        if (req.body.foodname == undefined || req.body.foodname == "" || 
            req.body.score == "" ||req.body.score == undefined) {
            res.send("bad input :(");
        } else {
            addFood(req, res);
        }
    });
};

/***************************** END OF ROUTES **********************************/

/* Returns Array of all items available today */
function getScores() {
    var query = foodItem.find({"daily" : true});
    query.select("id name daily_score").sort({"daily_score":-1}).exec(function(err, docs){
        return docs;
    });
}

/* route middleware to make sure a user is logged in */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

/* string, strings[], string[]
 * Updates scores in DB, with given IDs of upvoted and downvoted items.
 */
function updateScores(user_id, upIds, downIds) {
    Users.findOne({'google.id' : user_id}, function(err, user){
        if (err){
            console.log("error in up_score");
        } else if(user) {
            var userUpVoted = user.up_ids;
            var userDownVoted = user.down_ids;
            upScores(userUpVoted, upIds);
            downScores(userDownVoted, downIds);
            user.down_ids = downIds;
            user.up_ids = upIds;
            user.save();
        }
    });
}

/* string, strings[]
 * Updates scores in DB, with given IDs of upvoted items.
 */
function upScores(userUpVoted, upIds) {
    for (i in upIds) {
        // new food ID was seen ... add score
        var newId = upIds[i];
        //console.log(typeof(newId));
        if(userUpVoted.indexOf(newId) == -1) {
            plusOneScore(newId);
            //user score +1
        }
    }
    for (i in userUpVoted) {
        // old food ID was not seen ... minus score
        var oldId = userUpVoted[i];
        if(upIds.indexOf(oldId) == -1) {
            minusOneScore(oldId);
            //user score -1
        }
    }
}

/* string, strings[]
 * Updates scores in DB, with given IDs of downvoted items. 
 */
function downScores(userDownVoted, downIds){
    for (i in downIds) {
        // new food ID was seen ... add score
        var newId = downIds[i];
        console.log(typeof(newId));
        if(userDownVoted.indexOf(newId) == -1) {
            minusOneScore(newId);
            //user score +1
        }
    }
    for (i in userDownVoted) {
        // old food ID was not seen ... minus score
        var oldId = userDownVoted[i];
        if(downIds.indexOf(oldId) == -1) {
            plusOneScore(oldId);
            //user score -1

        }
    }
}

function plusOneScore(foodId) {
    foodItem.findOne({_id : foodId}, function(err, item){
        if(err) {
            console.log("you fucked up")
        } else if(item){
            item.daily_score   += 1;
            item.save();
        }
    });
}
function minusOneScore(foodId){
    foodItem.findOne({'_id' : foodId}, function(err, item){
        if(err) {
            console.log("you fucked up")
        } else if(item){
            item.daily_score   -= 1;
            item.save();
        }
    });
}

/*** Testing functions *****/

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
