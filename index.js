var server = require("./server");
var router = require("./router")
var requestHandlers = require("./requestHandlers");

var express = require("express");
var app = express();

var handle = {};
handle["/"] = requestHandlers.start;
handle["/cal"] = requestHandlers.cal;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

app.get('/googleCalendarRequest.js', function(req, res) {
  res.sendFile(__dirname + '/googleCalendarRequest.js');
});

app.get('/require.js', function(req, res) {
  res.sendFile(__dirname + '/require.js');
});

app.get('/readline', function(req, res) {
  res.sendFile(__dirname + '/googleCalendarRequest.js');
});

app.get('/googleapis', function(req, res) {
  res.sendFile(__dirname + '/googleCalendarRequest.js');
});

app.get('/google-auth-library', function(req, res) {
  res.sendFile(__dirname + '/googleCalendarRequest.js');
});

app.listen(8887, function () {
  console.log('Example app listening on port 8887!');
});

server.start(router.route, handle);
