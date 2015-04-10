var url = "https://fast-coast-3052.herokuapp.com/"

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