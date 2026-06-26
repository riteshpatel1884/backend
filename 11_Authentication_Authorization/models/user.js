const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://ritesh20047_db_user:mongodbpassword@cluster0.yrge0ja.mongodb.net/?appName=Cluster0")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log(err));

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
})



module.exports = mongoose.model("user", userSchema);
