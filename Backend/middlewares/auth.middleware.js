const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
   
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = req.cookies.token || req.headers.authorization?.split('')[1];

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        // Check if token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment
        const user = await userModel.findById(decoded._id); // Fetch user from DB if needed
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({ 
            message: 'Authentication failed', 
            error: error.message 
        });
    }
};