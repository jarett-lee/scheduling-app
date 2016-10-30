var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/pages'));

app.get('/', function(request, response, next) {
  response.send('index.html');
});

var port = 8888;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});
