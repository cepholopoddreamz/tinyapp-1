const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const cookieSession = require('cookie-session')
const PORT = 3000; 

const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(cookieParser())

app.use(cookieSession({
  name: 'session',
  keys: ['adisjfojad121', 'asdh48u2']
}))

const urlDatabase = {

  b2xVn2: { 
  shortURL: "b2xVn2", 
  longURL: "http://www.senselab.ca",
  userId: "userRandomID"
  },

  hsm5xK: {
    shortURL: "hsm5xK",
    longURL: "http://www.google.com",
    userId: "user2RandomID"
  } 
};

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "apples",
    hashedPassword: bcrypt.hashSync("apples", 10)
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk",
    hashedPassword: bcrypt.hashSync("dishwasher-funk", 10)
  }
}

function addnewURL (shortURL2, longURL2, userId2){
  urlDatabase[shortURL2] = { 
  shortURL: shortURL2,
  longURL: longURL2,
  userId: userId2
  }
}

function urlsForUser(id) {
  const filteredUrls = {};
  for (const shortURL in urlDatabase){
    const urlObj = urlDatabase[shortURL];
    if (urlObj.userId === id) {
      filteredUrls[shortURL]= urlObj;
    }
  }
  return filteredUrls;
}

function generateRandomString() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const string_length = 6;
  let randomstring = '';
  for (let i=0; i<string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring  
}

app.get("/", (req, res) => {
  res.send("A is for Apple");
  res.redirect('/urls');
});

app.get("/partials", (req, res) => {
  res.render("partials/_head");
}); 

app.get("/urls", (req,res) => {
  let userId = req.session.userId;
  let templateVars = { 
    listing: urlsForUser(userId),
    user: users[req.session.userId]
  };
  res.render("urls", templateVars);
});

app.post("/urls", (req, res) => {  
  let longURL = req.body.longURL;
  let shortURL = generateRandomString();
  const userId = req.session['userId'];

  if (req.body.longURL !== undefined && req.body.longURL !== ''){
    addnewURL(shortURL, longURL, userId);
    res.redirect('/urls/' + shortURL);
  } else {
    res.status(404);
    res.send('your entry was empty. Please try again');
  }
});



app.get("/urls/new", (req, res) => {
  const user = users[req.session.userId]; 
  if(req.body.email === '' || req.body.password === ''){
    res.status(404);
    res.send('your entry was empty. Please try again');
  }
  let templateVars = { 
    user
  }
  res.render("new", templateVars);
});

app.post("/urls/:shortURL/delete", (req,res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id].longURL,
    user: users[req.session.userId]
  }; 
  if (!templateVars.user){
    res.redirect('/login');
  } else {
    if (urlDatabase[req.params.id].longURL === '' || urlDatabase[req.params.id].longURL === undefined){
      res.status(404);
      res.send("You didn't enter anything. Please try again");
    }
    else {
      res.render('show', templateVars);
    }
  }
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL); 
});

app.post("/urls/:shortURL/update", (req,res) => {
  urlDatabase[req.params.shortURL].longURL = req.body.newLongUrl;
  res.redirect('/urls');
});

app.get("/login", (req, res) => {
  let templateVars = {
    user: users[req.session.userId]
  };
  res.render("login", templateVars);
});

app.post("/login", (req, res) => {
  for (let id in users) {
    if(users[id].email === req.body.email) {
      const foundUser = users[id];
      if(bcrypt.compareSync(req.body.password, foundUser.hashedPassword)){
        req.session.userId = foundUser.id; 
        res.redirect('/urls');
        return;
      }
      break;
    }
  }
  res.render("login", { error: true})
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/login')
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const generatedId = generateRandomString();
  if(req.body.email === '' || req.body.password === ''){
    res.status(404);
    res.send('your email or password was empty, please fill out the fields to register')
    res.render("register");
    } else {
      for (let id in users) {
        if(users[id].email === req.body.email) {
          res.status(404);
          res.send('this email id has already been registered. Please try another')
          res.render("register");
          break;
        } else {
          users[generatedId] = {
          id: generatedId,
          email: req.body.email,
          password: req.body.password,
          hashedPassword: bcrypt.hashSync(req.body.password,10)
          }
        }
      }
    req.session.userId = generatedId;
    res.redirect('/urls');
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}!`);
});
