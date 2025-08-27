// backend/server.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config(); // Carrega variáveis do .env

// -------------------- Firebase Admin --------------------
if (!admin.apps.length) {
  try {
    const serviceAccount = {
      "type": process.env.FIREBASE_TYPE,
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // ✅ Corrigido para adicionar as quebras de linha
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
      "client_id": process.env.FIREBASE_CLIENT_ID,
      "auth_uri": process.env.FIREBASE_AUTH_URI,
      "token_uri": process.env.FIREBASE_TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
      "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
    };

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