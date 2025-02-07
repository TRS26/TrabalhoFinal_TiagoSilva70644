// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const messageRoutes = require('./routes/messageRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Middleware para JSON
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB bem-sucedida'))
  .catch((err) => console.log('Erro de conexão:', err));

app.use(cors());

// Roteadores
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', usersRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});