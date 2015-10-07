var express = require('express');
var app = express();
var mongojs = require('mongojs');
var groceryDB = mongojs('grocerylist', ['grocerylist']);
var traderJoesDB = mongojs('traderjoeslist', ['traderjoeslist']);
var targetDB = mongojs('targetlist', ['targetlist']);

var bodyParser = require('body-parser');

function mapDB( url ) {
  var db;

  if ( url.indexOf(groceryDB) > -1 ) {
    db = groceryDB.grocerylist;
  } else if ( url.indexOf(traderJoesDB) > -1 ) {
    db = traderJoesDB.traderjoeslist;
  } else if ( url.indexOf(targetDB) > -1 ) {
    db = targetDB.targetlist;
  } else {
    alert("Incorrect Database!");
  }
  return db;
}

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send("Hello world from server.js");
});

app.get('/*list', function(req, res) {
  var db;

  console.log("I received a get request");

  // Map to store's database list
  db = mapDB(req.url);

  db.find(function (err, docs) {
    console.log("error = " + err);
    console.log("%s %O", "Docs =", docs);
    res.json(docs);
  });

});

app.post('/*list', function(req, res) {
  var db;

  console.log("%s %O", "Body =", req.body);

  // Map to store's database list
  db = mapDB(req.url);

  db.insert(req.body, function(err, doc) {
    res.json(doc);
  });

});

app.delete('/*list/:id', function(req, res) {
  var db;
  var id = req.params.id;
  console.log ('req.params = ' + req.params);
  console.log ('req.url = ' + req.url);

  /* if (req.url.indexOf(groceryDB) > -1) {
    storeDB = groceryDB.grocerylist;
    console.log("found a match");
  } */

  // Map to store's database list
  db = mapDB(req.url);

  // Check that id is VALID --> -1 represents INVALID
  if ( id !== '-1' ) {
    console.log(id);
    db.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
  } else {
    console.log("deleting ALL!!!!");
    db.remove({}, function (err, doc) {
      res.json(doc);
    });
  }
});

app.listen(3000);
console.log("Server running on port 3000");
