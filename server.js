var express = require('express');
var app = express();
var mongojs = require('mongojs');
var groceryDB = mongojs('grocerylist', ['grocerylist']);
var traderJoesDB = mongojs('traderjoeslist', ['traderjoeslist']);
var targetDB = mongojs('targetlist', ['targetlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send("Hello world from server.js");
});

app.get('/grocerylist', function(req, res) {

  console.log("I received a get request");

  //var shoppingList = [ { item: 'milky' } ];

  //res.json(shoppingList);

  //console.log(db.contactlist.find());
  db.grocerylist.find(function (err, docs) {
    console.log("error = " + err);
    console.log("%s %O", "Docs =", docs);
    res.json(docs);
  });

});

app.post('/grocerylist', function(req, res) {
  console.log("%s %O", "Body =", req.body);

  db.grocerylist.insert(req.body, function(err, doc) {
    res.json(doc);
  });

});

app.delete('/*list/:id', function(req, res) {
  var id = req.params.id;
  console.log ('req.params = ' + req.params);
  console.log ('req.url = ' + req.url);

  if (req.url.indexOf("grocerylist") > -1) {
    storeDB = db.grocerylist;
    console.log("found a match");
  }

  // Check that id is VALID --> -1 represents INVALID
  if ( id !== '-1' ) {
    console.log(id);
    //db.grocerylist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    storeDB.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
  } else {
    console.log("deleting ALL!!!!");
    db.grocerylist.remove({}, function (err, doc) {
      res.json(doc);
    });
  }
});

app.listen(3000);
console.log("Server running on port 3000");
