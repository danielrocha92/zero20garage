const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// ✅ URL do Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbwQmnhIM2KFkQ4xawDq_SyhzYb-ME2Vxa9zTaWMw1gF3Q1pSq9jWLfGOBf5j3CVBmaH/exec';

// CORS para aceitar requisições do Vercel
app.use(cors({
  origin: 'https://zero20garage.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Endpoint de envio do orçamento
app.post('/enviar-orcamento', async (req, res) => {
  try {
    const formData = req.body;

    // Enviar os dados do orçamento para o Google Sheets (via Google Apps Script)
    const response = await axios.post(scriptURL, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Resposta de sucesso
    res.json({ status: 'ok', scriptResponse: response.data });
  } catch (error) {
    console.error('Erro ao enviar para Google Script:', error.message);
    res.status(500).json({ error: 'Erro ao enviar orçamento' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
