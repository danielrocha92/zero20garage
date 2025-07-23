import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import './PainelOrcamentos.css'; // Import the CSS file

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIrUxPxlq0R_wYNJYBV8gTk94L_obQ_cHlwnoCPCE3/dev';

const PainelOrcamentos = () => {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [editingData, setEditingData] = useState(null); // State for editing budget data

  const showMessageBox = (msg, isError = false) => {
    setMessage(msg);
    setShowMessage(true);
    // You could add a class for error messages here if needed
    // For example: if (isError) setMessageBoxClass('message-box error');
  };

  const hideMessageBox = () => {
    setShowMessage(false);
    setMessage('');
  };

  const handleSalvar = async (dados) => {
    const envio = {
      ...editingData, // Include editingData if present
      ...dados,
      tipo,
      data: new Date().toLocaleString('pt-BR'),
    };
    setHistorico((prev) => [envio, ...prev]);
    setEditingData(null); // Clear editing data after save
    try {
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });
      const result = await res.json();
      result.status === 'success'
        ? showMessageBox('Orçamento enviado com sucesso para o Google Sheets.')
        : showMessageBox('Erro ao enviar para o Google Sheets.', true);
    } catch (err) {
      console.error(err);
      showMessageBox('Erro ao conectar com o servidor. Tente novamente.', true);
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.', true);
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Cliente: h.cliente || '',
      Veículo: h.veiculo || '',
      Placa: h.placa || '',
      Telefone: h.telefone || '',
      'Valor Total': h.valorTotal,
      'Peças': h.detalhesPecas?.map(p => `${p.nome}`).join('; ') || '',
      'Serviços': h.detalhesServicos?.map(s => `${s.nome}`).join('; ') || '',
      Observações: h.observacoes || '',
      'Forma de Pagamento': h.formaPagamento || '',
      Garantia: h.garantia || '',
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  const exportarPDFCompleto = () => {
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.', true);
    const doc = new jsPDF();
    let y = 20;
    historico.forEach(h => {
      doc.text(`Cliente: ${h.cliente || 'N/A'}`, 10, y);
      y += 10;
      doc.text(`Veículo: ${h.veiculo || 'N/A'}`, 10, y);
      y += 10;
      doc.text(`Valor Total: R$ ${h.valorTotal}`, 10, y);
      y += 10;
      doc.addPage();
    });
    doc.save('painel-orcamentos-zero20.pdf');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/orcamento');
  };

  const handleEditarOrcamento = (orcamento) => {
    setEditingData(orcamento); // Load budget data into the form for editing
    setTipo(orcamento.tipo); // Switch type to match the budget being edited
  };

  return (
    <div className='painel-orcamentos-container'>
      {showMessage && (
        <div className="message-box">
          <span>{message}</span>
          <button onClick={hideMessageBox}>&times;</button>
        </div>
      )}

      <header className="painel-header">
        <h1>Painel de Orçamentos</h1>
        <button onClick={handleLogout}>
          Sair
        </button>
      </header>

      <nav className="tipo-orcamento-selector">
        <button
          onClick={() => setTipo('motor')}
          className={tipo === 'motor' ? 'active' : ''}
        >
          Orçamento Motor Completo
        </button>
        <button
          onClick={() => setTipo('cabecote')}
          className={tipo === 'cabecote' ? 'active' : ''}
        >
          Orçamento Cabeçote
        </button>
      </nav>

      <main className="orcamento-form-wrapper">
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} editingData={editingData} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} editingData={editingData} />
        )}
        <div className="historico-buttons-group">
          <button onClick={exportarExcel} className="action-btn">
            Exportar Todos para Excel
          </button>
          <button onClick={exportarPDFCompleto} className="action-btn">
            Exportar Todos para PDF
          </button>
        </div>
      </main>

      <HistoricoOrcamentos
        historico={historico}
        setHistorico={setHistorico}
        onEditarOrcamento={handleEditarOrcamento} // Pass editing function to HistoricoOrcamentos
      />
    </div>
  );
};

export default PainelOrcamentos;
