// TASK 
// Create user account
// -> set up mongoose, schema, model, userCreate, use jwt and set cookie
//  login krne ke baad token ko descypt kro then then based on that find the user


const cookieParser = require('cookie-parser');
const express = require('express'); 
const app = express() 
const path = require('path')
const userModel = require('./models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')





app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'pubic')));
app.use(cookieParser());


app.get('/', function(req,res){
    res.render("index")
})

app.post('/create', async function(req,res){
   let {username, email, password, age} = req.body;


   // encrypting password
   bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(password, salt, async (err,hash)=>{
         let createdUser = await userModel.create({
    username,
    email,
    password:hash,
    age
   })
   const token = jwt.sign({email}, "secretword");
   res.cookie("token", token)
   res.send(createdUser)
    })
   })
})

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = jwt.sign({ email: user.email },"secretword");
            res.cookie("token", token);
            res.send("Login Successful");
        } else {
            res.send("Invalid Password");
        }
    });
});

app.get("/logout", (req,res)=>{
    res.cookie("token", "")
    res.redirect("/")
})
// cookie(token) will be deleted so user will be logged out
app.listen(3000
)