/*globals XMLHttpRequest, $ */
$(function() {
"use strict";

var $select = $('select#miasta').addClass('jQueried');
var $img = $('img#img').addClass('jQueried');
var $text = $('span#text').addClass('jQueried');

var loadNewContent = function() {
  var selected = $(this).find("option:selected").val();
  if(! selected) {
    return;
  }

  var path = "data/" + selected;
  console.log("getting data for " + path);

  $.get(path + ".txt", function(data) {
    $text.text(data);
  });


  $img.attr('src', path + ".png");
};

loadNewContent();
$select.on("change",loadNewContent );

});

