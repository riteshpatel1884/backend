const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
    
}, {timestamps: true});

export const Category = mongoose.model('Category', categorySchema);

// Category is a standard approach to write as mongoDB automatically write it as catregories in the database
