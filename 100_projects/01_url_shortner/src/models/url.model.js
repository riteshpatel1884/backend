const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true // becoz we dont want ki do logo ki same  shortend url bane
    },
    redirectUrl:{
        type: String,
        required: true,
    },
    visitHistory:[{timestamp:{type: Number}}]
}, { timestamps: true}
)


const URL = mongoose.model('url', urlSchema)

module.exports = URL