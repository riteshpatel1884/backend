const crypto = require("crypto");
const { UAParser } = require("ua-parser-js");
const geoip = require("geoip-lite");
const URL = require("../models/url");

async function handleRedirect(req, res) {
    const shortId = req.params.shortId;

    const ip = (req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "unknown").trim();
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

    const parser = new UAParser(req.headers["user-agent"]);
    const { browser, os, device } = parser.getResult();

    const geo = geoip.lookup(ip); // null if local/unknown IP

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                    ipHash,
                    browser: browser.name || "Unknown",
                    os: os.name || "Unknown",
                    device: device.type || "desktop",
                    country: geo?.country || "Unknown",
                    city: geo?.city || "Unknown",
                    referrer: req.headers["referer"] || "direct",
                }
            }
        },
        { new: true }
    );

    if (!entry) return res.status(404).send("Short URL not found");

    res.redirect(entry.redirectUrl);
}

module.exports = { handleRedirect };