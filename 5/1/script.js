$(function() {

var INTERVAL = 6000;
var MIN = 0;
var MAX = 9;
var $slider = $('#slider');
var $show = $("#even");
var _slide = true;
var _interval = window.setInterval(function () {
  if(_slide) {
    var value = $slider.slider('option', 'value') + 1;
    if (value >= MAX) value = MIN;
    $slider.slider('option', 'value', value);
    updateKitten();
  }
}, INTERVAL);

$("#even").fadeIn();

var switchKitten = true;
function updateKitten() {
  var val = $slider.slider('option', 'value');
  $show.hide();
  $show.attr('src', 'http://placekitten.com/g/200/30'+val).on('load', function() {
    if(val == $slider.slider('option', 'value')) $show.fadeIn();
  });
}

$slider.slider({
  value:0,
  min: MIN,
  max: MAX,
  step: 1,
  slide: updateKitten,
  change: updateKitten
});

$slider.hover(function() {
  _slide = false;
  $('#content').addClass('stopped');
}, function() {
 _slide = true;
  $('#content').attr('class', '');
});

});

