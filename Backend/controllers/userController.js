const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const multer=require('../middlewares/multer')

const register = async (req, res) => {
    const { name, email, password ,role, profileImage} = req.body;
    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.path : null // Handle optional profile image
        });

        // Save the user to the database
        const result = await user.save();

        // Send success response
        res.status(201).send({ message: 'User registered successfully', user: result });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).send({ message: 'Registration failed' }); // Use 500 for server errors
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'prajal',{ expiresIn: '1h' });
        // res.json({ token });
        res.status(200).send({ message:'user login successful...',token,  task:user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { register, login, getProfile };
