/*globals XMLHttpRequest, $ */
$(function() {
"use strict";

var $select = $('select#miasta').addClass('jQueried');
var $img = $('img#img').addClass('jQueried');
var $text = $('p#text').addClass('jQueried');

var loadNewContent = function() {
  var selected = $(this).find("option:selected").val();
  if(! selected) {
    return;
  }

  var path = "data/" + selected;
  console.log("getting data for " + path);

  var oReq = new XMLHttpRequest();
  var transferComplete = function () {
    console.log("Loaded text", oReq.responseXML, oReq.responseText);
    $text.text(oReq.responseXML);
  };
  oReq.upload.addEventListener("load", transferComplete, false);
  oReq.open("get", (path + ".txt"), true);
  oReq.send();

  $img.attr('src', path + ".jpg");
};

loadNewContent();
$select.on("change",loadNewContent );

});

