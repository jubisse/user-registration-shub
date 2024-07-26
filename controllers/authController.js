const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const signup = asyncHandler(async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    if (!email || !password || !passwordConfirmation) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (password !== passwordConfirmation) {
        return res.status(400).json({ message: 'Os dados introduzidos não são válidos.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'O endereço introduzido já está registado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'A password introduzida é inválida!' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso', userId: user._id });
});

module.exports = { signup, login };
