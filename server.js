var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('grocerylist', ['grocerylist']);
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

app.delete('/grocerylist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.grocerylist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.listen(3000);
console.log("Server running on port 3000");
