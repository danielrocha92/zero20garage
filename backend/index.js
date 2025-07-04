import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const ADMIN_EMAIL = "admin@zero20garage.com";
const ADMIN_PASSWORD = "zeroadmin2024";

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ status: "ok", token: "acesso-liberado" });
  }

  return res.status(401).json({ status: "erro", message: "Credenciais inválidas" });
});

app.get("/", (_, res) => res.send("API de login rodando 🚀"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Exportar Excel
function exportarExcel(dados) {
  const ws = XLSX.utils.json_to_sheet(dados); // dados = array de objetos
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'orcamentos.xlsx');
};

// Exportar PDF
function exportarPDF(dados) {
  const doc = new jsPDF();
  doc.text('Histórico de Orçamentos', 10, 10);
  dados.forEach((h, i) => {
    doc.text(
      `${i + 1}. [${h.data}] Tipo: ${h.tipo} | Nome: ${h.nome} | Valor: R$ ${h.valorTotal}`,
      10,
      20 + i * 10
    );
  });
  doc.save('orcamentos.pdf');
}

const WEB_APP_URL = 'SUA_URL_DO_WEB_APP_GOOGLE_SCRIPT';

async function salvarNoGoogleSheets(dados) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    const result = await res.json();
    if (result.status === 'success') {
      alert('Orçamento enviado com sucesso para o Google Sheets.');
    } else {
      alert('Erro ao enviar para o Google Sheets.');
    }
  } catch (err) {
    alert('Erro ao conectar com o servidor.');
  }
}

// Botões para exportar e salvar
<button onClick={() => exportarExcel(historico)}>Exportar Excel</button>
<button onClick={() => exportarPDF(historico)}>Exportar PDF</button>
<button onClick={() => salvarNoGoogleSheets(dados)}>Salvar no Google Sheets</button>
