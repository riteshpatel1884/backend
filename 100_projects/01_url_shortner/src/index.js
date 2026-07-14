const dotenv =  require('dotenv');
dotenv.config();
const express = require("express")
const path = require("path")
const urlRoute = require("./routes/url.route")
const {connectToDB} = require("./db/db.js")
const URL = require("./models/url.model.js")

const app = express()
PORT = 8000

connectToDB(process.env.MONGODB_URL).then(()=> console.log("mongoDB connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./src/views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/url", urlRoute)

app.get("/:shortId", async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push:{visitedHistory: {
        timestamp: Date.now()
    }}})
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, ()=>{
    console.log("Server connected");
})