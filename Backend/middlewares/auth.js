const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        // Extract the token from the Authorization header
        const token = authHeader.replace('Bearer ', '');
        
        // Verify the token and decode it
        const decoded = jwt.verify(token, 'prajal');
        
        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        // Handle different types of errors
        // if (err.name === 'JsonWebTokenError') {
        //     return res.status(401).json({ message: 'Invalid token' });
        // } else if (err.name === 'TokenExpiredError') {
        //     return res.status(401).json({ message: 'Token expired' });
        // }
        res.status(401).json({ message: 'Unauthorized' });
    }
};


exports.admin = (req, res, next) => {
    console.log('req.user.role',req.user.role)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied, admin only' });
    }
    next();
};

