# Example of AsyncLocalStorage usage

This is a simple example of [AsyncLocalStorage API](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage) of Node.js.

To initialize an application execute `npm install`.

To run an application execute `npm test` and see console output.

As you can see every logging chain is preceded with a uuid prefix. That is done by fixing execution context in AsyncLocalStorage. See `controller.js` where AsyncLocalStorage created a context and `console-logger.js` where it is used. 

Alternatively, you can run `npm start` and connect to the application using `telnet 127.0.0.1 3001` command.
