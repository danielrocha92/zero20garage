const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// ✅ CORS: habilita o domínio do Vercel
app.use(cors({
  origin: ['https://zero20garage.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware extra para OPTIONS (preflight)
app.options('*', cors());

// Para tratar JSON no body
app.use(express.json());

// ✅ Rota principal para envio de orçamento
app.post('/enviar-orcamento', async (req, res) => {
  try {
    const formData = req.body;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbz5pteju38JLYtAlIaLGGSmDuQpqDZ1nGKzjHrznGIZZmsRW-uE_mVBD6J8k5x5QG8X/exec';

    const response = await axios.post(scriptURL, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json({ status: 'ok', scriptResponse: response.data });
  } catch (error) {
    console.error('Erro ao enviar para Google Script:', error.message);
    res.status(500).json({ error: 'Erro ao enviar orçamento' });
  }
});

// ✅ Define porta para Render ou local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
