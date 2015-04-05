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

function myFunction(input) {
    var out = "";
    var i;
    for(i = 0; i < input.length; i++) {
        out += input[i].content;
    }
    document.getElementById("data").innerHTML = out;
}

function getJSON(){
  $.getJSON("food_scores.json", function(json) { //code based off of Stack Overflow version:
                                          //http://stackoverflow.com/questions/7346563/loading-local-json-file
  console.log(json); // this will show the info it in firebug console


  });
}
