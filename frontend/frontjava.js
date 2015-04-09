function getdata(){

    $.getJSON("food_scores2.json", function(jdata) { //code based off of stackoverflow.com/questions/7346563/loading-local-json-file:
    $.each( jdata, function (i, food_obj) {

    $('#data').append("<p>" + " Food Item: " + food_obj.name + " Upvotes: " + (food_obj.score).toString() + "</p>")
    });
  console.log(jdata); // this will show the info it in firebug console

  });
}

// TODO -- Getting arrow pictures for each topic onto list.
/*IDEA -- Place each item in a Div
*/
