// app/routes.js

module.exports = function(app, passport) {

    // INDEX
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // SCORES
    app.get('/scores', isLoggedIn, function(req, res) {
        scores =    [{"name":"1% Milk","score":60},
                     {"name":"VM Scrambled Eggs","score":15},{"name":"Vanilla Soft Serve","score":-10}];

        res.render('displayitems.ejs', { user: req.user, foodScores : JSON.stringify(scores)});
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}
