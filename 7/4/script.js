/*globals $ */
$(function() {
"use strict";

var $name = $('#name').addClass('jQueried');
var $birthdate = $('#birthdate').addClass('jQueried');
var $password = $('#password').addClass('jQueried');
var $password_repeat = $('#password_repeat').addClass('jQueried');

var $form = $('form');
var $response = $('#response');

$form.on('submit', function () {
  var data = {
    name : $name.val(),
    birthdate : $birthdate.val(),
    password : $password.val(),
    password_repeat : $password_repeat.val()
  };

  $.post("//localhost:3000/validate", data).always(function(jqXHR, status) {
    console.log("Got response", jqXHR.responseText, jqXHR.statusText, status);
    if( status === "error") {
      $response.text(jqXHR.statusText + ": " + jqXHR.responseText);
      $response.addClass('error');
      $response.removeClass('success');
    } else {
      $response.text("OK!");
      $name.val("");
      $birthdate.val("");
      $password.val("");
      $password_repeat.val("");
      $response.addClass('success');
      $response.removeClass('error');
    }
  }, 'text');
});

});

