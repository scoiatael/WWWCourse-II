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

  var oReq = new XMLHttpRequest();
  var transferComplete = function () {
    $text.text(this.responseText);
  };
  oReq.onload = transferComplete;
  oReq.open("get", (path + ".txt"), true);
  oReq.send();

  $img.attr('src', path + ".png");
};

loadNewContent();
$select.on("change",loadNewContent );

});

