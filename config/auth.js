// config/auth.js
module.exports = {
    'googleAuth' : {
        'clientID'      : process.env.GOOGLE_ID,
        'clientSecret'  : process.env.GOOGLE_SECRET,
        'callbackURL'   : 'http://banaenae.herokuapp.com/auth/google/callback'
    }
};
