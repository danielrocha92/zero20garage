// backend/server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

// Carrega variáveis de ambiente
dotenv.config();

// Inicializa Firebase Admin
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log("Firebase Admin inicializado!");
  } catch (err) {
    console.error("Erro ao inicializar Firebase Admin:", err.message);
    process.exit(1);
  }
}

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Inicializa Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração Multer para uploads em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rotas de teste
app.get("/", (req, res) => {
  res.send("Backend da Zero20 Garage rodando!");
});

// Upload de arquivo para Cloudinary
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    // Converte buffer para Base64
    const fileBase64 = req.file.buffer.toString("base64");
    const fileData = `data:${req.file.mimetype};base64,${fileBase64}`;

    // Faz upload para Cloudinary
    const result = await cloudinary.uploader.upload(fileData, {
      folder: "zero20garage",
      resource_type: "auto"
    });

    res.json({
      message: "Upload realizado com sucesso!",
      url: result.secure_url
    });
  } catch (err) {
    console.error("Erro no upload:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
