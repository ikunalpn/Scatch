// controllers/authController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {generateToken} = require("../utils/generateToken")

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const userId = await userModel.create(fullName, email, hashedPassword);

        // Generate JWT
        let token = generateToken(userId);
        res.cookie("token", token);


        res.status(201).json({ message: 'User registered successfully', token: token });
    } catch (error) {
        if (error.message === 'Email already in use.') {
            res.status(400).json({ message: error.message });
        } else {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = {
    registerUser,
};