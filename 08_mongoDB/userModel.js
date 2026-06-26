const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ritesh20047_db_user:hhtNRHhyoApmSQdu@cluster0.yrge0ja.mongodb.net/myDatabase")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String
});

module.exports = mongoose.model("user", userSchema); // export is done so that we 
// can perform CRUD Operation using different routes 