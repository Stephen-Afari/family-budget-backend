const express = require('express');
const app= express();

//When root url is requested, we send status 200 and the text below
app.get('/',(req,res)=>{
    res.status(200).send('Hello from the Server side')
})

//When root url is requested, we send status 200 and the text below
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         message:'Hello from the Server side',
//         app: family-Budget
//     })
// })
//Setup server PORT
const port = 3000;

// Launch app to listen to specified port
app.listen(port, () => {
    console.log(`family app server is running on Port: ${port}`);
    });