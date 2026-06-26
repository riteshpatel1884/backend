const express = require('express'); 
const app = express()  

const userModel =require("./models/user");
const postModel = require("./models/post");

app.get('/', function(req,res){
    res.send("Hi")
})

app.get('/create', async function(req,res){
   let user = await userModel.create({
    username: "Ritesh",
    age:21,
    email:"mail@ritesh.in"
   })

   res.send(user)
})
 

app.get('/post/create', async function(req,res){
  let post = await postModel.create({    // posts me suer ki id aa jayega
    postdata: "Kaise ho",
    user: "wer392hy5c23934v33xh542"
  })

  // user me post id id aa jayega
  let user = await userModel.findOne({_id:"wer392hy5c23934v33xh542"});
  user.posts.push(post._id);
  await user.save();


  res.send({post, user})
})


app.listen(3000)