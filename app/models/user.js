// app/models/user.js
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
var userSchema = mongoose.Schema({
    score            : Number,
    up_ids			 : Object,
    down_ids		 : Object,
    google           : {
        name         : String,
        id           : String,
    }
});
// methods ======================
// generating a hash
// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);