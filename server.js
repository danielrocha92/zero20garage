const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Configurar CORS para permitir requisições do frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://zero20garage.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Configurar body-parser para processar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para receber dados do formulário de Contato
app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;

  console.log('Dados recebidos do formulário de contato:');
  console.log({ nome, email, mensagem });

  // Aqui você pode salvar os dados ou enviar um e-mail
  res.status(200).json({ message: 'Formulário de contato recebido com sucesso!' });
});

// Rota para receber dados do formulário de Orçamento (sem upload)
app.post('/api/orcamento', (req, res) => {
  const { nome, email, telefone, servico, mensagem } = req.body;

  console.log('Dados recebidos do formulário de orçamento:');
  console.log({
    nome,
    email,
    telefone,
    servico,
    mensagem,
  });

  // Aqui você pode salvar os dados ou enviar um e-mail
  res.status(200).json({ message: 'Formulário de orçamento recebido com sucesso!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
