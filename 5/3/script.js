$(function() {
  var dialog, form,
  // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  first_name = $( "#first_name" ),
  last_name = $( "#last_name" ),
  email = $( "#email" ),
  city = $( "#city" ),
  region_code = $( "#region_code" ),
  birthdate = $( "#birthdate" ),
  confirm = $( "#dialog-confirm" ),
  allFields = $( [] ).add( first_name).add( last_name).add( email).add( city).add( region_code).add( birthdate ),
  tips = $( ".validateTips" );
  birthdate.datepicker();
  confirm.hide();
  function updateTips( t ) {
    tips
      .text( t )
      .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
  }
  function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
      o.addClass( "ui-state-error" );
      updateTips( "Length of " + n + " must be between " +
      min + " and " + max + "." );
      return false;
    } else {
      return true;
    }
  }
  function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
    }
  }
  function addUser() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );
    valid = valid && checkLength( first_name, "first name", 3, 16 );
    valid = valid && checkRegexp( first_name, /^[a-z]([0-9a-z_\s])+$/i, "First name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
    valid = valid && checkLength( last_name, "last name", 3, 16 );
    valid = valid && checkRegexp( last_name, /^[a-z]([0-9a-z_\s])+$/i, "Last name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
    valid = valid && checkLength( city, "city", 3, 16 );
    valid = valid && checkRegexp( city, /^[a-z]([0-9a-z_\s])+$/i, "City may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
    valid = valid && checkRegexp( region_code, /\d{2}-\d{3}/i, "eg, 11-111." );
    valid = valid && checkLength( email, "email", 6, 80 );
    valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
    if ( valid ) {
      var $new_elem = $("<tr>" +
      "<td>" + first_name.val() + "</td>" +
      "<td>" + last_name.val() + "</td>" +
      "<td>" + email.val() + "</td>" +
      "<td>" + city.val() + "</td>" +
      "<td>" + region_code.val() + "</td>" +
      "<td> <button> x </button></td>" +
      "</tr>");
      $( "#users tbody" ).append( $new_elem);
      $new_elem.on('click', function() {
        var $that = $(this);
        confirm.dialog({
          resizable: false,
          height:140,
          modal: true,
            buttons: {
              "Delete item": function() {
                $( this ).dialog( "close" );
                $that.remove();
              },
              Cancel: function() {
                $( this ).dialog( "close" );
              }
            }
        });
        dialog.show();
      });
      dialog.dialog( "close" );
    }
    return valid;
  }
  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "Create an account": addUser,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
    form[ 0 ].reset();
    allFields.removeClass( "ui-state-error" );
    }
  });
  form = dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    addUser();
  });
  $( "#create-user" ).button().on( "click", function() {
    dialog.dialog( "open" );
  });
});
