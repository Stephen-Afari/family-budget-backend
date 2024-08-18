const express = require('express');
const app = express();
const path = require("path");
const morgan = require('morgan'); //morgan is a middleware function that logs HTTP requests and responses in a Node.js application. It provides a simple way to track the incoming requests and the status of the outgoing responses, which can be very useful for debugging and monitoring the application's behavior.
//importing the dotenv file
const dotenv = require("dotenv");
//indicate the path for the dotenv file
dotenv.config({ path: "./config.env" });
console.log(process.env.port);


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














//////The following connects the front end to the back end and run on port 5000////////////
//NB: Keep this React connection at the bottom of the page like this
app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static("public"));

//Serve the front-end application
app.use((req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

module.exports = app;