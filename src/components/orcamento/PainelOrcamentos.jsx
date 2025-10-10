  import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { FaCogs, FaTools, FaHistory, FaFileExcel, FaFilePdf, FaSignOutAlt } from 'react-icons/fa';

import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import CustomModal from './CustomModal';
import '../../styles/Modal.css';
import '../../styles/PainelOrcamentos.css';

const UploadImagemOrcamento = React.lazy(() => import('./UploadImagemOrcamento'));

const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com';

const PainelOrcamentos = () => {
  const navigate = useNavigate();
  const historicoRef = useRef(null);

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [messageData, setMessageData] = useState({ text: null, isError: false });
  const [editingData, setEditingData] = useState(null);
  const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [loadingHistorico, setLoadingHistorico] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  // --- Mensagem de feedback ---
  const showMessageBox = useCallback((text, isError = false, duration = 4000) => {
    setMessageData({ text, isError });
    setTimeout(() => {
      setMessageData({ text: null, isError: false });
    }, duration);
  }, [setMessageData]);

  const abrirModal = (config) => setModalConfig({ ...modalConfig, isOpen: true, ...config });
  const fecharModal = () => setModalConfig({ ...modalConfig, isOpen: false });


  // --- Fetch histórico ---
  const fetchHistorico = useCallback(async () => {
    if (loadingHistorico) return;
    setLoadingHistorico(true);

    let allOrcamentos = [];
    let currentPage = 1;
    let hasMorePages = true;

    try {
      while (hasMorePages) {
        const url = new URL(`${API_BASE_URL}/api/orcamentos?page=${currentPage}&limit=50`);
        const res = await axios.get(url.toString(), {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
        });

        const data = res.data;
        if (data.orcamentos && data.orcamentos.length > 0) {
          allOrcamentos.push(...data.orcamentos);
        }

        hasMorePages = data.hasMore || false;
        currentPage++;
      }

      // Ordena os orçamentos: mais novos primeiro, registros sem data por último.
      allOrcamentos.sort((a, b) => {
        const dateA = a.data ? new Date(a.data) : null;
        const dateB = b.data ? new Date(b.data) : null;

        if (!dateA && !dateB) return 0; // Ambos não têm data, mantém a ordem
        if (!dateA) return 1;          // 'a' não tem data, vai para o fim
        if (!dateB) return -1;         // 'b' não tem data, vai para o fim
        return dateB - dateA;          // Ordena do mais novo para o mais antigo
      });

      setHistorico(allOrcamentos);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      showMessageBox('Erro ao carregar histórico de orçamentos.', true);
    } finally {
      setLoadingHistorico(false);
    }
  }, [authToken, loadingHistorico, showMessageBox]);

  // Efeito para a busca inicial, roda apenas uma vez
  useEffect(() => {
    fetchHistorico(); // Busca inicial
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Salvar orçamento ---
  const handleSalvar = async (dados) => {
    const envio = { ...dados, tipo, data: new Date().toISOString() };
    let url = `${API_BASE_URL}/api/orcamentos`;
    let method = 'POST';

    if (editingData?.id) {
      url = `${API_BASE_URL}/api/orcamentos/${editingData.id}`;
      method = 'PUT';
      envio.id = editingData.id;
    }

    try {
      const res = await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json', ...(authToken && { Authorization: `Bearer ${authToken}` }) },
        data: envio,
      });
      const result = res.data;

      if (res.status === 200 || res.status === 201) {
        showMessageBox(`Orçamento ${method === 'POST' ? 'criado' : 'atualizado'} com sucesso.`);
        fetchHistorico(); // Recarrega o histórico do início
        setEditingData(null);
      } else {
        showMessageBox(`Erro ao salvar: ${result.msg || 'Erro desconhecido'}`, true);
      }
    } catch (err) {
      console.error('Erro ao conectar com a API:', err);
      showMessageBox('Erro ao conectar com o servidor.', true);
    } finally {
      setEditingData(null);
    }
  };

  // --- Exportar Excel ---
  const exportarExcel = () => {
    if (!historico.length) return showMessageBox('Nenhum dado para exportar.', true);
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Cliente: h.cliente || '',
      Veículo: h.veiculo || '',
      Placa: h.placa || '',
      Telefone: h.telefone || '',
      'Valor Total': h.valorTotal,
      'Peças': h.pecasSelecionadas?.join('; ') || '',
      'Serviços': h.servicosSelecionadas?.join('; ') || '',
      Observações: h.observacoes || '',
      'Forma de Pagamento': h.formaPagamento || '',
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  // --- Exportar PDF contínuo ---
  const exportarPDFCompleto = async () => {
    if (!historico.length) return showMessageBox('Nenhum dado para exportar.', true);
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

      const imagemUrl = orcamento?.imagens?.[0]?.url || null;
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

  // --- NOVO: Função para atualizar as imagens após upload/exclusão ---
  const handleImagesUpdated = useCallback((updatedImages) => {
    // Atualiza o estado de edição para refletir a nova lista de imagens
    if (editingData) {
      setEditingData(prev => ({ ...prev, imagens: updatedImages }));
    }

    // Atualiza o histórico para que a lista seja recarregada em tempo real
    setHistorico(prevHistorico => {
      const index = prevHistorico.findIndex(item => item.id === editingData?.id || item._id === editingData?._id);
      if (index > -1) {
        const novoHistorico = [...prevHistorico];
        novoHistorico[index] = { ...novoHistorico[index], imagens: updatedImages };
        return novoHistorico;
      }
      return prevHistorico;
    });
  }, [editingData]);

  const handleExcluirOrcamento = (orcamento) => {
    abrirModal({
      title: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir o orçamento de ${orcamento.cliente || 'cliente desconhecido'} (OS: ${orcamento.ordemServico || '-'})?`,
      confirmText: 'Sim, Excluir', showCancel: true,
      onConfirm: async () => {
        fecharModal();
        try {
          await axios.delete(`${API_BASE_URL}/api/orcamentos/${orcamento.id || orcamento._id}`, {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
          });
          setHistorico(prev => prev.filter(h => (h.id || h._id) !== (orcamento.id || orcamento._id)));
          showMessageBox('Orçamento excluído com sucesso!');
        } catch (err) {
          console.error('Erro ao excluir orçamento:', err);
          let mensagemErro = 'Erro ao excluir orçamento.';
          if (err.response?.data?.erro) mensagemErro += ` Detalhes: ${err.response.data.erro}`;
          else if (err.message) mensagemErro += ` (${err.message})`;
          showMessageBox(mensagemErro, true);
        }
      },
      onCancel: fecharModal,
    });
  };

  const filteredHistorico = historico.filter(orcamento => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();

    const dataFormatada = orcamento.data ? new Date(orcamento.data).toLocaleDateString('pt-BR') : '';

    return (
      orcamento.ordemServico?.toLowerCase().includes(term) ||
      orcamento.cliente?.toLowerCase().includes(term) ||
      orcamento.veiculo?.toLowerCase().includes(term) ||
      orcamento.placa?.toLowerCase().includes(term) ||
      orcamento.telefone?.toLowerCase().includes(term) ||
      dataFormatada.includes(term)
    );
  });


  return (
    <div className="painel-orcamentos-container">
      {messageData.text && (
        <div className="modal-overlay" onClick={() => setMessageData({ text: null, isError: false })}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: messageData.isError ? '#c50404' : '#4caf50' }}>{messageData.isError ? 'Erro' : 'Sucesso'}</h3>
            <p>{messageData.text}</p>
            <div className="modal-actions">
              <button onClick={() => setMessageData({ text: null, isError: false })} className="modal-btn confirm">Fechar</button>
            </div>
          </div>
        </div>
      )}

      <CustomModal {...modalConfig} />

      {selectedBudgetForView ? (
        <OrcamentoImpresso orcamento={selectedBudgetForView} onClose={handleCloseView} />
      ) : (
        <>
          <h1 className="titulo-escuro">Painel de Orçamentos</h1>

          <div className="highlight-card">
            <h2 className="titulo-escuro">Novo Orçamento</h2>
            {/* Cards principais */}
            <div className="highlight-item">
              <div className="cards-container">
                <div className={`card-option ${tipo === 'motor' ? 'active' : ''}`} onClick={() => { setTipo('motor'); setEditingData(null); }}>
                  <FaCogs size={40} />
                  <span>Orçamento Motor Completo</span>
                </div>
                <div className={`card-option ${tipo === 'cabecote' ? 'active' : ''}`} onClick={() => { setTipo('cabecote'); setEditingData(null); }}>
                  <FaTools size={40} />
                  <span>Orçamento Cabeçote</span>
                </div>
                <div className="card-option" onClick={scrollToHistorico}>
                  <FaHistory size={40} />
                  <span>Histórico de Orçamentos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="highlight-card">
            <h2 className="titulo-escuro">Ações</h2>
            {/* Cards de exportação e logout */}
            <div className="highlight-item">
              <div className="cards-container">
                <div className="card-option" onClick={exportarExcel}>
                  <FaFileExcel size={40} color="green" />
                  <span>Exportar Excel</span>
                </div>
                <div className="card-option" onClick={exportarPDFCompleto}>
                  <FaFilePdf size={40} color="red" />
                  <span>Exportar PDF</span>
                </div>
                <div className="card-option" onClick={handleLogout}>
                  <FaSignOutAlt size={40} color="gray" />
                  <span>Sair</span>
                </div>
              </div>
            </div>
          </div>

          <main className="orcamento-form-wrapper" id="orcamento-form">
            {tipo === 'motor'
              ? <OrcamentoMotorCompleto
                  onSubmit={handleSalvar}
                  editingData={editingData}
                  showMessage={showMessageBox}
                  hideMessageBox={() => setMessageData({ text: null, isError: false })}
                />
              : <OrcamentoCabecote
                  onSubmit={handleSalvar}
                  editingData={editingData}
                  showMessage={showMessageBox}
                  hideMessageBox={() => setMessageData({ text: null, isError: false })}
                />
            }

            <Suspense fallback={<div>Carregando upload de imagem...</div>}>
              <UploadImagemOrcamento
                orcamentoId={editingData?.id || editingData?._id}
                authToken={authToken}
                apiBaseUrl={API_BASE_URL}
                // Conecta o componente de upload à nova função de atualização
                onUploaded={handleImagesUpdated}
              />
            </Suspense>
          </main>

          <div ref={historicoRef}>
            <HistoricoOrcamentos
              historico={filteredHistorico}
              onEditarOrcamento={handleEditarOrcamento}
              onViewBudget={handleViewBudget}
              onExcluirOrcamento={handleExcluirOrcamento}
              loading={loadingHistorico}
              fetchMore={() => {}} // Função vazia, pois não há mais "carregar mais"
              hasMore={false}
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PainelOrcamentos;