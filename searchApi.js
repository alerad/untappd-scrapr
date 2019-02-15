var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    rateLimit: 1500
});


var headers = {
 'scheme': 'https',
 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
 'accept-encoding': 'identity',
 'accept-language': 'en-US,en;q=0.9,es;q=0.8',
 'upgrade-insecure-requests': '1',
 'cookie': '__cfduid=d3fd1ba91d7824fc18ac2ec87378c8fb61520998831; untappd_user_v2_e=5bbaa81082fdb1a7d72cf78e1afc355a99ec285c62d26d5432fc106b51d56e85174ce9a0576ccdbb9cb3d475fbb28cd2396dd2b73e036a12adcdc6e4d69a2b06jX9aS4vJ03s1NMjhVBhbuMXjO0%2BRB8BXT%2BrmYyyHFQI%3D; _ALGOLIA=b44a907d-8197-4974-bdc1-0643c37e89e1',
 'referer': 'https://untappd.com/search?q=juguetes+perdidos&type=beer&limit=45',
 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
 'x-requested-with': 'XMLHttpRequest'
};

exports.firstSearch = function(brewery,callbackFn) {
  var parsed = brewery.replace(' ', '%20')
  c.queue(
    {
      uri: 'https://untappd.com/search?q='+parsed,
      headers: {
       cookie: '__cfduid=d3fd1ba91d7824fc18ac2ec87378c8fb61520998831; untappd_user_v2_e=5bbaa81082fdb1a7d72cf78e1afc355a99ec285c62d26d5432fc106b51d56e85174ce9a0576ccdbb9cb3d475fbb28cd2396dd2b73e036a12adcdc6e4d69a2b06jX9aS4vJ03s1NMjhVBhbuMXjO0%2BRB8BXT%2BrmYyyHFQI%3D; _ALGOLIA=b44a907d-8197-4974-bdc1-0643c37e89e1'
      },
      jQuery: true,
      callback: function(error, res, done) {callbackFn(error, res, done)}
    },

  );
}


exports.secondSearch = function(brewery, callbackFn) {
  var parsed = brewery.replace(' ', '%20')
  c.queue(
    {
      uri:'https://untappd.com/search/more_search/beer?offset=1&q='+parsed+'&sort=all',
      headers: headers,
      jQuery: true,
      callback: function(error, res, done) {callbackFn(error, res, done)}
    },
  );
}

exports.getBeerDataFirstSearch = function($) {
  var beers = []
  $('.beer-item').each(function(i,elem) {
    var beerDetails = $(this).find($('.beer-details'));
    var extraDetails = $(this).find($('.details'));

    var name = beerDetails.find($('.name')).children().first().text()
    var beerId = beerDetails.find($('.name')).children().first().attr('href').split('/')[3]
    var brewer = beerDetails.find($('.brewery')).children().first().text()

    var style = beerDetails.children().last().text()

    var abv = extraDetails.find($('.abv')).text().split(' ')[1].replace('%','').replace('\n','')
    var ibu = extraDetails.find($('.ibu')).text().split(' ')[1].replace('\n','')

    beers[i] = {name:name,brewer:brewer,style:style, abv:abv, ibu:ibu}
  })
  return beers;
}

exports.getBeerDataSecondSearch = function($) {
  var beers = []
  $('.beer-item').each(function(i,elem) {
    var beerDetails = $(this).find($('.beer-details'));
    var extraDetails = $(this).find($('.details'));

    var name = beerDetails.find($('.name')).children().first().text()
    var beerId = beerDetails.find($('.name')).children().first().attr('href').split('/')[2]
    var brewer = beerDetails.find($('.style')).children().first().text()
    var breweryId = beerDetails.find($('.style')).children().first().attr('href').split('/')[2]

    var style = beerDetails.children().last().text()

    var abv = extraDetails.find($('.abv')).text().split(' ')[0].replace('%','').replace('\n','')
    var ibu = extraDetails.find($('.ibu')).text().split(' ')[0].replace('\n','')
    beers[i] = {name:name,brewer:brewer,style:style, abv:abv, ibu:ibu, beerId: beerId, breweryId: breweryId}
  })
  return beers;
}

var getSearch = function (error, res, done) {

  var $ = res.$
  if (res.body == "") {
    //TODO Cortar el crawling para este brewer
  }
  $('.beer-item').each(function(i,elem) {
    var beerDetails = $(this).find($('.beer-details'));
    var extraDetails = $(this).find($('.details'));

    var name = beerDetails.find($('.name')).children().first().text()
    var beerId = beerDetails.find($('.name')).children().first().attr('href').split('/')[3]
    var brewer = beerDetails.find($('.brewery')).children().first().text()

    var style = beerDetails.children().last().text()

    var abv = extraDetails.find($('.abv')).text().split(' ')[1].replace('%','').replace('\n','')
    var ibu = extraDetails.find($('.ibu')).text().split(' ')[1].replace('\n','')

    beers[i] = {name:name,brewer:brewer,style:style, abv:abv, ibu:ibu}
  })
  console.log(beers)

}

var getMoreSearch = function(error, res, done) {
  var $ = res.$
  if (res.body == "") {
    //TODO Cortar el crawling para este brewer
  }

  $('.beer-item').each(function(i,elem) {
    var beerDetails = $(this).find($('.beer-details'));
    var extraDetails = $(this).find($('.details'));

    var name = beerDetails.find($('.name')).children().first().text()
    var beerId = beerDetails.find($('.name')).children().first().attr('href').split('/')[2]
    var brewer = beerDetails.find($('.style')).children().first().text()
    var breweryId = beerDetails.find($('.style')).children().first().attr('href').split('/')[2]

    var style = beerDetails.children().last().text()

    var abv = extraDetails.find($('.abv')).text().split(' ')[0].replace('%','').replace('\n','')
    var ibu = extraDetails.find($('.ibu')).text().split(' ')[0].replace('\n','')
    beers[i] = {name:name,brewer:brewer,style:style, abv:abv, ibu:ibu, beerId: beerId, breweryId: breweryId}
  })
  indeks++;

  if (indeks == csvLength) {
    fs.appendFile('beers.json', JSON.stringify(beers), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }

}
