const { validationResult, body } = require('express-validator'); // Import validationResult
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const userController = require('../controllers/user.controller'); // Import userController

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

router.post('/users/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], exports.registerUser); // Add route for user registration

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser); // Ensure userController is imported

module.exports = router;