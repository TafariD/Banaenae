// /public/scripts/scores.js
// Clientside JS for daily scores page

var dailyItemsURL = "daily"
var userVotedURL  = "uservoted"
    $(document).ready(function(){
        //Render List
        $.getJSON(userVotedURL, function(userinfo){
            $.getJSON(dailyItemsURL, function(list){
                /***** RENDER EACH FOOD ITEM ********/
                $.each(list, function (i, food_obj) {
                    renderItem(food_obj, userinfo);
                });
                initButtons();
            });
        });
        /******** AGGREGATE UPPED and DOWNED ITEMS ******/
        $('#test_log').click(function(){
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
        });
    });

/**
 *  Buttons set attributes of upvote and downvote icons, and change text val in DOM
 **/
function initButtons(){
    /***** UPVOTE AND DOWNVOTE ITEMS ******/
    $("span.glyphicon-menu-up").click(function(){
        if($(this).attr("upvote") == 'false'){
            var p           = $(this).parent().parent().find("div.foodscore").find('p');
            var downvote    = $(this).parent().parent().find("span.glyphicon-menu-down");
            if(downvote.attr("downvote") == 'false') {
                $(this).attr("upvote", "true");
            }
            downvote.attr("downvote", "false");
            p.text(parseInt(p.text(),10) + 1);
        }
    });
    $('span.glyphicon-menu-down').click(function(){
        if($(this).attr("downvote") == 'false'){
            var p       = $(this).parent().parent().find("div.foodscore").find('p');
            var upvote  = $(this).parent().parent().find("span.glyphicon-menu-up");
            if(upvote.attr("upvote") == 'false') {
                $(this).attr("downvote", "true");
            }
            upvote.attr("upvote", "false");
            p.text(parseInt(p.text(),10) - 1);
        }
    });
}

/* object, object
 * Renders div of given food item and given user information
 */
function renderItem(food_obj, userinfo){
    var upIds       = userinfo.up_ids;
    var downIds     = userinfo.down_ids;
    var upvote      = (upIds.indexOf(food_obj._id)  != -1).toString(); // if user has already voted
    var downvote    = (downIds.indexOf(food_obj._id)!= -1).toString(); // if user has already voted
    $('#data').append(
        "<div class='row food-item-box'>"                                                                               +
            "<div class='col-xs-8 fooditem' >"                                                                          + 
                "<p class='fooditem' id='"+food_obj.id+"'>" + food_obj.name + "</p> "                                   +
            " </div>"                                                                                                   +
            "<div class='col-xs-4 scores-buttons'>"                                                                     +
                    "<div class='col-xs-12'>"                                                                           +
                        "<span class='glyphicon glyphicon-menu-up'  upvote='"+upvote+"' id='"+food_obj._id +"'></span>"      +
                    "</div>"                                                                                            +
                    "<div class='col-xs-12 foodscore'>"                                                                 +
                        "<p class='foodscore' id='"+food_obj._id +"'>" + food_obj.daily_score.toString() + "</p>"       +
                    "</div>"                                                                                            +
                    "<div class='col-xs-12'>"                                                                           + 
                        "<span class='glyphicon glyphicon-menu-down' downvote='"+downvote+"' id='"+food_obj._id +"'></span>"   + 
                    "</div> "                                                                                           +
                " </div>"                                                                                               +
            "</div>");
}