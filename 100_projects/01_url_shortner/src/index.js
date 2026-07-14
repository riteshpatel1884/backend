const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url.route");
const { connectToDB } = require("./db/db.js");
const { handleRedirect } = require("./controllers/redirect.controller.js");

const app = express();
const PORT = process.env.PORT || 8000;   // was missing const/let — accidental global before

connectToDB(process.env.MONGODB_URL).then(() => console.log("mongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/url", urlRoute);          // handles POST /url and GET /url/analytics/:shortId
app.get("/:shortId", handleRedirect); // real short-link redirects, with full tracking

app.listen(PORT, () => {
    console.log("Server connected");
});