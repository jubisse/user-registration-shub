const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./connect/database');

const PORT = process.env.PORT || 5050;

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.use((req, res, next) => {
    res.status(404).send('Rota não encontrada');
});

app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}.`));
