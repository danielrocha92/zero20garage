import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIrUxPxlq0R_wYNJYBV8gTk94L_obQ_cHlwnoCPCE3/dev';

const PainelOrcamentos = () => {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [editingData, setEditingData] = useState(null); // State for editing budget data

  const showMessageBox = (msg) => {
    setMessage(msg);
    setShowMessage(true);
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
        : showMessageBox('Erro ao enviar para o Google Sheets.');
    } catch (err) {
      console.error(err);
      showMessageBox('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.');
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
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.');
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
    <div className='painel-orcamentos-container bg-gray-50 min-h-screen p-8 font-sans'>
      {showMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between animate-fade-in-down">
          <span>{message}</span>
          <button onClick={hideMessageBox} className="ml-4 text-white font-bold text-xl">&times;</button>
        </div>
      )}

      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Painel de Orçamentos</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md"
        >
          Sair
        </button>
      </header>

      <nav className="mb-8 flex justify-center space-x-6">
        <button
          onClick={() => setTipo('motor')}
          className={`py-3 px-8 rounded-full font-semibold text-lg transition ${
            tipo === 'motor' ? 'bg-blue-600 text-white' : 'bg-white text-blue-800 border'
          }`}
        >
          Orçamento Motor Completo
        </button>
        <button
          onClick={() => setTipo('cabecote')}
          className={`py-3 px-8 rounded-full font-semibold text-lg transition ${
            tipo === 'cabecote' ? 'bg-blue-600 text-white' : 'bg-white text-blue-800 border'
          }`}
        >
          Orçamento Cabeçote
        </button>
      </nav>

      <main className="bg-white p-8 rounded-lg shadow-xl mb-8">
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} editingData={editingData} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} editingData={editingData} />
        )}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={exportarExcel}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md"
          >
            Exportar Todos para Excel
          </button>
          <button
            onClick={exportarPDFCompleto}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md"
          >
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