<<<<<<< HEAD
var url = "https://fast-coast-3052.herokuapp.com/"
=======
function getdata(){
    $.getJSON("https://fast-coast-3052.herokuapp.com/list", function(jdata) { //code based off of stackoverflow.com/questions/7346563/loading-local-json-file:
    
    /* //LOCAL DEBUG CODE - simulating get form server 
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
	*/
		console.log(jdata)
>>>>>>> 65540f4e71544b4805d6a191c54bf56827f9635d

function init(){
    var  list = [];
    $.getJSON(url, function(data){
        console.log("after get");
        console.log(data)
        $.each(data, function(key, val){
            obj = {"name" : key, "score" : val};
            list.push(obj);
        });
        console.log(list);
        list.sort(compare);
        renderList(list);
    });
}

function renderList(list){
        $.each(list, function (i, food_obj) {
        $('#data').append(
            "<div class='row'>" +
            "<div class='col-xs-6 > <p class='fooditem'>" + food_obj.name + "</p></div>" +
            "<div class='col-xs-6 > <p class='foodscore'>" + (food_obj.score).toString() + "</p></div>" +
            "</div>")
        });
        console.log(data); // this will show the info it in firebug console
}

// compares two food items in the form
// {"name": name, "score": x}
// i.e. a greater than function
function compare(obj1,obj2){
    return obj2.score - obj1.score;
}
