$(function() {
 
  $('form').submit(function(event) {
    event.preventDefault();
    var lat = $('#lat').val();
    var lon = $('#lon').val();

    $.get('/api.weather?' + $.param({lat: lat, lon: lon}), function(response) {
      console.log(response);      
      $("#weather").text(JSON.stringify(response));
    });
  });

});
