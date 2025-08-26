require('dotenv').config();
const express = require('express');
const cors = require('cors');

const uploadRoutes = require('./routes/upload');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/upload', uploadRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('Upload Service está online 🚀');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Upload Service rodando na porta ${PORT}`);
});
