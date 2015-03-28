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

function myFunction(input) {
    var out = "";
    var i;
    for(i = 0; i < input.length; i++) {
        out += input[i].content;
    }
    document.getElementById("data").innerHTML = out;
}
