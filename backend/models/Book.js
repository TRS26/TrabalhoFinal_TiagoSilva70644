const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number, required: true },
  disponivel: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', bookSchema);
