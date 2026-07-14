const express = require("express");
const router = express.Router();
const { newShortUrl } = require("../controllers/url.controller.js");
const { handleRedirect, getAnalytics } = require("../controllers/redirect.controller.js");

router.post("/", newShortUrl);
router.get("/analytics/:shortId", getAnalytics);  // put BEFORE the catch-all below
router.get("/:shortId", handleRedirect);

module.exports = router;