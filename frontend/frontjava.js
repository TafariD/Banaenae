/*

var xmlhttp = new XMLHttpRequest();
var url = "Users/tdunca/Documents/GitHub/comp20-spring2015-team20/backend/testdata_food+scores.json";



xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

*/

// The above has been abandoned until the server side issue is resolved.
// Namely the question of how to access the JSON data in the backend (folder).
// HTTP requests cannot work without a hosting server... possible fix with Python?

/*function myFunction(input) { // No longer needed, made unnessecary by Jquery, will be deleted 4/10/2015
    var out = "";
    var i;
    for(i = 0; i < input.length; i++) {
        out += input[i].content;
    }
    document.getElementById("data").innerHTML = out;
}

*/

function getdata(){

  $.getJSON("food_scores2.json", function(jdata) { //code based off of stackoverflow.com/questions/7346563/loading-local-json-file:
    $.each( jdata, function (Foodname, Score) {
    $('#data').append("<p>" + " Food Item: " + Foodname + " Upvotes: " + Score.toString() + "</p>")
    });
  console.log(jdata); // this will show the info it in firebug console

  });
}


// TODO -- Getting arrow pictures for each topic onto list.
/*IDEA -- Place each item in a Div
*/
