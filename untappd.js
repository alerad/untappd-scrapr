var Crawler = require("crawler");
var csv = require('csv');
var fs = require('fs');
var searchApi = require('./searchApi');
var beers = []

var parser = csv.parse({delimiter: ','}, function(err, data){
  csvLength = data.length;
  for (var i = 0; i < 2 ; i++) {
    var brewer = data[i][0];
    var brewerAltName = data[i][2];
    var craftType = data[i][1];
    searchApi.firstSearch(brewer, firstSearchCallback)
    searchApi.secondSearch(brewer, secondSearchCallback)
  }
});

fs.createReadStream(__dirname+'/beerlist.csv').pipe(parser);

var firstSearchCallback = function(error, res, done) {
  var $ = res.$
  var beers = searchApi.getBeerDataFirstSearch($)
  console.log(JSON.stringify(beers));
}

var secondSearchCallback = function(error, res, done) {
  var $ = res.$
  var beers = searchApi.getBeerDataSecondSearch($)
  console.log(JSON.stringify(beers));
}
