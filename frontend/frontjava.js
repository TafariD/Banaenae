function getdata(){
    //$.getJSON("food_scores2.json", function(jdata) { //code based off of stackoverflow.com/questions/7346563/loading-local-json-file:
    jdata = [
			    {"name": "1% Milk", "score" : 0},
			    {"name": "VM Scrambled Eggs", "score" : 0},
			    {"name": "Vanilla Soft Serve", "score" : 0},
			    {"name": "Vegan No Dairy Cheese Pizza", "score" : 0},
			    {"name": "White Hamburger Roll", "score" : 0},
			    {"name": "Whole Eggs", "score" : 0},
			    {"name": "Whole Milk", "score" : 0},
			    {"name": "Whole Wheat Bread", "score" : 0},
			    {"name": "Whole Wheat Cheese Pizza", "score" : 0},
			    {"name": "Whole Wheat English Muffin", "score" : 0},
			    {"name": "Yellow American Cheese", "score" : 0},
			    {"name": "Yellow Delicious Apples", "score" : 0}
			];

    $.each( jdata, function (i, food_obj) {

    $('#data').append(
    	"<div class='row'>" +
    	"<div class='col-xs-6 > <p class='fooditem'>" + food_obj.name + "</p></div>" +
    	"<div class='col-xs-6 > <p class='foodscore'>" + (food_obj.score).toString() + "</p></div>" +
    	"</div>")
    });
  console.log(jdata); // this will show the info it in firebug console

//  });
}


// TODO -- Getting arrow pictures for each topic onto list.
/*IDEA -- Place each item in a Div
*/
