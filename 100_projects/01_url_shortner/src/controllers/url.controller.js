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
        visitedHistory: []
    });

    return res.json({ id: shortID, originalUrl: body.url });
}


module.exports = {newShortUrl}