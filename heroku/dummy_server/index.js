var express = require('express');
var app = express();

dict = require('./foods.json');
list = require('./list.json');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.send(dict);
});

app.get('/list',function(request,response) {
	response.send(list);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});