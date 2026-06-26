const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postdata:String,
    user:{  // store the id of user who created the post.
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },   
    date:{
        type:Date,
        default:Date.now
    },
   
})



module.exports = mongoose.model("post", postSchema);
