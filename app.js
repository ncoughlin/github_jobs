// The blog post that goes with this exercise is: 
// https://ncoughlin.com/express-api-generating-content-dynamically-with-api-requests/

//-----------------------------------
// SETUP
//-----------------------------------
console.log("app.js server is running");


// import express module
var express = require("express");
// set express to variable
var app = express();

// import request module
var request = require('request');

// import body-parser module
var bodyParser = require("body-parser");
// tell express to use body-parser. more detail on this in the body-parser docs
app.use(bodyParser.urlencoded({extended:true}));

// set listen port
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening on PORT: " + process.env.PORT + " at IP: " + process.env.IP);
});

// set Styles location
app.use(express.static("public"));

// set view engine to .ejs
app.set("view engine", "ejs");

//-----------------------------------
// API REQUESTS
//-----------------------------------

app.get("/results", (req, res) => {
    request('https://jobs.github.com/positions.json?search=node', (error, response, body) => {
        
        // error
         console.log('error:', error); 
        // response 
         console.log('statusCode:', response && response.statusCode); 
        // body
         var parsedBody = JSON.parse(body);
         res.send(parsedBody[0]);
    });
});

//-----------------------------------
// ROUTES
//-----------------------------------

