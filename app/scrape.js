// /app/scrape.js

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var foodItem = require('./models/foodItem')

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
    var date = new Date(2015, 3, 24, 1, 6, 46);
    console.log(date);
    var j = schedule.scheduleJob(date, function(){
        console.log('The world is going to end today.');
        grabDailyItems();
    });
}
// Returns a list of strings of daily items
function grabDailyItems() {
    console.log('in grabDailyItems');
    var url = 'http://menus.tufts.edu/foodpro/shortmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1';
    request(url, function(error, response, html){
        console.log('in request');
        if (!error) {
            console.log('about to cheerio load');
            var $ = cheerio.load(html);
            console.log('cheerio loaded')
            var items = $(".shortmenurecipes").find("a");
            //var items = [];
            console.log('got items, now in forloop')
            $(items).each(function(){
                //console.log("I've got all the items");
                console.log($(this).text())
                itemToDB($(this).text());
                //items.push($(this).text());
            });
            //console.log(items);
        } else {
            console.log('error in request');
        }
    });
    console.log('out of request');
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
            newItem.name        = foodname;
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

