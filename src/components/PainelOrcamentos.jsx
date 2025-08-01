// src/components/PainelOrcamentos.jsx
import React, { useState, useEffect, useCallback } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import './PainelOrcamentos.css';

// URL BASE da sua API Node.js/Firebase no Render
// ATENÇÃO: SUBSTITUA ESTA URL PELA URL REAL DO SEU DEPLOY NO RENDER!
const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com'; // Use a URL do seu deploy da API

/**
 * Componente PainelOrcamentos
 * Gerencia a criação, visualização, edição e exportação de orçamentos.
 */
const PainelOrcamentos = () => {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);

  const showMessageBox = (msg, isError = false) => {
    setMessage(msg);
    setShowMessage(true);
  };

  const hideMessageBox = () => {
    setShowMessage(false);
    setMessage('');
  };

  /**
   * Busca o histórico de orçamentos do backend.
   * Atualiza o estado 'historico' com os dados recebidos.
   * Envolvido em useCallback para evitar re-criação desnecessária e resolver aviso do ESLint.
   */
  const fetchHistorico = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orcamentos`);
      const data = await response.json();
      setHistorico(data);
    } catch (error) {
      console.error('Erro ao buscar histórico no PainelOrcamentos:', error);
      showMessageBox('Erro ao carregar histórico de orçamentos.', true);
    }
  }, [setHistorico]); // <--- REMOVIDO API_BASE_URL daqui

  // Efeito para buscar o histórico de orçamentos quando o componente é montado.
  useEffect(() => {
    fetchHistorico();
  }, [fetchHistorico]);

  /**
   * Lida com o salvamento de um novo orçamento ou atualização de um existente.
   * Envia os dados para a API Node.js/Firebase.
   * @param {Object} dados - Os dados do orçamento a serem salvos/atualizados.
   */
  const handleSalvar = async (dados) => {
    const envio = {
      ...dados,
      tipo,
      data: new Date().toLocaleString('pt-BR'),
    };

    let url = `${API_BASE_URL}/api/orcamentos`;
    let method = 'POST';

    if (editingData && editingData.id) {
      url = `${API_BASE_URL}/api/orcamentos/${editingData.id}`;
      method = 'PUT';
      envio.id = editingData.id;
    }

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });

      const result = await res.json();

      if (res.ok) {
        showMessageBox(`Orçamento ${method === 'POST' ? 'criado' : 'atualizado'} com sucesso na API e Firestore.`);
        fetchHistorico(); // Re-busca o histórico após salvar/atualizar
      } else {
        const errorData = result.msg || 'Erro desconhecido ao salvar orçamento.';
        showMessageBox(`Erro ao salvar orçamento: ${errorData}`, true);
      }
    } catch (err) {
      console.error('Erro ao conectar com a API ou processar resposta:', err);
      showMessageBox('Erro ao conectar com o servidor da API. Tente novamente.', true);
    } finally {
      setEditingData(null);
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) {
      return showMessageBox('Nenhum dado para exportar.', true);
    }

    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Cliente: h.cliente || '',
      Veículo: h.veiculo || '',
      Placa: h.placa || '',
      Telefone: h.telefone || '',
      'Valor Total': h.valorTotal,
      'Peças': h.pecasSelecionadas?.join('; ') || '',
      'Serviços': h.servicosSelecionados?.join('; ') || '',
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
    if (historico.length === 0) {
      return showMessageBox('Nenhum dado para exportar.', true);
    }

    const doc = new jsPDF();
    let y = 20;

    historico.forEach(h => {
      doc.text(`Cliente: ${h.cliente || 'N/A'}`, 10, y);
      y += 10;
      doc.text(`Veículo: ${h.veiculo || 'N/A'}`, 10, y);
      y += 10;
      doc.text(`Valor Total: R$ ${Number(h.valorTotal || 0).toFixed(2)}`, 10, y);
      y += 10;
      doc.addPage();
      y = 20;
    });
    doc.save('painel-orcamentos-zero20.pdf');
  };

  const handleLogout = () => {
    console.log('Removendo authToken...');
    localStorage.removeItem('authToken');
    console.log('authToken removido. Novo valor:', localStorage.getItem('authToken'));
    console.log('Navegando para /orcamento...');
    navigate('/orcamento');
  };

  const handleEditarOrcamento = (orcamento) => {
    setEditingData(orcamento);
    setTipo(orcamento.tipo);
    setSelectedBudgetForView(null);
  };

  const handleViewBudget = (orcamento) => {
    setSelectedBudgetForView(orcamento);
  };

  const handleCloseView = () => {
    setSelectedBudgetForView(null);
  };

  return (
    <div className='painel-orcamentos-container'>
      {showMessage && (
        <div className="message-box">
          <span>{message}</span>
          <button onClick={hideMessageBox}>&times;</button>
        </div>
      )}
      {selectedBudgetForView ? (
        <OrcamentoImpresso orcamento={selectedBudgetForView} onClose={handleCloseView} />
      ) : (
        <>
          <h1 className='titulo-escuro'>Painel de Orçamentos</h1>
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
            <button onClick={handleLogout}>
              Sair
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
            onEditarOrcamento={handleEditarOrcamento}
            onViewBudget={handleViewBudget}
          />
        </>
      )}
    </div>
  );
};

export default PainelOrcamentos;
 