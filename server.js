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
  //this is posting things entered on the 'new' page for creating shortURLs, with a random id attached
});



app.get("/urls/new", (req, res) => {
  res.render("new");
});

app.get("/urls/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  console.log(req.params.shortURL)
  //this is printing a value but the get for the showing of the shortURL display page is not working
  res.redirect(longURL); 
  //this points to the new key value pair that was created in urlDatabase - with the url the user just entered. the console log of req.params.shortURL displays what  was entered -->and hopefully got added to urlDatabase as a key. 
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