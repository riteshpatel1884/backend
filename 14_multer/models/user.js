const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://ritesh20047_db_user:mongodbpassword@cluster0.yrge0ja.mongodb.net/?appName=Cluster0")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log(err));

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    password:String,
    age:Number,
    email:String,
    profilepic:{
        type:String,
        default:"default.webp"  // bedefault user jab create hoga
        // then uska profile image default.webp hoga.
    },
    posts:[
        {type:mongoose.Schema.Types.ObjectId, ref:"post"}
    ]
})



module.exports = mongoose.model("user", userSchema);
