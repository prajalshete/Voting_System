const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },                    //Image URL
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Add role field
});

module.exports = mongoose.model('User', UserSchema);
