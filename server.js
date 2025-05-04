const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Garante que a pasta 'uploads' exista
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Rota de contato
app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  console.log('Contato:', { nome, email, mensagem });
  res.status(200).json({ message: 'Formulário de contato recebido com sucesso!' });
});

// Rota de orçamento com upload
app.post('/api/orcamento', upload.single('arquivo'), (req, res) => {
  const { nome, telefone, email, cidade, estado, marca, modelo, ano, motorizacao, orcamento, codigo } = req.body;
  const arquivo = req.file ? req.file.filename : null;

  console.log('Orçamento:', {
    nome, telefone, email, cidade, estado, marca, modelo, ano, motorizacao, orcamento, codigo, arquivo
  });

  res.status(200).json({ message: 'Formulário de orçamento recebido com sucesso!' });
});

// Servir arquivos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Servidor de formulário rodando em http://localhost:${PORT}`);
});
