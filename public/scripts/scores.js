// /public/scripts/scores.js
// Clientside JS for scores page

var userVotedURL  = "uservoted"

function init(render, url){
    $(document).ready(function(){
        //Render List
        if(navigator.geolocation){
            console.log("getting location")
            navigator.geolocation.getCurrentPosition(function(){
                
            })
        } else {
            alert("Sorry! You must be near tufts to use our App");
            window.location="/logout";
        }
        $.getJSON(userVotedURL, function(userinfo){
            $.getJSON(url, function(list){
                /***** RENDER EACH FOOD ITEM ********/
                $.each(list, function (i, food_obj) {
                    render(food_obj, userinfo);
                });
                initButtons();
            });
        });
        //initRefreshButton();
        //$(window).on("pagehide",postVotes());
        //$(window).on("beforeunload",postVotes());

    });
}


function postVotes(){
    var upIds   = [];
    var downIds = [];
    $(document).find("span[upvote='true']").each(function(){ upIds.push(this.id); });
    $(document).find("span[downvote='true']").each(function(){ downIds.push(this.id); });
    console.log(upIds);
    console.log(downIds);
    $.ajax({
        url: "votes",
        type: "POST",
        headers: {
            "Content-type" : "application/x-www-form-urlencoded"
        },
        data: {
            upIds   : JSON.stringify(upIds),
            downIds :JSON.stringify(downIds)
        },
        dataType:"json"
    });   
}

// function initRefreshButton(){
//     ******* AGGREGATE UPPED and DOWNED ITEMS *****
//     // $('.refresh').click(function(){
//     //     postVotes();
//     // });
// }

/**
 *  Buttons set attributes of upvote and downvote icons, and change text val in DOM
 **/
function initButtons(){
    /***** UPVOTE AND DOWNVOTE ITEMS ******/
    console.log("buttons please");
    $("span.glyphicon-menu-up").click(function(){
        if($(this).attr("upvote") == 'false'){
            var p           = $(this).parent().parent().find("div.foodscore").find('p');
            var downvote    = $(this).parent().parent().find("span.glyphicon-menu-down");
            if(downvote.attr("downvote") == 'false') {
                $(this).attr("upvote", "true");
            }
            downvote.attr("downvote", "false");
            p.text(parseInt(p.text(),10) + 1);
            postVotes();
        }
    });
    $('span.glyphicon-menu-down').click(function(){
        console.log("downed");
        if($(this).attr("downvote") == 'false'){
            var p       = $(this).parent().parent().find("div.foodscore").find('p');
            var upvote  = $(this).parent().parent().find("span.glyphicon-menu-up");
            if(upvote.attr("upvote") == 'false') {
                $(this).attr("downvote", "true");
            }
            upvote.attr("upvote", "false");
            p.text(parseInt(p.text(),10) - 1);
            postVotes();
        }
    });
}

/* object, object
 * Renders div of given daily food item and given user information
 */
function renderDailyItem(food_obj, userinfo){
    var upIds       = userinfo.up_ids;
    var downIds     = userinfo.down_ids;
    var upvote      = (upIds.indexOf(food_obj._id)  != -1).toString(); // if user has already voted
    var downvote    = (downIds.indexOf(food_obj._id)!= -1).toString(); // if user has already voted
    $('#data').append(
        "<div class='row food-item-box'>"                                                                                    +
            "<div class='col-xs-10 fooditem' >"                                                                               + 
                "<div class='col-xs-1'></div><div class='col-xs-11'><p class='fooditem' id='"+food_obj.id+"'>" + food_obj.name + "</p></div>"                                        +
            " </div>"                                                                                                        +
            "<div class='col-xs-2 scores-buttons'>"                                                                          +
                    "<div class='col-xs-12'>"                                                                                +
                        "<span class='glyphicon glyphicon-menu-up'  upvote='"+upvote+"' id='"+food_obj._id +"'></span>"      +
                    "</div>"                                                                                                 +
                    "<div class='col-xs-12 foodscore'>"                                                                      +
                        "<p class='foodscore' id='"+food_obj._id +"'>" + food_obj.daily_score.toString() + "</p>"            +
                    "</div>"                                                                                                 +
                    "<div class='col-xs-12'>"                                                                                + 
                        "<span class='glyphicon glyphicon-menu-down' downvote='"+downvote+"' id='"+food_obj._id +"'></span>" + 
                    "</div> "                                                                                                +
                " </div>"                                                                                                    +
            "</div>");
}

function renderAlltimeItem(food_obj, userinfo){
    var upIds       = userinfo.up_ids;
    var downIds     = userinfo.down_ids;
    var upvote      = (upIds.indexOf(food_obj._id)  != -1).toString(); // if user has already voted
    var downvote    = (downIds.indexOf(food_obj._id)!= -1).toString(); // if user has already voted
    var daily       = food_obj.daily.toString();
    var daily_glyph = "";
    if (food_obj.daily) 
        daily_glyph = "<span class= 'glyphicon glyphicon-glass'></span>";
    $('#data').append(
        "<div class='row food-item-box'>"                                                                                     +
            "<div class='col-xs-10 fooditem' >"                                                                                +                                                            
                "<p class='fooditem' daily='"+daily+"' id='"+food_obj._id+"'>" +daily_glyph +" "+ food_obj.name +"</p> "                     +
            " </div>"                                                                                                         +
            "<div class='col-xs-2 scores-buttons'>"                                                                           +
                    "<div class='col-xs-12'>"                                                                                 +
                        "<span class='glyphicon glyphicon-menu-up'  upvote='"+upvote+"' id='"+food_obj._id +"'></span>"       +
                    "</div>"                                                                                                  +
                    "<div class='col-xs-12 foodscore'>"                                                                       +
                        "<p class='foodscore' id='"+food_obj._id +"'>" + food_obj.alltime_score.toString() + "</p>"           +
                    "</div>"                                                                                                  +
                    "<div class='col-xs-12'>"                                                                                 + 
                        "<span class='glyphicon glyphicon-menu-down' downvote='"+downvote+"' id='"+food_obj._id +"'></span>"  + 
                    "</div> "                                                                                                 +
                " </div>"                                                                                                     +
            "</div>");
}