const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')


const app = express()
const PORT = 8000

app.use(express.urlencoded({extended:false}))

// 1. List/get all users 
app.get("/api/users", (req,res)=>{
    return res.json(users)  // as our data is in json so res.json
})

// For best practice we use /api/users. It means /api/users and /users both will work.
// If anyone(mainly user) enter /users then HTML document will be render
// If anyone(mainly developers) enters /api/users then json data will display 


app.get("/api/users/:id", (req,res)=>{
    // id is in a string so convert it into a number
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id)

    return res.json(user)
})

// creating a new user
app.post("/api/users", (req,res)=>{
    const body = req.body;
    console.log(body);
//     {
//   first_name: 'Ritesh ',
//   last_name: 'Patel',
//   email: 'ritesh20047@gmail.com',
//   gender: 'male',
//   job_title: 'GenAI Developer'
// }

    // we got the data send by postman . Now add this to our mock data
    users.push({...body, id: users.length+1 }); // id ham khud dange new created user ko
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status: "success", id: users.length+1});
    })
})


// updating a user 
app.patch("/api/users:id", (req,res)=>{
    return res.json({status: "Pending"});
})


// deleting a user 
app.delete("/api/users:id", (req,res)=>{
    return res.json({status: "Pending"});
})

app.listen(PORT,()=>{console.log("Connected...");
})