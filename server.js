var express = require('express');
var app = express();
var mongojs = require('mongojs');
var storeDB = mongojs('storelist', ['storelist']);
var db = storeDB.storelist;
//var traderJoesDB = mongojs('traderjoeslist', ['traderjoeslist']);
//var targetDB = mongojs('targetlist', ['targetlist']);

var bodyParser = require('body-parser');

// Map the db based on the url
/*function mapDB( url ) {
  var db;

  if ( url.indexOf(groceryDB) > -1 ) {
    db = groceryDB.grocerylist;
  } else if ( url.indexOf(traderJoesDB) > -1 ) {
    db = traderJoesDB.traderjoeslist;
  } else if ( url.indexOf(targetDB) > -1 ) {
    db = targetDB.targetlist;
  } else {
    throw("ERROR: Incorrect Database!");
  }
  return db;
} */


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

/* app.get('/', function(req, res) {
  res.send("Hello world from server.js");
}); */

// Get request to retrieve list from database
app.get('/*list', function(req, res) {
  //var db;

  console.log("I received a get request");

  // Map to store's database list
  //db = mapDB(req.url);

  // Call mongodb find() to retrieve list of items
  db.find(function (err, docs) {
    console.log("error = " + err);
    console.log("%s %O", "Docs =", docs);
    res.json(docs);
  });

});

// Post request to insert to list in database
app.post('/*list', function(req, res) {
  //var db;

  console.log("%s %O", "Body =", req.body);

  // Map to store's database list
  //db = mapDB(req.url);

  // Call mongodb insert() to add item to list
  db.insert(req.body, function(err, doc) {
    res.json(doc);
  });

});

// Delete request to remove from list in database
app.delete('/*list/:id', function(req, res) {
  //var db;
  var id = req.params.id;
  console.log ('req.params = ' + req.params);
  console.log ('req.url = ' + req.url);

  // Map to store's database list
  //db = mapDB(req.url);


  console.log(id);

  // Remove one _id from database
  db.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });

});

app.listen(3000);
console.log("Server running on port 3000");
