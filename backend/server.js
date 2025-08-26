// backend/server.js
import express from "express";
import cors from "cors";
import multer from "multer";
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

// Configura variáveis de ambiente
dotenv.config();

// Inicializa Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração Multer para uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rota de teste
app.get("/", (req, res) => {
  res.send("Backend da Zero20 Garage rodando!");
});

// Rota de upload de arquivo (exemplo)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "Arquivo não enviado" });
    }

    // Aqui você pode integrar com Cloudinary ou Firebase Storage
    res.send({ message: "Upload recebido com sucesso!", filename: req.file.originalname });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
