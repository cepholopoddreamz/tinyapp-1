bugs to fix:

weird error on urls page:// fixed

new error: too many url redirects - undefined console log, after a url is entered on the 'new' page. it should go to a url/:shortURL page... 

// this error had something to do with bootstrap *sigh*  // when the scripts for it were removed, the form action redirected to /urls correctly. will look up correct form tagging, maybe. 

//new error -- the shorturls page wasn't loading -- double checked the address and data being passed. 

realized that "/u/:shortURL" is not interchangeable with /urls/:shortURL/

i don't really know why.... but when i put it back to /u/ it could now find the page. ask the teacher why.... 