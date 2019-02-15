var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    rateLimit: 1500
});

var getBrewersUntappId = function(data) {
  //
  for (var i = 0; i < data.length ; i++) {
    var brewer = data[i][0];
    console.log(brewer)
  }

}


function getBrewer(brewer) {
  var parsed = brewer.replace(' ','%20')
  c.queue(
    {
      uri: 'https://untappd.com/search?q=aldea'+parsed+'&type=brewery&sort=',
      headers: {
       cookie: '__cfduid=d3fd1ba91d7824fc18ac2ec87378c8fb61520998831; untappd_user_v2_e=5bbaa81082fdb1a7d72cf78e1afc355a99ec285c62d26d5432fc106b51d56e85174ce9a0576ccdbb9cb3d475fbb28cd2396dd2b73e036a12adcdc6e4d69a2b06jX9aS4vJ03s1NMjhVBhbuMXjO0%2BRB8BXT%2BrmYyyHFQI%3D; _ALGOLIA=b44a907d-8197-4974-bdc1-0643c37e89e1'
      },
      jQuery: true,
      callback: function(error, res, done) {callbackFn(error, res, done)}
    },
  );
}
