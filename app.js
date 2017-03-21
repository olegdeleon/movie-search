var express = require('express');
var request = require('request');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var query = req.query.search;
  var url = "http://omdbapi.com?s=" + query;
  request(url, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var data = JSON.parse(body); // converts body from string into object
      res.render("results", { data: data });
    }
  });
});

app.listen('3001', function() {
  console.log("Starting server... server up!");
});
