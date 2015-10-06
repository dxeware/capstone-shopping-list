var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('grocerylist', ['grocerylist']);

app.use(express.static(__dirname + '/'));

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

app.listen(3000);
console.log("Server running on port 3000");
