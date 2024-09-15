const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const controller = require('../controller');
const User = require('../models/user.model');
// router.get('/user',controller.get);

// Secret key for JWT (this should ideally be in your .env file)
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'normal-token';

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
router.post('/login', async(req,res) =>{
    try{
        const {email,password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error:'User not found'})
        }

        const verifyPassword = await bcrypt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(401).json({error:'Incorrect password'});
        }
        const token = jwt.sign({UserId:user._id},ACCESS_TOKEN,{expiresIn:'5h'})
        if(token){
             // Send the token back to the client
            return res.status(200).json({ message: 'Login successful', token,username:user.username });
        }
    }catch(err){
        res.status(500).json({ error: 'Error in fetching user', details: err.message });
    }
})
router.post('/signup', async (req, res) => {
    try {
        const { email, password,userName } = req.body;
        // Validate email and password (basic validation)
        console.log(email,userName)
        if (!email || !password || !userName) {
            return res.status(400).json({ error: 'Email and password and username are required' });
        }
        // validate user is already exist or not 
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({error:'User already exist with this email'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        // Create a new user instance
        const newUser = new User({
            email,
            username:userName,
            password:hashedPassword, 
        });

        // Save the user to MongoDB
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});

module.exports = router;