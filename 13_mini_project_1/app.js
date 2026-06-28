// Project: It is based on a post creation by users. Users can create posts and view 
// their own posts.
//  login and signup functionality is also there.
// post like as well as delete based on authorization
const cookieParser = require('cookie-parser');
const express = require('express'); 
const app = express() 
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userModel = require('./models/user');
const postModel = require('./models/post');

 
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/', function(req,res){
    res.render("index")
})

 app.post('/register', async function(req,res){
    // checking if ush email se koi account already hai ya nhi 
    let{ email, password, username, name, age}  =req.body;
    let user = await userModel.findOne({email})

    if(user) return res.send("User already exists");

    // if no user exists with that email then create a new user
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password, salt, async (err,hash)=>{
             let createdUser = await userModel.create({
                email,
                password: hash,
                username,
                name,
                age
             });
           let token = jwt.sign({email:createdUser.email, userid:createdUser._id}, "secretword")
             res.cookie("token", token);
             res.send("Registered User");
        })
    })
})


app.get('/login', function(req,res){
    res.render("login")
})

 app.post('/login', async function(req,res){
    // checking if user exists with that email
    let{ email, password}  =req.body;
    let user = await userModel.findOne({email})

    if(!user) return res.send("User does not exist");

    // if user exists, check password
    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
           let token = jwt.sign({email:email, userid:user._id}, "secretword")
            res.cookie("token", token);
            res.status(200).redirect("/profile");  // redirec to profile page after login
        }else{
            res.redirect("/login");
        }
    })
})
          
app.get("/logout", (req,res)=>{
    res.cookie("token", "")
    res.redirect("/login")
})

// It is a protected route, only logged in users can access it thats why we used isLoggedIn middleware
app.get("/profile", isLoggedIn, async (req, res) => {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("posts");
    // populate posts of that user. Populate means to fetch the 
    // data of the posts from the post collection based on the post ids stored in the 
    // user document.
    res.render("profile", { user });
});

// middleare for protected routes
function isLoggedIn(req, res, next){
    let token = req.cookies.token;
    if(!token) return res.redirect("/login");
    else{
         let data = jwt.verify(token, "secretword")
        req.user = data;
        next();
    }
}

// post tabhi hoga jab user logged in hoga.
app.post("/post", isLoggedIn, async (req,res)=>{
    // Frist we need to find which user is logged in, then we can create a post for that user
    let user = await userModel.findOne({ email: req.user.email }); 
    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content
    });

    // user ko batana hai ki usne post create ki hai so uske psots me created post ko
    // push kr do.
    user.posts.push(post._id);
    await user.save();

    res.redirect("/profile");
});

app.get('/like/:id', isLoggedIn, async function(req,res){
   // since hamne post schema me user field ko id rakha hua hai so hamne ush field ko
   //    populate kr diya taki usme id ki jagah user ka pura data aa jaye.
    let post = await postModel.findOne({_id:req.params.id}).populate("user"); 
    if(post.likes.indexOf(req.user.userid) ===-1){  // agar post ke likes me user ki id nhi hai to usko like kr do. -1 means user nhi hai
       post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1); // agar user already like kr chuka hai to usko unlike kr do.
        // 1 means 1 like hat jayega
    }
    await post.save();
    res.redirect("/profile");
})

app.get('/edit/:id', isLoggedIn, async function(req,res){
    let post = await postModel.findOne({_id:req.params.id}).populate("user"); 
   res.render("edit", {post});
})

app.get('/update/:id', isLoggedIn, async function(req,res){
   let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content:req.body.content})
   res.redirect("/profile");
})

app.get('/delete/:id', isLoggedIn, async function(req, res) {
    let post = await postModel.findOne({ _id: req.params.id });

    // authorization check — only the post owner can delete it
    if (post.user.toString() !== req.user.userid.toString()) {
        return res.status(403).send("Unauthorized");
    }

    // remove post id from user's posts array
    await userModel.findByIdAndUpdate(req.user.userid, {
        $pull: { posts: post._id }
    });

    // delete the post itself
    await postModel.findByIdAndDelete(req.params.id);

    res.redirect("/profile");
});

app.listen(3000);