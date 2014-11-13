$.validator.setDefaults({
  submitHandler: function() {
    alert("submitted!");
  }
});

$.validator.addMethod("regex", function(value, element, regexpr) {
   return regexpr.test(value);
 }, "Please enter a valid region code.");

$(function() {
  // validate signup form on keyup and submit
  $("#signupForm").validate({
    debug: true,
    rules: {
      username: {
        required: true,
        minlength: 2
      },
      password: {
        required: true,
        minlength: 5
      },
      confirm_password: {
        required: true,
        minlength: 5,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      miejscowosc: {
        required: true,
        minlength: 6,
        maxlength: 6,
        regex: /\d{2}-\d{3}/
      }
    },
    messages: {
      username: {
        required: "Please enter a username",
        minlength: "Your username must consist of at least 6 characters"
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long"
      },
      confirm_password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long",
        equalTo: "Please enter the same password as above"
      },
      email: "Please enter a valid email address",
      miejscowosc: "Please enter region code as DD-DDD"
    }
  });
});
