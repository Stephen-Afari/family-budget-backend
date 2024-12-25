const mongoose = require('mongoose');
const Transaction = require('./models/transactionModel');


//importing the dotenv file
const dotenv = require("dotenv");
//indicate the path for the dotenv file
dotenv.config({ path: "./config.env" });
console.log(process.env.port);

//replace with real password
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
  })
  .then(() => console.log('DB connection successful!'));

//testing the database
// const testTransaction = new Transaction({
// date: '06-10-2024', subGroup:'electricity', parent:'utilities',description:'light bill' ,amount: 700, target:100
// });

// testTransaction.save().then(doc=>{
//     console.log(doc)
// }).catch(err=>console.log('ERROR',err))

// 4) START SERVER
//import the app which exported from app.js
const app = require('./app')

// //importing the dotenv file
// const dotenv = require("dotenv");
// //indicate the path for the dotenv file
// dotenv.config({ path: "./config.env" });
// console.log(process.env.port);

// console.log(app.get('env'));
//console.log(process.env);

const port = process.env.port || 5000 ;
const server = app.listen(port, () => {
    console.log(`family app server is running on Port: ${port}`);
    });
//The process.on('unhandledRejection') block is used to handle unhandled promise rejections in Node.js
//This listens for the unhandledRejection event, which is emitted when a Promise is rejected, but there is no .catch() handler to handle the error. This is a common way to catch errors that occur in asynchronous code but are not properly handled.
//Unhandled promise rejections can cause an application to behave unpredictably. Catching them ensures stability and helps identify where errors are occurring in asynchronous code.
process.on('unhandledRejection', (err) => {
      //console.log(err.name, err.message);
      //console.log(err);
      // server.close(() => {
      //   process.exit(1);
      // });
    
      //console.log('UNHANDLED REJECTION!  ...');
    });