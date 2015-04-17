//mongo foodItem Schema
var mongoose = require('mongoose');

var foodItemSchema = mongoose.Schema({
        name : String,              // Name of food item
        daily : Boolean,            // True if offered today, false otherwise
        daily_score : Number,       // Score for today,  -1 if not offered today
        alltime_score : Number,     // Score alltime
        carm : Boolean,             // True if offered at carm, false otherwise
        dewick : Boolean,           // True if offered at dewick, false otherwise

        // Stats - For diagnostics and tracking other kinds of data
        stats : {
            freq : Number           
        }
});

// create the model for FoodItems and expose it to our app
module.exports = mongoose.model('FoodItems', foodItemSchema);
