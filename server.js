import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// CORS configurado para aceitar requisições do Vercel
const allowedOrigins = [
  'http://localhost:3000',
  'https://zero20garage.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('/enviar-orcamento', async (req, res) => {
  try {
    const formData = req.body;

    const scriptURL = 'https://script.google.com/macros/s/AKfycby6GE30V7ep96i8FOHwyvk_o-KWEnodbLVJInx4fYvxhXwgytOfRXZjsploHRvOx_AG/exec';

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
