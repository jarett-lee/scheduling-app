// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

const path      = require('path');
const express   = require('express');
const routes    = require('./routes/index');
const logger    = require('morgan');
const app       = express();
const port      = 8888;

console.log('Starting server on port ' + port + '...');

// Log the requests
app.use(logger('dev'));

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Serve home page
app.use('/', routes);

// catch 404 and forward to error handler
app.get('*', function(request, response, next) {
  response.status(404).send('Page not found');
});

app.listen(port, function() {
  console.log('Server listening on port ' + port);
  console.log();
});
