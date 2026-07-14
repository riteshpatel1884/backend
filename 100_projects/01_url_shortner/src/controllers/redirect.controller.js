const crypto = require("crypto");
const { UAParser } = require("ua-parser-js");
const geoip = require("geoip-lite");
const URL = require("../models/url.model.js");

async function handleRedirect(req, res) {
    // ... your existing redirect + visitHistory push logic
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