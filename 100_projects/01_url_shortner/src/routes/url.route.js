const express = require('express')
const {newShortUrl} = require("../controllers/url.controller")
const router = express.Router()


router.post("/", newShortUrl)

module.exports = router