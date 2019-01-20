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

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
}

app.get("/", (req, res) => {
  res.send("A is for Apple");
});

app.get("/partials", (req, res) => {
  res.render("partials/_head");
}); 

app.get("/urls", (req,res) => {
  //let userId = req.cookies.userId;

  let templateVars = { 
    listing: urlDatabase,
  };
  res.render("urls", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  
  let randomindex = generateRandomString();
  urlDatabase[randomindex] = req.body.longURL;
  //console.log(urlDatabase);
  console.log(req.body.longURL)
  console.log(req.params.shortURL + 'apples')
  res.redirect('/urls/' + randomindex);
  //res.redirect('/urls/'+ randomindex)
  //this isn't loading properly. it says it is undefined. temporarily i put it to without randomindex at least to know the data was being added to the urldatabase object. but a :shorturl page should also be available. 
  //but i've redirected to it, but i have i rendered it? 

  //this is posting things entered on the 'new' page for creating shortURLs, with a random id attached
  //this works because <form action="/urls" method="POST" -- around the input on the new page. it posts (does work with user input) to /urls and urls posts (does with with the user input) creating new key values in urlDatabase
});

app.get("/urls/new", (req, res) => {
  res.render("new");
});

app.post("/u/:shortURL/delete", (req,res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
  
});

app.get("/login", (req, res) => {
  //res.send('apples')
  res.render("login");
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  //this page isn't loading even when entered directly -- so the redirect alone isn't the issue. there's nothing here appreantly. why....
  console.log(req.params.shortURL)
  //this is printing a value but the get for the showing of the shortURL display page is not working

  res.redirect(longURL); 
  //not the issue

  //this points to the new key value pair that was created in urlDatabase - with the url the user just entered. the console log of req.params.shortURL displays what  was entered -->and hopefully got added to urlDatabase as a key. that shortURL comes from the randomindex.... which was posted at app.post /url ---> urlDatabase[randomindex] = req.body.longURL;
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id],  
  };  //this template vars will export to the show page, so that if i write and JS there, it will have these object/values to work with 


  //getting the long url that was entered and added to the database as the value accessed through the key urlDatabase[req.params.id]. request parameters from id accesses what was entered by the user on the 'new' page.
  //shortURL was generated as the key for the longURL, in the urlDatabase
  
  res.render('show', templateVars);
  console.log(templateVars.longURL);
  //this renders to urls/id, using the ejs layout for show /// don't get them confused

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