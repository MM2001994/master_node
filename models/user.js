const mongoose = require('mongoose');

// Define a Mongoose schema for the User model
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    job_title: { type: String }
});


// Create a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

module.exports = User;