// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['admin', 'utilizador'], default: 'utilizador' }
});

module.exports = mongoose.model('User', userSchema);
