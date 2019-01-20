bugs to fix:

weird error on urls page:// fixed // 2 renders were called in single app.get

new error: too many url redirects - undefined console log, after a url is entered on the 'new' page. it should go to a url/:shortURL page... 

// this error had something to do with bootstrap *sigh*  // when the scripts for it were removed, the form action redirected to /urls correctly. will look up correct form tagging, maybe. 

//new error -- the shorturls page wasn't loading -- double checked the address and data being passed. 

realized that "/u/:shortURL" is not interchangeable with /urls/:shortURL/

i don't really know why.... but when i put it back to /u/ it could now find the page. ask the teacher why.... 

//another minor bug. the update form button on the shorturls page --- it wasn't routing correctly. at first i changed it to /u/ addresses like before, but this time it was because the ----form method="POST" ---- was placed after the action="/u/<%= shortURL %>/update"  // by changing this so that the method was in front of the action, the action knew what method to use, presumably. 