const cookieParser = require('cookie-parser');
const express = require('express'); 
const app = express() 

const jwt = require('jsonwebtoken');

app.use(cookieParser()); 

app.get('/', function(req,res){ 
  let token = jwt.sign({email: "riteshpatel1884@gmail.com"},"secretword")
   // ish secretword ki help se email ka data encrypt hoga.
   // so agar kisi ka ye secretword mil jaye then ham uska data decrypt kr shalte hai
//    thats why ye secretword bhaut hi securely rakha jata hai
console.log(token)   //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdGVzaHBhdGVsMTg4NEBnbWFpbC5jb20iLCJpYXQiOjE3ODIyOTY3MDR9.jvtI2c3CbSk994CgDEwupT2is0nXU_jn3lRuwRdXcJw
//  this is the striing we send on browser
res.cookie("token", token)
res.send("done")
})

//  to find the data of this token
app.get("/read", function(req,res){
    let data = jwt.verify(req.cookies.token, "secretword")
    console.log(data)    //{ email: 'riteshpatel1884@gmail.com', iat: 1782297111 }
})
app.listen(3001)