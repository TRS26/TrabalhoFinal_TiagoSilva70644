const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Importa o modelo

// Rota para receber e guardar mensagens
router.post('/send', async (req, res) => {
  try {
    const { email, message } = req.body;

    // Verifica se os campos estão preenchidos
    if (!email || !message) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos' });
    }

    // Cria uma nova mensagem
    const newMessage = new Message({ email, message });

    // Guarda no MongoDB
    await newMessage.save();

    res.status(201).json({ msg: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao enviar a mensagem' });
  }
});

module.exports = router;
