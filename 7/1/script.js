$(function() {

var $select = $('select#miasta').addClass('jQueried');
var $img = $('img#img').addClass('jQueried');
var $text = $('p#text').addClass('jQueried');

var loadNewContent = function() {
  var path = "data/" + $(this).find("option:selected").val();
  console.log("getting data for " + path);

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
$select.on("change",loadNewContent );

});

