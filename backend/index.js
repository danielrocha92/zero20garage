// backend/index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Adicionado para lidar com uploads de arquivos
const cloudinary = require("cloudinary").v2; // Adicionado para o Cloudinary
const dotenv = require("dotenv"); // Adicionado para carregar variáveis de ambiente

dotenv.config(); // Carrega as variáveis do arquivo .env

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração do Multer (para upload de arquivos)
const storage = multer.memoryStorage(); // Usa a memória para armazenar o arquivo temporariamente
const upload = multer({ storage: storage });

const ADMIN_EMAIL = "admin@zero20garage.com";
const ADMIN_PASSWORD = "zeroadmin2024";

// Endpoint de Login (Lógica existente - não alterada)
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({ status: "ok", token: "Acesso-liberado" });
    }

    return res.status(401).json({ status: "erro", message: "Credenciais inválidas" });
});

// Endpoint para o upload de imagens
app.post('/api/upload-imagens', upload.array('imagens', 10), async (req, res) => {
    try {
        // Verifica se há arquivos enviados
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: 'Nenhum arquivo enviado.' });
        }

        // Cria uma promessa para cada arquivo a ser enviado para o Cloudinary
        const uploadPromises = req.files.map(file => {
            const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            return cloudinary.uploader.upload(dataUri, { folder: 'zero20garage' });
        });

        // Espera todas as promessas de upload serem concluídas
        const results = await Promise.all(uploadPromises);
        const urls = results.map(result => result.secure_url);

        // Retorna as URLs das imagens salvas
        res.status(200).json({ urls });
    } catch (error) {
        console.error('Erro no upload de imagens para o Cloudinary:', error);
        res.status(500).json({ msg: 'Erro interno do servidor ao fazer upload de imagens.' });
    }
});

// Endpoint de Teste (Lógica existente - não alterada)
app.get("/", (_, res) => res.send("API de login rodando 🚀"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Removidas todas as funções de exportação (Excel, PDF) e JSX daqui.
// Elas pertencem ao frontend.
