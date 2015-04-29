// app/models/user.js
var mongoose = require('mongoose');
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

module.exports = mongoose.model('User', userSchema);