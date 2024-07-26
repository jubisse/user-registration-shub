const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
