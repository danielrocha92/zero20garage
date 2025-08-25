// backend/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = "admin@zero20garage.com";
const ADMIN_PASSWORD = "zeroadmin2024";

// Endpoint de Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ status: "ok", token: "Acesso-liberado" });
  }

  return res.status(401).json({ status: "erro", message: "Credenciais inválidas" });
});

// Endpoint de Teste
app.get("/", (_, res) => res.send("API de login rodando 🚀"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Removidas todas as funções de exportação (Excel, PDF) e JSX daqui.
// Elas pertencem ao frontend.
