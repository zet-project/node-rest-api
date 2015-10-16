// Example model
var ExampleItem = require('./models/exampleItem');

module.exports = function(app) {
  //var router = app.express.Router(); // get an instance of the express Router

  // Middleware to use for all requests
  app.use(function(req, res, next) {
    // do logging
    //console.log('Something is happening.');
    // CORS (remove these if you don't want allow access from cross domain requests)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // Make sure we go to the next routes and don't stop here
    next();
  });
  
  // ROUTES FOR API
  // =============================================================================
  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  app.get('/api/', function(req, res) {
    res.json({ message: 'API is up and running!' });   
  });

  // on routes that end in /items
  // ----------------------------------------------------
  app.route('/api/items')

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
  app.route('/api/items/:item_id')

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
  //app.use('/api', router);
  
  // ROUTES FOR FRONTEND
  // ----------------------------------------------------
  // Route to handle all angular requests
  app.get('*', function(req, res) {
    // load our public/index.html file
    res.sendfile('./public/views/index.html');
  });
};