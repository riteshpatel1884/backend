const express = require("express");
const router = express.Router();
const { newShortUrl, getAllUrls, getSummary } = require("../controllers/url.controller.js");
const { getAnalytics } = require("../controllers/redirect.controller.js");

router.post("/", newShortUrl);
router.get("/history", getAllUrls);
router.get("/summary", getSummary);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;