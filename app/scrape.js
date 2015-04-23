// /app/scrape.js

// var express = require('express');
// var fs = require('fs');
// var request = require('request');
// var cheerio = require('cheerio');
// var app     = express();

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


// module.exports = function(schedule, mongoose) {
//     var fs = require('fs');
//     var request = require('request');
//     var cheerio = require('cheerio');

//     // Returns a list of strings of daily items
//     function grabDailyItems(){
//         var url = 'http://menus.tufts.edu/foodpro/shortmenu.asp?sName=Tufts+Dining&locationNum=11&locationName=Dewick+MacPhie+Dining+Center&naFlag=1';
//         request(url, function(error, response, html){
//             if (!error) {
//                 var $ = cheerio.load(html);
//                 var fooditems = $(".shortmenurecipes").find("a");
//                 var items = [];
//                 $(fooditems).each(function(){
//                     items.push($(this).text());
//                 });
//                 return items;
//             }
//         })
//     }

//     var rule = new schedule.RecurrenceRule();
//     var j = schedule.scheduleJob(rule, function(){
//         console.log(grabDailyItems());
// });
// }