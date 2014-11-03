function checkForm()
{
  function DateFromPESEL(pesel) {
    var datePart = pesel.split("").splice(0,8);
    var year = Number("19" + datePart.splice(0,2).join(""));
    var month = Number(datePart.splice(0,2).join(""));
    var day = Number(datePart.splice(0,2).join(""));

    var PESELDate = new Date([year, month, day].join("/"));
    if(!(day >= 1 && day <= 31) || !(month >= 1 && month <= 12)) PESELDate = new Date("abc");

    return PESELDate;
  }

  var errors = []
  var PESEL = document.forms.dane.Pesel.value;
  var Email = document.forms.dane.Email.value;
  var Data = new Date(document.forms.dane.Data.value);
  var Plec = document.forms.dane.Plec.value;
  var Miasto = document.forms.dane.Miasto.value;
  var PESELDate = DateFromPESEL(PESEL);
  if(PESEL.length != 11) errors.push('PESEL must have 11 digits');
  if(isNaN(Number(PESELDate))) errors.push('PESEL must begin with date before 2000s');
  if(Number(PESELDate) !== Number(Data) ) errors.push('PESEL date must match birthdate');
  console.log(PESELDate, Data);
  if(!/[-_.\w]+@[-_.\w]+/g.test(Email)) errors.push('Email must be valid');
  if(!Plec) errors.push('sex must be set');
  if(Miasto === "0") errors.push('city must be chosen');
  console.log(Miasto);
  console.log(errors);
  if (errors.length) document.getElementById('message').innerHTML = '<b>Błędy w formularzu</b><ul><li>' + errors.join( "</li><li>") + "</li></ul>";
  else document.getElementById('message').innerHTML = '<b>Dane zapisane</b>';
  return false;
}
