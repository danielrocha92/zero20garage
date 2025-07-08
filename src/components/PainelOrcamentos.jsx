import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import "./PainelOrcamentos.css"; // CSS específico para este componente
import { useNavigate } from 'react-router-dom';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxmLpnlvPQV77Rs4jG8pLh_uSTi-xq5LqGod-ykpgYxJ9Y9pRlI7pOgdgjsMs4qSTU6Jw/exec';

const PainelOrcamentos = () => {
  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);

  const handleSalvar = async (dados) => {
    if (!dados.nome || !dados.valorTotal) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const envio = {
      ...dados,
      tipo,
      data: new Date().toLocaleString('pt-BR'),
    };

    setHistorico((prev) => [envio, ...prev]);

    try {
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });

      const result = await res.json();
      if (result.status === 'success') {
        alert('Orçamento enviado com sucesso para o Google Sheets.');
      } else {
        alert('Erro ao enviar para o Google Sheets.');
        console.error(result);
      }
    } catch (err) {
      console.error('Erro na conexão com Google Sheets:', err);
      alert('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) return alert('Nenhum dado para exportar.');
    // Flatten para Excel: pega só os campos principais e concatena detalhes
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Nome: h.nome,
      'Valor Total': h.valorTotal,
      'Peças': h.detalhesPecas
        ? h.detalhesPecas.map(p => `${p.nome} (Qtd: ${p.quantidade}, Vlr: ${p.valorUnitario}, Total: ${p.total})`).join('; ')
        : '',
      'Serviços': h.detalhesServicos
        ? h.detalhesServicos.map(s => `${s.nome} (Vlr: ${s.valor}, Total: ${s.total})`).join('; ')
        : '',
      'Forma de Pagamento': h.formaPagamento || '',
      Garantia: h.garantia || ''
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  const exportarPDF = () => {
    if (historico.length === 0) return alert('Nenhum dado para exportar.');
    const doc = new jsPDF();
    doc.setFontSize(12);
    let y = 10;
    historico.forEach((h, i) => {
      doc.text(`Orçamento #${i + 1}`, 10, y);
      y += 8;
      doc.text(`Data: ${h.data} | Tipo: ${h.tipo}`, 10, y);
      y += 8;
      doc.text(`Nome: ${h.nome} | Valor Total: R$ ${parseFloat(h.valorTotal).toFixed(2)}`, 10, y);
      y += 8;
      if (h.detalhesPecas && h.detalhesPecas.length > 0) {
        doc.text('Peças:', 10, y);
        y += 7;
        h.detalhesPecas.forEach((p) => {
          doc.text(
            `- ${p.nome} | Qtd: ${p.quantidade} | Valor: R$ ${parseFloat(p.valorUnitario).toFixed(2)} | Total: R$ ${parseFloat(p.total).toFixed(2)}`,
            12,
            y
          );
          y += 7;
          if (p.subItens && p.subItens.length > 0) {
            p.subItens.forEach((sub) => {
              doc.text(`   • ${sub}`, 16, y);
              y += 6;
            });
          }
        });
      }
      if (h.detalhesServicos && h.detalhesServicos.length > 0) {
        doc.text('Serviços:', 10, y);
        y += 7;
        h.detalhesServicos.forEach((s) => {
          doc.text(
            `- ${s.nome} | Valor: R$ ${parseFloat(s.valor).toFixed(2)} | Total: R$ ${parseFloat(s.total).toFixed(2)}`,
            12,
            y
          );
          y += 7;
          if (s.subItens && s.subItens.length > 0) {
            s.subItens.forEach((sub) => {
              doc.text(`   • ${sub}`, 16, y);
              y += 6;
            });
          }
        });
      }
      y += 10;
      // Quebra de página se necessário
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save('painel-orcamentos.pdf');
  };

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('authToken'); // Remove o token de autenticação
  navigate('/orcamento'); // Redireciona para a página de orçamento do cliente
};


  return (
    <div className='painel-orcamentos-container'>
      <h1 className='titulo-claro'>Painel de Orçamentos</h1>
      <div className="painel-header">
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </div>

      <h3 className='subtitulo-claro'>
        Tipo de Orçamento:{' '}
        <div className='tipo-orcamento-selector'>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="motor">Motor Completo</option>
            <option value="cabecote">Cabeçote</option>
          </select>
        </div>
      </h3>

      <div className='orcamento-form-wrapper'>
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} />
        )}
      </div>

      <section className='historico-section'>
        <h2>Histórico</h2>
        <div className='historico-buttons-group'>
          <button onClick={exportarExcel} className='action-btn'>Exportar Excel</button>
          <button onClick={exportarPDF} className='action-btn'>
            Exportar PDF
          </button>
        </div>

        {historico.length === 0 ? (
          <p className='no-historico-message'>Nenhum orçamento salvo ainda.</p>
        ) : (
          <table className='historico-table'>
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
        )}
      </section>
    </div>
  );
};

export default PainelOrcamentos;