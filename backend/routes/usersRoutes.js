const express = require('express');
const router = express.Router();
const User = require('../models/User')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'nome email tipo');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao obter utilizadores' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { nome, email },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar utilizador' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Utilizador apagado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao apagar utilizador' });
  }
});

module.exports = router;
