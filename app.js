const express = require('express');
const app = express();
const path = require("path");
const morgan = require('morgan'); //morgan is a middleware function that logs HTTP requests and responses in a Node.js application. It provides a simple way to track the incoming requests and the status of the outgoing responses, which can be very useful for debugging and monitoring the application's behavior.



const actualIncRouter = require('./routes/actualIncomeRoutes');
const actualTrxnRouter = require('./routes/actualTransactionRoutes');
const budgetIncRouter = require('./routes/budgetIncomeRoutes');
const budgetTrxnRouter = require('./routes/budgetTransactionRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
//use morgan for logging
//console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV='development'){
  app.use(morgan('dev'))
}

//express.json(): This is a built-in middleware function in Express that parses incoming requests with JSON payloads and is based on body-parser. It extracts the JSON data from the request body and makes it available under req.body.
//When a request is sent to the server, if the request’s Content-Type is application/json, express.json() middleware will automatically parse the JSON-formatted request body.
//The parsed JSON object is then assigned to req.body so that it can be accessed in your route handlers.
app.use(express.json());

//custom middleware in an Express.js application (ie. app.use())
//Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle.
//The next() function is critical in Express middleware. It tells Express to move on to the next middleware function in the stack. If next() is not called, the request will hang, and the response will not be sent to the client.
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// 3) ROUTES
app.use('/api/v1/actincome',actualIncRouter);
app.use('/api/v1/acttrxn',actualTrxnRouter);
app.use('/api/v1/budginc',budgetIncRouter);
app.use('/api/v1/budgtrxn',budgetTrxnRouter);
app.use('/api/v1/users',userRouter);










//////The following connects the front end to the back end and run on port 5000////////////
//NB: Keep this React connection at the bottom of the page like this
app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static("public"));

//Serve the front-end application
app.use((req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

module.exports = app;