var express = require('express');
var app = express();
var mongojs = require('mongojs');

var uri = process.env.MONGOLAB_URI || '127.0.0.1:27017/storelist';
var storeDB = mongojs(uri, ['storelist'], {authMechanism: 'ScramSHA1'});
var db = storeDB.storelist;

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

// Get request to retrieve list from database
app.get('/*list', function(req, res) {

  console.log("I received a get request");

  // Call mongodb find() to retrieve list of items
  db.find(function (err, docs) {
    console.log("error = " + err);
    console.log("%s %O", "Docs =", docs);
    res.json(docs);
  });

});

// Get request to retrieve username and password
app.get('/user/', function(req, res) {

  var data = {};

  console.log("Received a username/password request");

  // Retrieve username and password from environment
  data.username = process.env.SHOP_USERNAME;
  data.password = process.env.SHOP_PASSWORD;

  //console.log("username/password = " + data.username + " " + data.password);
  if ( (data.username === '' || data.password === '') ) {
    console.log("SERVER ERROR: username and/or password are not set in the environment");
  }

  res.json(data);

});

// Post request to insert to list in database
app.post('/*list', function(req, res) {

  console.log("%s %O", "Body =", req.body);

  // Call mongodb insert() to add item to list
  db.insert(req.body, function(err, doc) {
    res.json(doc);
  });

});

// Delete request to remove from list in database
app.delete('/*list/:id', function(req, res) {

  var id = req.params.id;
  console.log ('req.params = ' + req.params);
  console.log ('req.url = ' + req.url);
  console.log(id);

  // Remove one _id from database
  db.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });

});

app.put('/*list/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  // Update the list name in database
  db.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, item: req.body.item}},
    new: true},
    function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
