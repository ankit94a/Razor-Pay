const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
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
    username:{
        type:String,
        required:false,
    },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
