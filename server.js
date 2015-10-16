// BASE SETUP
// =============================================================================

// Call required packages
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

// Configure app to use Morgan
app.use(morgan('dev')); // log requests to the console

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set our port
var port = process.env.PORT || 8080;

// Configure database
var dbUrl = 'localhost/node-rest-api'; // Define database address
mongoose.connect('mongodb://' + dbUrl); // Connect to database with Mongoose
var db = mongoose.connection;
// Get notified if we connect successfully or if a connection error occurs:
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (callback) {
  console.log("Connected to database");
});
// Example model
var ExampleItem = require('./app/models/exampleItem');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  //console.log('Something is happening.');
  // CORS (remove these if you don't want allow access from cross domain requests)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // Make sure we go to the next routes and don't stop here
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'API is up and running!' });   
});

// more routes for our API will happen here

// on routes that end in /items
// ----------------------------------------------------
router.route('/items')

  // Create an item (accessed at POST http://localhost:8080/api/items)
  .post(function(req, res) {
    // Create a new instance of the ExampleItem model
    var item = new ExampleItem();
    // Set the item's name (comes from the request)
    item.name = req.body.name;
    // save the item and check for errors
    item.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Item created!' });
    });    
  })
  // get all the items (accessed at GET http://localhost:8080/api/items)
  .get(function(req, res) {
    ExampleItem.find(function(err, items) {
      if (err) {
        res.send(err);
      }
      res.json(items);
    });
  });
 
// on routes that end in /items/:item_id
// ----------------------------------------------------
router.route('/items/:item_id')

  // get the item with that id (accessed at GET http://localhost:8080/api/items/:item_id)
  .get(function(req, res) {
    ExampleItem.findById(req.params.item_id, function(err, item) {
      if (err) {
        res.send(err);
      }
      res.json(item);
    });
  })
  // update the item with this id (accessed at PUT http://localhost:8080/api/items/:item_id)
  .put(function(req, res) {
    // use our ExampleItem model to find the item we want
    ExampleItem.findById(req.params.item_id, function(err, item) {
      if (err) {
        res.send(err);
      }
      // update the item's info
      item.name = req.body.name;
      // save the item
      item.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Item updated!' });
      });
    });
  })
  // delete the item with this id (accessed at DELETE http://localhost:8080/api/items/:item_id)
  .delete(function(req, res) {
    ExampleItem.remove({
        _id: req.params.item_id
    }, function(err, item) {
      if (err) {
          res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  });
  

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, function() {
  console.log('Server is listening port: ' + port);
});