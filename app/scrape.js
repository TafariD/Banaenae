// /app/scrape.js

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var foodItem = require('./models/foodItem')
var Users = require('./models/user')

module.exports = function(schedule, mongoose) {
    // Recurrence rule for deployment - 
    // var rule = new schedule.RecurrenceRule();
    // var j = schedule.scheduleJob(rule, function(){
    //     grabDailyItems();
    // });

    // One of rule for testing and proto
    var date = new Date(2015, 3, 24, 1, 6, 46);
    console.log(date);
    var job = schedule.scheduleJob(date, function(){
            console.log('The world is going to end today.');
            grabDailyItems();
            fakeAlltimeItems();
        //job.cancel();
    });
}
// Returns a list of strings of daily items
function grabDailyItems() {
    var url = 'http://menus.tufts.edu/foodpro/shortmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1';
    request(url, function(error, response, html){
        console.log("scraping");
        if (!error) {
            var $ = cheerio.load(html);
            //dailyReset();
            var items = $(".shortmenurecipes").find("a");
            $(items).each(function(){
                //console.log($(this).text())
                itemToDB($(this).text());
            });
        } else {
            console.log('error in request');
            //throw error;
        }
    });
}

// string
// add foodname / foodItem to DB,
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
            newItem.alltime_score = 0;
            newItem.carm        = true;
            newItem.dewick      = true;
            newItem.stats.freq  = 1;
            newItem.save();
        }
    });
}

//fake test code for prototyping at display
function fakeAlltimeItems(){
    var url = 'http://menus.tufts.edu/foodpro/shortmenu.asp?sName=Tufts+Dining&locationNum=09&locationName=Carmichael+Dining+Center&naFlag=1';
    request(url, function(error, response, html){
        console.log("scraping");
        if (!error) {
            var $ = cheerio.load(html);
            //dailyReset();
            var items = $(".shortmenurecipes").find("a");
            $(items).each(function(){
                //console.log($(this).text())
                fakeitemToDB($(this).text());
            });
        } else {
            console.log('error in request');
            //throw error;
        }
    });
}

// string
// add foodname / foodItem to DB,
function fakeitemToDB(foodname) {
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
            newItem.daily       = false;
            newItem.daily_score = 0;
            newItem.alltime_score = 0;
            newItem.carm        = true;
            newItem.dewick      = true;
            newItem.stats.freq  = 1;
            newItem.save();
        }
    });
}