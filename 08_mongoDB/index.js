const express = require('express');
const app = express();
const userModel = require('./userModel')



app.get("/", function(req,res){
    res.send("hi");
})

// app.get("/create", function(req,res){
//     userModel.create({    It is a synchronus code so it will reun later 
//         name: "Ritesh",
//         email: "riteshpatel1884@gmail.com",
//         username: "riteshpatel1884"
//     })

//      So if we want create wala code pehle chale then we will use async await

// })


app.get("/create", async function(req,res){
   let createdUser = await userModel.create({   
        name: "Ritesh",
        email: "riteshpatel1884@gmail.com",
        username: "riteshpatel1884"
    })

    res.send(createdUser);
})

app.get("/update", async function(req,res){
    let updatedUser = await userModel .findOneAndUpdate({username:"riteshpatel1884"},{name:"Ritesh Patel"},{new:true})
    res.send(updatedUser)
}
)

app.get("/read", async (req,res)=>{
    let user = await userModel .find()
    res.send(user)
}
)

app.get("/delete", async (req,res)=>{
    let user = await userModel.findOneAndDelete({username: "riteshpatel1884"})
    res.send(user)
}
)
app.listen(3000)