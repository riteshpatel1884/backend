const {nanoid} = require("nanoid")
const URL = require("../models/url.model.js")



async function newShortUrl(req, res) {
    const body = req.body;
    if (!body || !body.url) 
        return res.status(400).json({ error: 'url is required' });
    
    const shortID = nanoid(5);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        // no need to pass visitHistory — schema default is already []
    });

    return res.json({ id: shortID, originalUrl: body.url });
}


async function getAllUrls(req, res) {
    const urls = await URL.find({}, { shortId: 1, redirectUrl: 1, visitHistory: 1, createdAt: 1 })
        .sort({ createdAt: -1 });

    const summary = urls.map(u => ({
        shortId: u.shortId,
        redirectUrl: u.redirectUrl,
        totalClicks: u.visitHistory.length,
        createdAt: u.createdAt,
    }));

    res.json(summary);
}

async function getSummary(req, res) {
    const urls = await URL.find({}, { visitHistory: 1 });

    const totalUrls = urls.length;

    let totalClicks = 0;
    const allIpHashes = new Set();

    urls.forEach(u => {
        totalClicks += u.visitHistory.length;
        u.visitHistory.forEach(v => {
            if (v.ipHash) allIpHashes.add(v.ipHash);
        });
    });

    res.json({
        totalUrls,
        totalClicks,
        totalUniqueVisitors: allIpHashes.size,
    });
}

module.exports = { newShortUrl, getAllUrls, getSummary };


