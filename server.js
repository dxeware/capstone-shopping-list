var express = require('express');
var app = express();
var mongojs = require('mongojs');
var storeDB = mongojs('127.0.0.1:27017/storelist', ['storelist']);
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

app.listen(3000);
console.log("Server running on port 3000");
