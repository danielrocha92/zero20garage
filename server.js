const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = 5000;


// Configurar CORS para permitir requisições do frontend
app.use(cors());


// Configurar body-parser para processar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configurar multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


// Criar a pasta de uploads, se não existir
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


// Rota para receber dados do formulário de Contato
app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;


  console.log('Dados recebidos do formulário de contato:');
  console.log({ nome, email, mensagem });


  // Aqui você pode salvar os dados em um banco de dados ou enviar um e-mail
  res.status(200).json({ message: 'Formulário de contato recebido com sucesso!' });
});


// Rota para receber dados do formulário de Orçamento
app.post('/api/orcamento', upload.single('arquivo'), (req, res) => {
  const { nome, email, telefone, servico, mensagem } = req.body;

  console.log('Dados recebidos do formulário de orçamento:');
  console.log({
    nome,
    email,
    telefone,
    servico,
    mensagem,
  });


  // Aqui você pode salvar os dados em um banco de dados ou enviar um e-mail
  res.status(200).json({ message: 'Formulário de orçamento recebido com sucesso!' });
});


// Servir arquivos estáticos da pasta de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});