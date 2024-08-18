




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

const port = process.env.port;
const server = app.listen(port, () => {
    console.log(`family app server is running on Port: ${port}`);
    });
