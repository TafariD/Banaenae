// config/auth.js
module.exports = {
    'googleAuth' : {
        'clientID'      : process.env.GOOGLE_ID,
        'clientSecret'  : process.env.GOOGLE_SECRET,
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
};
