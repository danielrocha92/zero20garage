import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote'; // Certifique-se de que o caminho está correto
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto'; // Certifique-se de que o caminho está correto
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import "./PainelOrcamentos.css"; // CSS específico para este componente

const WEB_APP_URL = process.env.REACT_APP_GOOGLE_APPS_SCRIPT_URL; // Exemplo para Create React App

const PainelOrcamentos = () => {
  const [tipo, setTipo] = useState('motor'); // 'motor' ou 'cabecote'
  const [historico, setHistorico] = useState([]); // Armazena orçamentos salvos temporariamente

  const handleSalvar = async (dados) => {
    // Validação básica que já existia
    if (!dados.nome || !dados.valorTotal) {
      alert('Preencha o nome do cliente e o valor total do orçamento.');
      return;
    }

    const envio = {
      ...dados,
      tipo: tipo, // Garante que o tipo correto (motor ou cabecote) seja enviado
      data: new Date().toLocaleString('pt-BR'), // Formato da data
    };

    // Adiciona ao histórico local (temporário, pois não há persistência de estado aqui)
    setHistorico((prev) => [envio, ...prev]);

    // Lógica para enviar para o Google Sheets (seu backend, se usar o backend para isso)
    // Se você estiver enviando diretamente do frontend para o Google Apps Script,
    // o WEB_APP_URL está correto.
    try {
      // Se você tem um backend intermediário (Node.js), a URL seria a do seu backend
      // Exemplo: const res = await fetch('/api/orcamento', { ... });
      const res = await fetch(WEB_APP_URL, { // <--- Se for direto para o Google Apps Script
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });

      const result = await res.json();
      if (result.status === 'success') { // Adapte conforme a resposta do seu Google Apps Script
        alert('Orçamento enviado com sucesso para o Google Sheets.');
      } else {
        alert('Erro ao enviar para o Google Sheets.');
        console.error('Erro detalhado do Google Sheets:', result);
      }
    } catch (err) {
      console.error('Erro na conexão para enviar ao Google Sheets:', err);
      alert('Erro ao conectar com o servidor. Verifique sua conexão ou a URL do Google Sheets.');
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) return alert('Nenhum dado para exportar.');
    const ws = XLSX.utils.json_to_sheet(historico);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  const exportarPDF = () => {
    if (historico.length === 0) return alert('Nenhum dado para exportar.');
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Histórico de Orçamentos', 10, 10);
    // Adiciona um pequeno cabeçalho para as colunas na primeira página
    let yPos = 20;
    doc.text('Data | Tipo | Nome | Valor Total', 10, yPos);
    yPos += 5; // Espaçamento entre o cabeçalho e os dados

    historico.forEach((h, i) => {
      const text = `${h.data} | ${h.tipo} | ${h.nome} | R$ ${parseFloat(h.valorTotal).toFixed(2)}`;
      // Quebra de linha ou nova página se o texto for muito longo
      if (yPos > 280) { // Se ultrapassar a altura da página
        doc.addPage();
        yPos = 10; // Reinicia yPos na nova página
        doc.text('Histórico de Orçamentos (continuação)', 10, yPos);
        yPos += 10;
      }
      doc.text(text, 10, yPos);
      yPos += 10;
    });
    doc.save('painel-orcamentos.pdf');
  };

  return (
    <div className="painel-orcamentos-container"> {/* Adicione uma classe para estilização geral */}
      <h1 className='titulo-claro'>Painel de Orçamentos</h1>

      <h3 className='subititulo-claro'>
        Tipo de Orçamento:{' '}
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="select-tipo-orcamento">
          <option value="motor">Motor Completo</option>
          <option value="cabecote">Cabeçote</option>
        </select>
      </h3>

      <div className="orcamento-form-section"> {/* Seção para renderizar o formulário */}
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} />
        )}
      </div>

      <section className="historico-section">
        <h2>Histórico</h2>
        <div className="historico-buttons">
          <button onClick={exportarExcel} className="button">Exportar Excel</button>
          <button onClick={exportarPDF} className="button">Exportar PDF</button>
        </div>

        {historico.length === 0 ? (
          <p className="no-data-message">Nenhum orçamento salvo ainda.</p>
        ) : (
          <div className="historico-table-container">
            <table className="historico-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Nome</th>
                  <th>Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((h, idx) => (
                  <tr key={idx}>
                    <td>{h.data}</td>
                    <td>{h.tipo}</td>
                    <td>{h.nome}</td>
                    <td>R$ {parseFloat(h.valorTotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default PainelOrcamentos;