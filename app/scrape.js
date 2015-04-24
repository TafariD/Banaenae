// /app/scrape.js

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var foodItems = require('./models/foodItem')

// app.get('/', function(req, res){
//     url = 'http://menus.tufts.edu/foodpro/shortmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1';

//     request(url, function(error, response, html){
//         if(!error){
//             var $ = cheerio.load(html);
//             var fooditems = $(".shortmenurecipes").find("a");
//         var json = [];
//         $(fooditems).each(function(){
//             json.push($(this).text());
//         });
//         console.log("blalbhalbha items " + json);
//         res.send(json);
//         }
//     })
// })

// app.listen(process.env.PORT || 3000);


module.exports = function(schedule, mongoose) {
    //var rule = new schedule.RecurrenceRule();
    // var j = schedule.scheduleJob(rule, function(){
    //     grabDailyItems();
    // });
}
// Returns a list of strings of daily items
function grabDailyItems() {
    string = "string";
    var url = 'http://menus.tufts.edu/foodpro/shortmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1';
    request(url, function(error, response, html){
        if (!error) {
            var $ = cheerio.load(html);
            var fooditems = $(".shortmenurecipes").find("a");
            var items = [];
            $(fooditems).each(function(){
                console.log("I've got all the items");
                items.push($(this).text());
            });
            console.log(items);
        }
    })
}

function itemToDB(foodname) {
    foodItem.findOne({'name' : foodname}, function(err, item){
        if(err) {
            console.log("you fucked up")
        } else if(item){
            item.daily          = true;
            item.daily_score    = 0;
            item.stats.freq    += 1;
            item.save();
        } else {
            var newItem         = new foodItem();
            newItem.foodname    = foodname;
            newItem.daily       = true;
            newItem.daily_score = 0;
            newItem.carm        = true;
            newItem.dewick      = true;
            newItem.stats.freq  = 1;
            newItem.save();
        }
    });
}

/* psuedo:
for each item:
    var toUpdate = {
                name            : req.body.foodname,        
                daily           : true,
                daily_score     : parseInt(req.body.score, 10),
                alltime_score   : parseInt(req.body.score, 10),
                carm            : true,
                dewick          : true,
                stats           : {freq : 1}
    }
*/

