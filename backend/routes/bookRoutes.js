// routes/bookRoutes.js
const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao listar livros' });
  }
});

router.post('/', async (req, res) => {
  const { titulo, autor, ano, disponivel } = req.body;

  try {
    const newBook = new Book({ titulo, autor, ano, disponivel });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao adicionar livro' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ msg: 'Livro não encontrado' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar livro' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Livro não encontrado' });
    res.json({ msg: 'Livro apagado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao apagar livro' });
  }
});

module.exports = router;
