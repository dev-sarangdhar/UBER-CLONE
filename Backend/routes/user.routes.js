const { validationResult, body } = require('express-validator'); // Import validationResult
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const userController = require('../controllers/user.controller'); // Import userController
const authMiddleware = require('../middlewares/auth.middleware'); // Import auth middleware

router.post('/users/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser); // Use userController for registration

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginUser); 

router.get('/profile', authMiddleware.authUser, userController.getUserProfile); 

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;