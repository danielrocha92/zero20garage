const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// ✅ URL do Google Apps Script (substitua pela sua)
const scriptURL = 'https://script.google.com/macros/s/AKfycbwQmnhIM2KFkQ4xawDq_SyhzYb-ME2Vxa9zTaWMw1gF3Q1pSq9jWLfGOBf5j3CVBmaH/exec';

// 🌐 Origens permitidas (produção e desenvolvimento)
const allowedOrigins = [
  'https://zero20garage.vercel.app',
  'http://localhost:3000'
];

// 🛡️ Configurar CORS dinamicamente
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (ex: ferramentas internas ou mobile)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida por CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware para parsear JSON
app.use(express.json());

// 🚀 Endpoint principal
app.post('/enviar-orcamento', async (req, res) => {
  try {
    const formData = req.body;

    const response = await axios.post(scriptURL, formData, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json({ status: 'ok', scriptResponse: response.data });
  } catch (error) {
    console.error('Erro ao enviar para o Google Script:', error.message);
    res.status(500).json({ error: 'Erro ao enviar orçamento' });
  }
});

// Porta automática para Render ou local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
