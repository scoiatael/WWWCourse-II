/*globals $ */

$(function() {
  $( "#tags" ).autocomplete({
    source: function(request, response) {
      var name = $('#tags').val();
      $.get("http://localhost:3000/names?query=" + name, function(data) {
        console.log("Got ", data);
        response(data);
      });
    },
    minLength: 1
  });
});
