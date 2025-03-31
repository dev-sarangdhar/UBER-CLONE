const { validationResult } = require('express-validator'); // Import validationResult
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        if (error.code === 11000) { // Handle duplicate key error
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = router;