const cookieParser = require('cookie-parser');
const express = require('express'); 
const app = express() 
const bcrypt = require('bcrypt') // used for encryption and decryption 


app.use(cookieParser())

// setting cookies 
// app.get('/', function(req,res){ 
//     res.cookie("name", "ritesh");
//     res.send("done");
//     console.log(req.cookies)
// })

// Once cookie is set, then we can req or send data from any route. That stored 
// cookie will be attached to every route.


// format of bcrypt
// app.get('/', function(req,res){ 
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });
// })

// $2b$10$mEoiRwT57g/7tTV63aHUgeyxUcWpmzRbMrX.pH7fAowYQFtxip3Ku

// encrypting password
// app.get('/', function(req,res){ 
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("admin@1234", salt, function(err, hash) {
//          console.log(salt)   // salt is a random string: $2b$10$Q3OsAMxs7v8ku298uJD73O
//          console.log(hash)   // This is our password: $2b$10$8dKhxn.PldJfaqvf7/n8euF.bt3kZoL3fEOiTSTTLjCZZfna1d/da

//     });
// });
// })


// decrypting password
app.get('/', function(req,res){ 
    bcrypt.compare("admin@1234", "$2b$10$mEoiRwT57g/7tTV63aHUgeyxUcWpmzRbMrX.pH7fAowYQFtxip3Ku", function(err, result) {
    console.log(result)  // true it means password and the string is matching
});
})

app.listen(3001)