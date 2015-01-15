express = require("express")
app = express()

suggestions = [
  "ActionScript",
  "AppleScript",
  "Asp",
  "BASIC",
  "C",
  "C++",
  "Clojure",
  "COBOL",
  "ColdFusion",
  "Erlang",
  "Fortran",
  "Groovy",
  "Haskell",
  "Java",
  "JavaScript",
  "Lisp",
  "Perl",
  "PHP",
  "Python",
  "Ruby",
  "Scala",
  "Scheme"
]

app.get "/names", (req, res) ->
  console.log "Searching for", req.query.query
  res.status(200).json suggestions.filter (elem) ->
    new RegExp(req.query.query).exec elem

isOkDate = (date) ->
  return false unless date
  nDate = new Date(date)
  return nDate is nDate

app.post "/validate", (req, res) ->
  check_name = (name) ->
    return "Name should contain only" +
      " characters and digits, cannot be null!\n" unless name

  check_birthdate = (birthdate) ->
    return "Birthdate should be a valid date!\n" unless isOkDate birthdate

  check_password  = (password, password_repeat) ->
    return "Password must not be empty\n" unless password
    password ?= []
    password_repeat ?= []
    return "Both passwords " +
      "should be same!\n" unless password[1] is password_repeat[1]

  req.on 'data', (buffer) ->
    buffer_string = buffer+""
    data =
      name : /name=([\d\w]+)/.exec buffer_string
      birthdate : /birthdate=([\d\w]+)/.exec buffer_string
      password : /password=([\d\w]+)/.exec buffer_string
      password_repeat : /password_repeat=([\d\w]+)/.exec buffer_string

    errors = ""
    errors+= ((check_name data.name) ? "")
    errors+= ((check_birthdate data.birthdate) ? "")
    errors+= ((check_password data.password, data.password_repeat) ? "")
    console.log errors, data
    return res.status(400).send(errors) if errors
    res.status(200).send "OK"

app.use "/4", express.static('../4')
app.use "/5", express.static('../5')
app.get "/", (req, res) ->
  res.status(200).send "Hello world!"
app.use "/hello", express.static(__dirname + '/index.html')

server = app.listen(3000, ->
  host = server.address().address
  port = server.address().port
  console.log "Example app listening at http://%s:%s", host, port
)
