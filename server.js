var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
let login = false;
let registration = false;

var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("A is for Apple");
});

app.get("/urls", (req,res) => {
  res.render("urls");

});


app.listen(PORT, () => {
  console.log(`listening on ${PORT}!`);
});