const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: String,
    name: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    role: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);