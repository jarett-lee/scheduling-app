// server.js

// Started using https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var firebase       = require("firebase");


// configuration ===========================================

// connect to firebase database
firebase.initializeApp({
  serviceAccount: "config/scheduling_app_db_editor.json",
  databaseURL: "https://scheduling-app-ffcb8.firebaseio.com"
});

/*
var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: {
    projectId: "projectId",
    clientEmail: "foo@projectId.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nkey\n-----END PRIVATE KEY-----\n"
  },
  databaseURL: "https://databaseName.firebaseio.com"
});
*/

// set our port
var port = process.env.PORT || 8885;

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


// routes ==================================================
require('./app/routes')(app); // configure our routes


// start app ===============================================
// startup our app at http://localhost:8585
app.listen(port);

// shoutout to the user
console.log('Server started on: ' + port);

exports = module.exports = app;
