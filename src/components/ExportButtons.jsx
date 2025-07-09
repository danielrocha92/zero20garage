// src/components/ExportButtons.jsx
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'; // Certifique-se de ter 'jspdf' instalado: npm install jspdf

// URL do seu Google Apps Script Web App para salvar dados
const WEB_APP_URL = 'SUA_URL_DO_WEB_APP_GOOGLE_SCRIPT'; // Substitua pela sua URL real

const ExportButtons = ({ historico, currentOrcamentoData }) => {

  // Função para exportar para Excel
  const exportarExcel = (dados) => {
    if (!dados || dados.length === 0) {
      alert('Nenhum dado para exportar para Excel.');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(dados); // dados = array de objetos
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'orcamentos.xlsx');
    alert('Dados exportados para Excel com sucesso!');
  };

  // Função para exportar para PDF
  const exportarPDF = (dados) => {
    if (!dados || dados.length === 0) {
      alert('Nenhum dado para exportar para PDF.');
      return;
    }
    const doc = new jsPDF();
    doc.text('Histórico de Orçamentos', 10, 10);

    let yPos = 20;
    dados.forEach((h, i) => {
      // Verifica se há espaço suficiente para a próxima linha
      if (yPos > 280) { // Aproximadamente o final da página A4
        doc.addPage();
        yPos = 10; // Reinicia a posição Y na nova página
      }
      doc.text(
        `${i + 1}. [${h.data}] Tipo: ${h.tipo} | Cliente: ${h.nome} | Valor Total: R$ ${h.valorTotal}`,
        10,
        yPos
      );
      yPos += 10; // Incrementa para a próxima linha
    });
    doc.save('orcamentos.pdf');
    alert('Dados exportados para PDF com sucesso!');
  };

  // Função para salvar no Google Sheets
  const salvarNoGoogleSheets = async (dados) => {
    if (!dados) {
      alert('Nenhum dado para salvar no Google Sheets.');
      return;
    }
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
        alert(`Erro ao enviar para o Google Sheets: ${result.message || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor Google Sheets:', err);
      alert('Erro ao conectar com o servidor Google Sheets. Verifique a URL e sua conexão.');
    }
  };

  return (
    <div className="export-buttons-container">
      {/* Botões para exportar e salvar */}
      <button onClick={() => exportarExcel(historico)} className="action-btn">Exportar Excel</button>
      <button onClick={() => exportarPDF(historico)} className="action-btn">Exportar PDF</button>
      {/* O botão "Salvar no Google Sheets" provavelmente deve salvar o orçamento atual, não o histórico inteiro */}
      <button onClick={() => salvarNoGoogleSheets(currentOrcamentoData)} className="action-btn">Salvar no Google Sheets</button>
    </div>
  );
};

export default ExportButtons;