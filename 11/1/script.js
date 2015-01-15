/*global document, google, window, $ */
(function() {
var markers = [];

function initialize() {
  var map;
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.1, 17.0)
  };

  var infoWindow = new google.maps.InfoWindow({
        content: "It's here!"
    });

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  google.maps.event.addListener(map, "rightclick", function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      var myLatlng = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
        });
      markers.push(marker);

      var $li = $("<li> ( " + lat + ", " + lng + ")</li>").click(function() {
        infoWindow.open(map, marker);
      });

      $('#pos-list').append($li);
  });
}

$(function() {
  google.maps.event.addDomListener(window, 'load', initialize);
  $(".delete").click(function (){
    var i;
    $('#pos-list').empty();
    for (i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];

  });
});

}());
