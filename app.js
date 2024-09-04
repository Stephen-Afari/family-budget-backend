const express = require('express');
const app = express();
const path = require("path");
const morgan = require('morgan'); //morgan is a middleware function that logs HTTP requests and responses in a Node.js application. It provides a simple way to track the incoming requests and the status of the outgoing responses, which can be very useful for debugging and monitoring the application's behavior.
const rateLimit = require('express-rate-limit'); //prevent same ip from making too many requests
const helmet = require('helmet'); //security best practices
const mongoSanitize = require('express-mongo-sanitize'); //clean data from malicious code.
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const actualIncRouter = require('./routes/actualIncomeRoutes');
const actualTrxnRouter = require('./routes/actualTransactionRoutes');
const budgetIncRouter = require('./routes/budgetIncomeRoutes');
const budgetTrxnRouter = require('./routes/budgetTransactionRoutes');
const userRouter = require('./routes/userRoutes');

//1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))
//The line app.options('*', cors()); is used in a Node.js/Express application to handle preflight requests for Cross-Origin Resource Sharing (CORS).
//Preflight requests are a type of request sent by the browser when a web application running in one origin (like https://example.com) requests resources from a different origin (like https://api.example.com).
//The app.options('*', cors()); line is configuring your Express application to respond to all OPTIONS requests with the appropriate CORS headers, regardless of the path. This is particularly useful for handling CORS preflight requests.
app.options('*', cors());

// Set security HTTP headers
//Using Helmet is a quick and easy way to improve the security of your Express application. It helps protect your app from some common security vulnerabilities without requiring you to manually configure each individual header. It's especially useful for preventing XSS, clickjacking, and other injection attacks.
app.use(helmet());

// 1) MIDDLEWARES
//use morgan for logging
//console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV='development'){
  app.use(morgan('dev'))
}

// Limit requests from same API
//prevent same ip from making too many requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

//express.json(): This is a built-in middleware function in Express that parses incoming requests with JSON payloads and is based on body-parser. It extracts the JSON data from the request body and makes it available under req.body.
//When a request is sent to the server, if the request’s Content-Type is application/json, express.json() middleware will automatically parse the JSON-formatted request body.
//The parsed JSON object is then assigned to req.body so that it can be accessed in your route handlers.
//app.use(express.json());
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //limit the message body to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS--cross site scripting attacks
app.use(xss());

// Prevent parameter pollution-- to clean the query string
//whitelist to allow duplicates in the query string
app.use(
  hpp({
    whitelist: [
      'parent',
      'subGroup',
      'description'
      
    ]
  })
);

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

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);




//////The following connects the front end to the back end and run on port 5000////////////
//NB: Keep this React connection at the bottom of the page like this
app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static("public"));

//Serve the front-end application
app.use((req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

module.exports = app;