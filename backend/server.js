// backend/server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
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

// -------------------- Rota de Teste --------------------
app.get("/", (_, res) => res.send("Backend Zero20 Garage rodando 🚀"));

// -------------------- Inicia Servidor --------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
