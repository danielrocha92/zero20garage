// backend/server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config(); // Carrega variáveis do .env

// -------------------- Firebase Admin --------------------
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log("Firebase Admin inicializado!");
  } catch (err) {
    console.error("Erro ao inicializar Firebase Admin:", err.message);
    process.exit(1);
  }
}

// -------------------- Cloudinary --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------- Express --------------------
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------- Multer --------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------- Login Admin --------------------
const ADMIN_EMAIL = "admin@zero20garage.com";
const ADMIN_PASSWORD = "zeroadmin2024";

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ status: "ok", token: "Acesso-liberado" });
  }

  return res.status(401).json({ status: "erro", message: "Credenciais inválidas" });
});

// -------------------- Upload de Imagens Cloudinary --------------------
app.post("/api/upload-imagens", upload.array("imagens", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "Nenhum arquivo enviado." });
    }

    const uploadPromises = req.files.map(file => {
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      return cloudinary.uploader.upload(dataUri, { folder: "zero20garage" });
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map(result => result.secure_url);

    res.status(200).json({ urls });
  } catch (error) {
    console.error("Erro no upload de imagens:", error);
    res.status(500).json({ msg: "Erro interno do servidor ao fazer upload de imagens." });
  }
});

// -------------------- Rota de Teste --------------------
app.get("/", (_, res) => res.send("Backend Zero20 Garage rodando 🚀"));

// -------------------- Inicia Servidor --------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

