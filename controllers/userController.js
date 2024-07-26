const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }
    res.status(200).json(user);
});

module.exports = { getUsers, getUserById };
