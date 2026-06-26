// Sessions and cookies are both used to remember information between HTTP requests, 
// because HTTP itself is stateless.
// session: A session stores data on the server, not in the browser.
// The browser only stores a Session ID.
// How it works
//1. User logs in.
//2. Server creates a session.
//3. Server sends only the Session ID to the browser.
//4. Browser sends the Session ID back on each request.
//5. Server looks up the session data using that ID.


// Cookie: It means jo data browser me saved hai and iska use authentication me krte hai
// A cookie is a small piece of data stored in the user's browser.
//1. How it works
//2. User logs in.
//3. Server sends a cookie to the browser.
//4. Browser stores it.
//5. Every future request automatically includes that cookie.

// | Feature             | Cookie                   | Session                                 |
// | ------------------- | ------------------------ | --------------------------------------- |
// | Stored where?       | Browser                  | Server                                  |
// | Size                | ~4 KB                    | Much larger (server storage)            |
// | Security            | Less secure              | More secure                             |
// | User can edit?      | Yes (unless protected)   | No (only the session ID is exposed)     |
// | Lifetime            | Until expiry or deletion | Until timeout or logout                 |
// | Automatically sent? | Yes                      | Session ID is usually sent via a cookie |




const express = require('express'); 
const app = express()  
const path = require("path");

// These 2 are called parsers
app.use(express.json()) // It parses JSON data sent by the client.
app.use(express.urlencoded({extended:true}))  // It parses form data (application/x-www-form-urlencoded) sent from HTML forms.
app.use(express.static(path.join(__dirname,'public')));  // It means sari static files
// like images, js ansd stylesheets in sabko search krne ke liye public folder me jana
// __dirname means pura path mere current folder tak Ex: D:\Backend\06_formHandling
// so path.join will add path of __dirname and public folder path 


app.set('view engine', 'ejs'); // Backend will show/redner the ejs file

app.get('/', function(req,res){
    res.render("index");  // index or index.ejs. We already wrote ejs in app.set so there is no need to write index.ejs
})

// dynamic routing
app.get('/profile/:username', function(req,res){
    res.send(req.params.username) // user jo bhi type karega profile ke baad(/profile/)
    // wo username abb frontend se backend aayega then usko dobara se frontend pe bhej
    // diya jayega
    // re.params means colon 
})

// multiple dynamic route
app.get('/profile/:username/:age', function(req, res) {
    res.send(`Username: ${req.params.username}, Age: ${req.params.age}`);
});

app.listen(3000, function(){
    console.log("Server is running")
})