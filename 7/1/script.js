$(function() {

var $select = $('select#miasta').class('jQueried');
var $img = $('img#img').class('jQueried');
var $text = $('p#text').class('jQueried');

var loadNewContent = function() {
  var path = "data/" + $(this).find("option:selected").value;

  var oReq = new XMLHttpRequest();
  var transferComplete = function () {
    $text.text(oReq.responseText);
  };
  oReq.upload.addEventListener("load", transferComplete, false);
  oReq.open("get", (path + ".txt"), true);
  oReq.send();

  $img.attr('src', path + ".jpg");
};

loadNewContent();
$select.on("change",loadNewContent() );

});

