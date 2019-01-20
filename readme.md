bugs to fix:

weird error on urls page:
Can\'t set headers after they are sent.

>>the internet says: HTTP uses a cycle that requires one response per request. When the client sends a request (e.g. POST or GET) the server should only send one response back to it.

This error message:

Error: Can't set headers after they are sent.

usually happens when you send several responses for one request. Make sure the following functions are called only once per request: