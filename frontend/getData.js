var url = "https://fast-coast-3052.herokuapp.com/"

function init(){
    var  list = [];
    $.getJSON(url, function(data){
        $.each(data, function(key, val){
            obj = {"name" : key, "score" : val};
            list.push(obj);
        });
        list.sort(compare);
        renderList(list);
    });
}

function renderList(list){
        $.each(list, function (i, food_obj) {
        $('#data').append(
            "<div class='row'>" +
            "<div class='col-xs-8 left' > <p class='fooditem'>" + food_obj.name + "</p> </div>" +
            "<div class='col-xs-4 right'> "
                    + "<div class='col-xs-12'> <p> ^ </p> </div>"
                    + "<div class='col-xs-12'> <p class='foodscore'>" + food_obj.score.toString() + "</p></div>"
                    + "<div class='col-xs-12'> <p> v </p> </div> </div>" +
            "</div>")
        });
}

// compares two food items in the form
// {"name": name, "score": x}
// i.e. a greater than function
function compare(obj1,obj2){
    return obj2.score - obj1.score;
}
