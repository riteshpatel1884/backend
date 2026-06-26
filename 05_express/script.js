// Express.js is a npm package and it is a framework
// It manages everything from receiving the request and giving the response

// Library: A library is a collection of pre-written code that you use whenever you 
// need it. Ex: React. You decide when to render components, fetch data, handle events, etc.

// Framework: A framework provides a structure and rules for your application. 
// The framework controls the flow and calls your code at the appropriate time.
// Ex: Nextjs

// Install: npm i express
const express = require('express'); // 'express' iski sare chize nikal kr express 
// constant me a gyi hai.
const app = express()  // express js ka pura data jo jo express js kr shakta hai wo 
// abb ish app variable me hai


// app.get(route, requestHandler){}   requestHandler is a function
app.get('/', function(req,res){
    res.send("Hi")
})

app.get('/profile', function(req,res){
    res.send("profile page")
})
 
app.listen(3001)