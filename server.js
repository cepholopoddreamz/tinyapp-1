var express = require("express");
var app = express();
var PORT = 3000; // default port 8080
let login = false;
let registration = false;

var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(cookieParser())

// objects

var urlDatabase = {
  b2xVn2: "http://www.senselab.ca",
  hsm5xK: "http://www.google.com"
};

//

app.get("/", (req, res) => {
  res.send("A is for Apple");
});

app.get("/partials", (req, res) => {
  res.render("partials/_head");
}); 

app.get("/urls", (req,res) => {
  let templateVars = { 
    listing: urlDatabase,
  };
  res.render("urls", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  
  let randomindex = generateRandomString();
  urlDatabase[randomindex] = req.body.longURL;
  console.log(urlDatabase);
  console.log(req.body.longURL)
 
  res.redirect('/urls/'+randomindex)
});



app.get("/urls/new", (req, res) => {
 
  res.render("new");
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  // console.log(req.params.shortURL)
  res.redirect(longURL); /// it's not '/urls/'+ because you are going to the websit they've written
});





function generateRandomString() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 6;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring
  //console.log(randomstring);
  
}


app.listen(PORT, () => {
  console.log(`listening on ${PORT}!`);
});