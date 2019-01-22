var express = require("express");
const bcrypt = require('bcrypt');
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

  b2xVn2: { 
  shortURL: "b2xVn2", 
  longURL: "http://www.senselab.ca",
  userId: "userRandomID"
  },

  hsm5xK: {  // keys in javascript need quotes around it if it starts with a number
    shortURL: "hsm5xK",
    longURL: "http://www.google.com",
    userId: "user2RandomID"
  } 
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur",
    hashedPassword: bcrypt.hashSync("purple-monkey-dinosaur", 10)
    
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk",
    hashedPassword: bcrypt.hashSync("dishwasher-funk", 10)
  }
}

console.log(users);

app.get("/", (req, res) => {
  res.send("A is for Apple");
});

app.get("/partials", (req, res) => {
  res.render("partials/_head");
}); 

app.get("/urls", (req,res) => {
  let userId = req.cookies.userId;
  //const userId = req.cookies.userId
  // if(users[userId] === undefined){
  //   res.redirect("/login")
  //   return
  // }
  //console.log(' user: ',userId)
  //const userId = req.cookies.userId

  let templateVars = { 
    //communicating the filtered ersion of urlDatabase or the currently loggedin User

    listing: urlsForUser(userId),
    //>>>>
    user: users[req.cookies.userId]  

    
    // this can be refactored for userId... 

    //this is the same as user undefined when you aren't logged in// you cant check if a value of an object // you can't check undefined
  };
  console.log(templateVars.listing)
  res.render("urls", templateVars);
});

function addnewURL (shortURL2, longURL2, userId2){

  // b2xVn2: { 
  //   shortURL: "b2xVn2", 
  //   longURL: "http://www.senselab.ca",
  //   userId: "userRandomID"

  urlDatabase[shortURL2] = { //need to assign an object to this. 
  shortURL: shortURL2,
  longURL: longURL2,
  userId: userId2
  /// the part on the right hand side these 
  }
}

function urlsForUser(id) {
  const filteredUrls = {};
  for (const shortURL in urlDatabase){
    const urlObj = urlDatabase[shortURL];

    if (urlObj.userId === id) {
      //url belongs to that user
      //urlObj needs to be part of the filteredUrls object
      //adding the empty object we just created
      filteredUrls[shortURL]= urlObj;
    }
  }
  return filteredUrls;
}

app.post("/urls", (req, res) => {
  console.log(req.body);  
  
  

const longURL = req.body.longURL;
const shortURL = generateRandomString();
const userId = req.cookies['userId']
///////wrong bracesssssss

addnewURL(shortURL, longURL, userId);

  //console.log(urlDatabase);
  //console.log(req.body.longURL)
  //console.log(req.params.shortURL + 'apples')
  res.redirect('/urls/' + shortURL);
  //res.redirect(`/urls/${shortURL}`);
  
  //this is posting things entered on the 'new' page for creating shortURLs, with a random id attached
  //this works because <form action="/urls" method="POST" -- around the input on the new page. it posts (does work with user input) to /urls and urls posts (does with with the user input) creating new key values in urlDatabase
});

app.get("/urls/new", (req, res) => {
  const user = users[req.cookies.userId];
  console.log(user);
  if (!user) {
    res.redirect("/login");
    return
  } 

  let templateVars = { 
    user
  }
  res.render("new", templateVars);
  console.log(userEmail);
  console.log(req.cookies.userId);

  //userEmail: users[userId]
  //serEmail: users[req.cookies.userId]
});

app.post("/urls/:shortURL/delete", (req,res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
  
});


// var urlDatabase = {

//   b2xVn2: { 
//   shortURL: "b2xVn2", 
//   longURL: "http://www.senselab.ca",
//   userId: "userRandomID"
//   },

app.post("/urls/:shortURL/update", (req,res) => {
  
  urlDatabase[req.params.shortURL].longURL = req.body.newLongUrl;
  res.redirect('/urls');
});


app.get("/login", (req, res) => {
  let templateVars = {
    user: users[req.cookies.userId]
  }
  //console.log(userEmail);
  //console.log(req.cookies.userId);
  //res.send('apples')
  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  let foundUser;



  //bcrypt.compareSync(req.body.password, hashedPassword);

  for (var id in users) {
    if(users[id].email === req.body.email) {
      const foundUser = users[id];
      if(bcrypt.compareSync(req.body.password, foundUser.hashedPassword)){
        res.cookie('userId', foundUser.id);
        res.redirect('/urls')
        return
      }
      break;
    }

  }
 
  res.render("login", { error: true})
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  console.log(urlDatabase[req.params.shortURL][longURL] + 'apples');
  //this page isn't loading even when entered directly -- so the redirect alone isn't the issue. there's nothing here appreantly. why....
  //console.log(req.params.shortURL)
  //this is printing a value but the get for the showing of the shortURL display page is not working

  res.redirect(longURL); 
  //not the issue

  //this points to the new key value pair that was created in urlDatabase - with the url the user just entered. the console log of req.params.shortURL displays what  was entered -->
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id].longURL,
    user: users[req.cookies.userId]
  };  //this template vars will export to the show page, so that if i write and JS there, it will have these object/values to work with 


  //getting the long url that was entered and added to the database as the value accessed through the key urlDatabase[req.params.id]. request parameters from id accesses what was entered by the user on the 'new' page.
  //shortURL was generated as the key for the longURL, in the urlDatabase
  
  res.render('show', templateVars);
  console.log(templateVars.longURL);
  //this renders to urls/id, using the ejs layout for show /// don't get them confused

});

app.post("/logout", (req, res) => {
  res.clearCookie('userId');
  console.log('userId' + 'loggingout')
  res.redirect('/login')

});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const generatedId = generateRandomString();
 
    if(req.body.email === '' || req.body.password === ''){
      console.log ('empty entry')
      res.status(404);
      res.render("register");
    }

  users[generatedId] = {
    id: generatedId,
    email: req.body.email,
    password: req.body.password,
    hashedPassword: bcrypt.hashSync(req.body.password, 10)
  }

  console.log(users);
  res.cookie('userId', generatedId);
  res.redirect('/urls');
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