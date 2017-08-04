var express = require('express');
var http = require('http');
var cors = require('cors')
var app = express();

var corsOptions = {
  origin: /(chrome-extension:\/\/)\w+/,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api.weather", function (request, response) {
  
  console.log("origin", request.get('origin'))
  
  var api = "http://api.openweathermap.org/data/2.5/weather?"; 
  var lat = "lat=" + request.query.lat;
  var lon = "lon=" + request.query.lon;
  var apikey = process.env.OPENWEATHERKEY;
  var urlString = [api, lat, "&", lon, "&appid=", apikey, "&units=metric"].join("");

  http.get(urlString, function(res){
    var str = '';
    console.log('Response is '+res.statusCode);
    res.on('data', function (chunk) {
          //console.log('BODY: ' + chunk);
           str += chunk;
     });
    res.on('end', function () {
      console.log(typeof str);
      var weatherObj = JSON.parse(str);
      response.json(weatherObj); 
    });  
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
