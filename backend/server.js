// backend/server.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config(); // Carrega variáveis do .env

// -------------------- Firebase Admin --------------------
if (!admin.apps.length) {
  try {
    // ✅ Usa a variável de ambiente única para o JSON do Firebase Service Account
    // Substitui as quebras de linha escapadas para que o JSON.parse funcione
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON.replace(/\\n/g, '\n');
    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log("Firebase Admin inicializado com sucesso!");
  } catch (err) {
    console.error("Erro ao inicializar Firebase Admin:", err.message);
    process.exit(1);
  }
}

// -------------------- Express --------------------
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Configuração de CORS para permitir múltiplas origens
const allowedOrigins = [
  'http://localhost:3000',
  'https://zero20garage.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origem não permitida por CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json());

// -------------------- Login Admin --------------------
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

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
