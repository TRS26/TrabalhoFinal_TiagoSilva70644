// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Rota para login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o utilizador existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Utilizador não encontrado' });
    }

    // Verificar a password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Criar um token JWT
    const token = jwt.sign(
      { userId: user._id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota de registro (register)
router.post('/register', async (req, res) => {
  const { nome, email, password, tipo } = req.body;

  // Verificar se o utilizador já existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: 'Este email já está registado' });
  }

  // Criar o novo utilizador
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    nome,
    email,
    password: hashedPassword,
    tipo: tipo || 'utilizador', // Se não for fornecido, assume "utilizador" por padrão
  });

  try {
    await newUser.save();
    // Gerar um token JWT para o utilizador recém-criado
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ token }); // Devolver o token ao utilizador
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar o utilizador' });
  }
});


module.exports = router;
