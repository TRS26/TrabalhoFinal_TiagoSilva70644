const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/send', async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos' });
    }

    const newMessage = new Message({ email, message });

    await newMessage.save();

    res.status(201).json({ msg: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao enviar a mensagem' });
  }
});

module.exports = router;
