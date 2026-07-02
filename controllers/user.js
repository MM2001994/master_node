const User = require('../models/user'); // Import the User model

async function getAllUsers(req, res) {
    const users = await User.find(); // Fetch all users from MongoDB
    return res.json(users);
}

async function getUserById(req, res) {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}

async function createUser(req, res) {
    const newUser = req.body;
    if (!newUser || !newUser.first_name || !newUser.email || !newUser.gender || !newUser.job_title) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const savedUser = await User.create({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        gender: newUser.gender,
        job_title: newUser.job_title
    });
    // console.log('User saved to MongoDB:', savedUser);
    return res.status(201).json({ message: `User ${newUser.first_name} ${newUser.last_name} added successfully` });
}

async function updateUserById(req, res) {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, { last_name: "Bhattacharya" });
    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
}

async function deleteUserById(req, res) {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
}

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById, createUser };