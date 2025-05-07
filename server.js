import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/enviar-orcamento', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycby6GE30V7ep96i8FOHwyvk_o-KWEnodbLVJInx4fYvxhXwgytOfRXZjsploHRvOx_AG/exec', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy rodando na porta ${PORT}`));
