const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{
        timestamp: { type: Number },
        ipHash: { type: String },       // hashed IP -> used for unique visitor count
        browser: { type: String },      // ua-parser-js → browser/OS/device from user-agent header
        os: { type: String },
        device: { type: String },      // mobile / desktop / tablet
        country: { type: String },     // geoip-lite → country/city from IP, fully offline (bundles MaxMind-lite data). 
        city: { type: String },
        referrer: { type: String },
    }]
}, { timestamps: true })

const URL = mongoose.model('url', urlSchema)

module.exports = URL