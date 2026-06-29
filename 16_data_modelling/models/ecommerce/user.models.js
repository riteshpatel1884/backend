const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usermname: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // its a good practice to store emails in lowercase to avoid duplicates
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);