// Middleware
// Middleware is code that runs between the request and the response.
// It intercepts a request before it reaches the main route/controller and can also 
// process the response before it goes back to the client.


const express = require('express'); 
const app = express()  


// It means koi bhi request aayi pehle ye chalega then url/route chalega 
app.use(function(req,res,next){
    console.log("Middleware chala")
    next(); 
});

app.get('/', function(req,res){
    res.send("Hi");
})

app.listen(3000)







const express = require('express'); 
const app = express()  

app.use(function(req,res,next){
    console.log("Middleware chala")
    next(); 
}); 

app.use(function(req,res,next){
    console.log("Middleware 1 aaur baar chala")
    next();
}); 

app.get('/', function(req,res){
    res.send("Hi");
    
})

app.get('/about', function(req,res){
    res.send("about page");
})
 
app.listen(3000)

// agar /about route chalu hua then pehle 1st middleware pe aayega then 2nd wale 
// pe due to next() and phir wo about route pe jayega (jis route pe chalaya tha)





// Error Handling
const express = require('express'); 
const app = express()  

app.get('/about', function(req,res, next){
    return next(new Error("Something went wrong"));  // It will go to console
})

// To run this, use next in above requestHandler function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broken!")   // It will go to frontend
})
app.listen(3000)