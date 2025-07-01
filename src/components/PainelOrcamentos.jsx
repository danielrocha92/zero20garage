import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxmLpnlvPQV77Rs4jG8pLh_uSTi-xq5LqGod-ykpgYxJ9Y9pRlI7pOgdgjsMs4qSTU6Jw/exec';

const PainelOrcamentos = () => {
  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);

  const handleSalvar = async (dados) => {
    const envio = { ...dados, tipo, data: new Date().toLocaleString('pt-BR') };

    setHistorico((prev) => [envio, ...prev]);

    try {
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });
      const result = await res.json();
      console.log('Google Sheets:', result);
    } catch (err) {
      console.error('Erro Sheets', err);
    }
  };

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(historico);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Histórico de Orçamentos', 10, 10);
    historico.forEach((h, i) => {
      doc.text(
        `${i + 1}. [${h.data}] Tipo: ${h.tipo} | Nome: ${h.nome} | Valor: ${h.valorTotal}`,
        10,
        20 + i * 10
      );
    });
    doc.save('painel-orcamentos.pdf');
  };

  return (
    <div>
      <h1>Painel de Orçamentos</h1>

      <label>
        Tipo de Orçamento:{' '}
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="motor">Motor Completo</option>
          <option value="cabecote">Cabeçote</option>
        </select>
      </label>

      <div style={{ marginTop: '1.5rem' }}>
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} />
        )}
      </div>

      <section style={{ marginTop: '2rem' }}>
        <h2>Histórico</h2>
        <button onClick={exportarExcel}>Exportar Excel</button>
        <button onClick={exportarPDF} style={{ marginLeft: '0.5rem' }}>
          Exportar PDF
        </button>

        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
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
                <td>R$ {h.valorTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PainelOrcamentos;