const express = require('express');
const cors = require('cors');
const axios = require('axios');
const admin = require('firebase-admin');

// ✅ Carrega variáveis de ambiente
require('dotenv').config();

// 🌐 URL do Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbwQmnhIM2KFkQ4xawDq_SyhzYb-ME2Vxa9zTaWMw1gF3Q1pSq9jWLfGOBf5j3CVBmaH/exec';

// 🌐 Origens permitidas
const allowedOrigins = [
  'https://zero20garage.vercel.app',
  'http://localhost:3000'
];

const app = express();

// 🛡️ Configurar CORS dinamicamente
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida por CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ------------------- FIREBASE ADMIN -------------------
// Inicializa Firebase Admin SDK
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log('Firebase Admin inicializado!');
} catch (err) {
  console.error('Erro ao inicializar Firebase Admin:', err.message);
}

// ------------------- ENDPOINT DE LOGIN -------------------
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Firebase Auth REST API
    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY; // adicione no .env
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    const response = await axios.post(url, { email, password, returnSecureToken: true });
    const data = response.data;

    res.json({
      uid: data.localId,
      token: data.idToken,
      email: data.email
    });
  } catch (err) {
    console.error('Erro no login:', err.response?.data || err.message);
    res.status(401).json({ error: 'Falha na autenticação' });
  }
});

// ------------------- ENDPOINT DE ENVIO DE ORÇAMENTO -------------------
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

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
