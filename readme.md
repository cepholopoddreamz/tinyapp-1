bugs to fix:

weird error on urls page:// fixed // 2 renders were called in single app.get

new error: too many url redirects - undefined console log, after a url is entered on the 'new' page. it should go to a url/:shortURL page... 

// this error had something to do with bootstrap *sigh*  // when the scripts for it were removed, the form action redirected to /urls correctly. will look up correct form tagging, maybe. 

//new error -- the shorturls page wasn't loading -- double checked the address and data being passed. 

realized that "/u/:shortURL" is not interchangeable with /urls/:shortURL/

i don't really know why.... but when i put it back to /u/ it could now find the page. ask the teacher why.... 

//another minor bug. the update form button on the shorturls page --- it wasn't routing correctly. at first i changed it to /u/ addresses like before, but this time it was because the ----form method="POST" ---- was placed after the action="/u/<%= shortURL %>/update"  // by changing this so that the method was in front of the action, the action knew what method to use, presumably. 

// continued problem with add new URL page. if i try to add the header file, it breaks the page -  and bootstrap keeps the url add from redirecting to the right page - the show page.

registration page not rendering : (


  Is the cookie on the logout really clearing? 


  /// deleted this from main url page.... 
  <a href="/urls/new" type="button" class="btn btn-outline-info btn-sm">Create Short URL</a>

  //USER EMAIL is NOT DefinED : (

    something is not working. checked template vars but the input is there. console log also reports undefined. so clearly something is not connecting. 

    in one spot it is defined as

    userEmail: users[req.cookies.userId]
    this is when it is checking for a stamp.... server has no memory, presence of a cookie, gives it a memory. 

    userEmail: users[userId] ? users[userId].email : 'hello stranger'

    this checks inside the userobject for the user Id, // is a conditional check for if user useridofspecificinstance is keyvalue and if so print the email value of that key. otherwise, 'hello stranger' /// this is for a different purpose... older purpose maybe. 
    this retrieves values from the user object maybe. the cookie one... is to check for your stamp. if you've logged int. 

    the req.params.shortURL is coming back undefined..... under the app.post. 

    : <