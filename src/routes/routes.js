const express = require('express');
const router = express.Router();
// const controller = require('../controller');
const User = require('../models/user.model');
// router.get('/user',controller.get);


router.get('/user', async (req, res) => {
    try {
        // Fetch all users from the 'users' collection
        const users = await User.find({});
        
        // Send the users as a JSON response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});
router.post('/user', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email',email)
        console.log('pss',password)
        console.log('body',req.body)
        // Validate email and password (basic validation)
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Create a new user instance
        const newUser = new User({
            email,
            password, // In a real-world app, you should hash the password before storing
        });

        // Save the user to MongoDB
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        // Handle errors (e.g., duplicate email, etc.)
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});

module.exports = router;