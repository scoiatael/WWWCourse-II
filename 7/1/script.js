$(function() {

var $select = $('select #miasta');
var $img = $('img #img');
var $text = $('p #text');

var loadNewContent = function() {
  var path = "data/" + $select.val();

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

