const crypto = require("crypto");
const { UAParser } = require("ua-parser-js");
const geoip = require("geoip-lite");
const URL = require("../models/url.model.js");


async function handleRedirect(req, res) {
    const shortId = req.params.shortId;

    let ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "unknown";
    ip = ip.replace("::ffff:", "").trim();

    // Local dev fallback — remove or gate behind NODE_ENV before deploying
    if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.")) {
        ip = "8.8.8.8"; // fake public IP just for local testing...
    }

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

async function getAnalytics(req, res) {
    const { shortId } = req.params;
    const url = await URL.findOne({ shortId });
    if (!url) return res.status(404).send("Not found");

    const visits = url.visitHistory;
    const totalClicks = visits.length;
    const uniqueVisitors = new Set(visits.map(v => v.ipHash)).size;

    const countBy = (key) => {
        const map = {};
        visits.forEach(v => {
            const val = v[key] || "Unknown";
            map[val] = (map[val] || 0) + 1;
        });
        return Object.entries(map)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    };

    res.json({
        totalClicks,
        uniqueVisitors,
        browsers: countBy("browser"),
        devices: countBy("device"),
        countries: countBy("country"),
    });
}



module.exports = { handleRedirect, getAnalytics };