// BASE SETUP
// =============================================================================

// Modules
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

// EXPOSE APP
// =============================================================================
module.exports = app;

// Configuration
// =============================================================================
// Log requests to the console
app.use(morgan('dev'));
// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set our port
var port = process.env.PORT || 8080;
// Database
var db = require('./config/db');
mongoose.connect(db.url); // Connect to database with Mongoose

// Configure database
//var dbUrl = 'localhost/node-rest-api'; // Define database address
//mongoose.connect('mongodb://' + dbUrl); // Connect to database with Mongoose
var dbConnection = mongoose.connection;
// Get notified if we connect successfully or if a connection error occurs:
dbConnection.on('error', console.error.bind(console, 'Connection error:'));
dbConnection.once('open', function (callback) {
  console.log("Connected to database");
});

// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// Routes
// =============================================================================
require('./app/routes')(app); // configure our routes

// START THE SERVER
// =============================================================================
app.listen(port, function() {
  console.log('Server is listening port: ' + port);
});