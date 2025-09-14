import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import './PainelOrcamentos.css';

const UploadImagemOrcamento = React.lazy(() => import('./UploadImagemOrcamento'));

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PainelOrcamentos = () => {
  const navigate = useNavigate();
  const historicoRef = useRef(null);

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  // --- Mensagem de feedback ---
  const showMessageBox = (msg, duration = 4000) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), duration);
  };

  // --- Fetch histórico ---
  const fetchHistorico = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orcamentos`, {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      });
      const data = await res.json();
      setHistorico(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      showMessageBox('Erro ao carregar histórico de orçamentos.');
    }
  }, [authToken]);

  useEffect(() => {
    fetchHistorico();
  }, [fetchHistorico]);

  // --- Salvar orçamento ---
  const handleSalvar = async (dados) => {
    const envio = { ...dados, tipo, data: new Date().toLocaleString('pt-BR') };
    let url = `${API_BASE_URL}/api/orcamentos`;
    let method = 'POST';

    if (editingData?.id) {
      url = `${API_BASE_URL}/api/orcamentos/${editingData.id}`;
      method = 'PUT';
      envio.id = editingData.id;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...(authToken && { Authorization: `Bearer ${authToken}` }) },
        body: JSON.stringify(envio),
      });
      const result = await res.json();

      if (res.ok) {
        showMessageBox(`Orçamento ${method === 'POST' ? 'criado' : 'atualizado'} com sucesso.`);
        fetchHistorico();
        setEditingData(null);
      } else {
        showMessageBox(`Erro ao salvar: ${result.msg || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      showMessageBox('Erro ao conectar com o servidor.');
    } finally {
      setEditingData(null);
    }
  };

  // --- Exportar Excel ---
  const exportarExcel = () => {
    if (!historico.length) return showMessageBox('Nenhum dado para exportar.');
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
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  // --- Exportar PDF ---
  const exportarPDFCompleto = async () => {
    if (!historico.length) return showMessageBox('Nenhum dado para exportar.');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const contentWidth = pdfWidth - margin * 2;

    for (let i = 0; i < historico.length; i++) {
      const orcamento = historico[i];
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = `${contentWidth}mm`;
      tempDiv.style.padding = '10mm';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);

      const imagemUrl = orcamento?.imagem?.url || orcamento?.imageUrl || orcamento?.imagemUrl || null;

      tempDiv.innerHTML = `
        <div class="orcamento-impresso-content">
          <h1>ORÇAMENTO - ${orcamento.tipo === 'motor' ? 'MOTOR' : 'CABEÇOTE'}</h1>
          ${imagemUrl ? `<img src="${imagemUrl}" crossorigin="anonymous" style="max-width:100%; max-height:300px;" />` : ''}
        </div>
      `;

      await new Promise(resolve => setTimeout(resolve, 50));

      try {
        const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * contentWidth) / canvas.width;
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, imgHeight);
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
      } finally {
        document.body.removeChild(tempDiv);
      }
    }
    pdf.save('historico-orcamentos-zero20.pdf');
    showMessageBox('PDF do histórico gerado com sucesso!');
  };

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/orcamento');
  };

  // --- Edição ---
  const handleEditarOrcamento = (orcamento) => {
    setEditingData(orcamento);
    setTipo(orcamento.tipo === 'cabecote' ? 'cabecote' : 'motor');
    setSelectedBudgetForView(null);
    setTimeout(() => document.getElementById('orcamento-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // --- Visualização ---
  const handleViewBudget = (orcamento) => setSelectedBudgetForView(orcamento);
  const handleCloseView = () => setSelectedBudgetForView(null);
  const scrollToHistorico = () => historicoRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="painel-orcamentos-container">
      {showMessage && (
        <div className="message-box">
          <span>{message}</span>
          <button onClick={() => setShowMessage(false)}>&times;</button>
        </div>
      )}

      {selectedBudgetForView ? (
        <OrcamentoImpresso orcamento={selectedBudgetForView} onClose={handleCloseView} />
      ) : (
        <>
          <h1 className="titulo-escuro">Painel de Orçamentos</h1>

          <nav className="tipo-orcamento-selector">
            <button onClick={() => { setTipo('motor'); setEditingData(null); }} className={tipo === 'motor' ? 'active' : 'button'}>Orçamento Motor Completo</button>
            <button onClick={() => { setTipo('cabecote'); setEditingData(null); }} className={tipo === 'cabecote' ? 'active' : 'button'}>Orçamento Cabeçote</button>
            <button onClick={scrollToHistorico} className="button">Histórico de Orçamentos</button>
          </nav>

          <nav className="tipo-orcamento-selector">
            <button onClick={exportarExcel} className="button">Exportar Todos para Excel</button>
            <button onClick={exportarPDFCompleto} className="button">Exportar Todos para PDF</button>
            <button className="button" onClick={handleLogout}>Sair</button>
          </nav>

          <main className="orcamento-form-wrapper" id="orcamento-form">
            {tipo === 'motor'
              ? <OrcamentoMotorCompleto onSubmit={handleSalvar} editingData={editingData} />
              : <OrcamentoCabecote onSubmit={handleSalvar} editingData={editingData} />
            }

            <Suspense fallback={<div>Carregando upload de imagem...</div>}>
              <UploadImagemOrcamento
                orcamentoId={editingData?.id}
                authToken={authToken}
                onUploaded={(imgs) => {
                  if (editingData) setEditingData(prev => prev ? { ...prev, imagens: imgs } : prev);
                  fetchHistorico();
                }}
              />
            </Suspense>
          </main>

          <div ref={historicoRef}>
            <HistoricoOrcamentos
              onEditarOrcamento={handleEditarOrcamento}
              onViewBudget={handleViewBudget}
              authToken={authToken}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PainelOrcamentos;
