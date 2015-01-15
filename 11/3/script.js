/*global google, document, window */
(function() {
var map;
var geocoder;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];

var input = {
  origins: [ "Wroclaw, Poland"],
  destinations: [ "Katowice, Poland", "Stockholm, Sweden", "Narvik, Norway", "Svolvaer, Norway"]
};

var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

function addMarker(location, isDestination) {
  var icon;
  if (isDestination) {
    icon = destinationIcon;
  } else {
    icon = originIcon;
  }
  geocoder.geocode({'address': location}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon
      });
      markersArray.push(marker);
    } else {
      console.error('Geocode was not successful for the following reason: '
        + status);
    }
  });
}

function deleteOverlays() {
  var i;
  for (i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

function callback(response, status) {
  var i, results, j;
  if (status !== google.maps.DistanceMatrixStatus.OK) {
    console.error('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var outputDiv = document.getElementById('outputDiv');
    outputDiv.innerHTML = '';
    deleteOverlays();

    for (i = 0; i < origins.length; i++) {
      results = response.rows[i].elements;
      addMarker(origins[i], false);
      for (j = 0; j < results.length; j++) {
        addMarker(destinations[j], true);
        outputDiv.innerHTML += origins[i] + ' to ' + destinations[j]
            + ': ' + results[j].distance.text + ' in '
            + results[j].duration.text + '<br>';
      }
    }
  }
}

function calculateDistances() {
  document.getElementById('inputs').innerHTML = "Origins: " + input.origins + "<br/>Destinations: " + input.destinations;
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: input.origins,
      destinations: input.destinations,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

function initialize() {
  var opts = {
    center: new google.maps.LatLng(55.53, 9.4),
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  geocoder = new google.maps.Geocoder();
  calculateDistances();
}

google.maps.event.addDomListener(window, 'load', initialize);
}());
