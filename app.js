const express = require('express');
const app= express();
const path = require("path");

//When root url is requested, we send status 200 and the text below
// app.get('/',(req,res)=>{
//     res.status(200).send('Hello from the Server side')
// })

////////////////////////////////////////
//////The following connects the front end to the back end and run on port 5000
//NB: Keep this React connection at the bottom of the page like this
app.use(express.static(path.join(__dirname, ".", "build")));
app.use(express.static("public"));

//Serve the front-end application
app.use((req, res) => {
  res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});
//////////////////////////////////////////////
//Setup server PORT
const port = process.env.PORT || 5000;;

// Launch app to listen to specified port
app.listen(port, () => {
    console.log(`family app server is running on Port: ${port}`);
    });