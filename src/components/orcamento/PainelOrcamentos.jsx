import React, { useState, useEffect, useCallback, useRef, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { FaCogs, FaTools, FaHistory, FaFileExcel, FaFilePdf, FaSignOutAlt } from 'react-icons/fa';

import OrcamentoCabecote from './OrcamentoCabecote';
import MessageBox from '../ui/MessageBox';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import CustomModal from './CustomModal';
import '../../styles/Modal.css';
import '../../styles/PainelOrcamentos.css';

const UploadImagemOrcamento = React.lazy(() => import('./UploadImagemOrcamento'));

const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com';
const PAGE_LIMIT = 50;

const PainelOrcamentos = () => {
    const navigate = useNavigate();
    const historicoRef = useRef(null);
    const formRef = useRef(null);

    const [tipo, setTipo] = useState('motor');
    const [historico, setHistorico] = useState([]);
    const [messageData, setMessageData] = useState({ text: null, isError: false });
    const [editingData, setEditingData] = useState(null);
    const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [loadingHistorico, setLoadingHistorico] = useState(false);
    const [modalConfig, setModalConfig] = useState({ isOpen: false });

    // 1. TROCAMOS O ESTADO DE PÁGINA PARA CURSOR
    const [nextCursor, setNextCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    const showMessageBox = useCallback((text, isError = false, duration = 4000) => {
        setMessageData({ text, isError });
        setTimeout(() => {
            setMessageData({ text: null, isError: false });
        }, duration);
    }, []);

    const abrirModal = (config) => setModalConfig({ isOpen: true, ...config });
    const fecharModal = () => setModalConfig({ isOpen: false });

    // 2. AJUSTAMOS A FUNÇÃO DE BUSCA PARA USAR O CURSOR
    const fetchHistorico = useCallback(async (isInitialLoad = false) => {
        if (!isInitialLoad && !hasMore) return;
        setLoadingHistorico(true);

        if (isInitialLoad) {
            setHistorico([]);
        }

        try {
            // Constrói a URL dinamicamente
            let url = `${API_BASE_URL}/api/orcamentos?limit=${PAGE_LIMIT}`;
            if (!isInitialLoad && nextCursor) {
                url += `&startAfter=${nextCursor}`;
            }

            const res = await axios.get(url, {
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
            });

            // 3. PROCESSA A RESPOSTA DA API COM CURSOR
            const { orcamentos: novosOrcamentos, nextCursor: newNextCursor } = res.data;

            if (novosOrcamentos && novosOrcamentos.length > 0) {
                setHistorico(prev => isInitialLoad ? novosOrcamentos : [...prev, ...novosOrcamentos]);
            }

            // Atualiza o cursor para a próxima busca e controla se há mais itens
            setNextCursor(newNextCursor);
            setHasMore(newNextCursor !== null);

        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
            showMessageBox('Erro ao carregar histórico de orçamentos.', true);
        } finally {
            setLoadingHistorico(false);
        }
    }, [authToken, showMessageBox, nextCursor, hasMore]); // Dependência atualizada para 'nextCursor'

    useEffect(() => {
        fetchHistorico(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSalvar = async (dados) => {
        console.log("Salvando orçamento com os seguintes dados:", dados);
        const envio = { ...dados, tipo };
        let url = `${API_BASE_URL}/api/orcamentos`;
        let method = 'POST';

        if (editingData?.id || editingData?._id) {
            const id = editingData.id || editingData._id;
            url = `${API_BASE_URL}/api/orcamentos/${id}`;
            method = 'PUT';
            envio.id = id;
            // Ao editar, usa a data que vem do formulário (dados.data).
            // A conversão e o tratamento de fuso horário agora são feitos no backend.
            envio.data = dados.data;
        } else {
            // Para novos orçamentos, a data de criação é definida pelo backend.
            // O campo 'ordemServico' é enviado para ser usado como ID do documento.
            envio.ordemServico = dados.ordemServico;
            envio.data = new Date().toISOString(); // Adiciona a data atual para novos orçamentos
        }

        try {
            const response = await axios({
                method,
                url,
                headers: { 'Content-Type': 'application/json', ...(authToken && { Authorization: `Bearer ${authToken}` }) },
                data: envio,
            });

            console.log("Resposta da API:", response);

            showMessageBox(`Orçamento ${method === 'POST' ? 'criado' : 'atualizado'} com sucesso.`);
            fetchHistorico(true); // Recarrega tudo do início
            setEditingData(null);

        } catch (err) {
            console.error('Erro ao conectar com a API:', err);
            if (err.response) {
                console.error("Dados da resposta do erro:", err.response.data);
                console.error("Status da resposta do erro:", err.response.status);
            }
            const errorMsg = err.response?.data?.msg || 'Erro ao conectar com o servidor.';
            showMessageBox(errorMsg, true);
        } finally {
            setEditingData(null);
        }
    };

    // --- O restante do seu código (exportarExcel, PDF, etc.) permanece o mesmo ---
    const exportarExcel = () => {
        if (!historico.length) return showMessageBox('Nenhum dado para exportar.', true);
        const excelData = historico.map(h => ({
          Data: h.data ? new Date(h.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '',
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

          const imageUrl = orcamento?.imagens?.[0]?.url || null;
          tempDiv.innerHTML = `
              <div class="orcamento-impresso-content">
                <h1>ORÇAMENTO - ${orcamento.tipo === 'motor' ? 'MOTOR' : 'CABEÇOTE'}</h1>
                <p><strong>Cliente:</strong> ${orcamento.cliente || 'N/A'}</p>
                <p><strong>Veículo:</strong> ${orcamento.veiculo || 'N/A'}</p>
                <p><strong>Valor:</strong> R$ ${orcamento.valorTotal?.toFixed(2) || '0.00'}</p>
                ${imageUrl ? `<img src="${imageUrl}" crossorigin="anonymous" style="max-width:100%; height:auto;" />` : ''}
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
        pdf.save('historico-orcamentos-completo.pdf');
        showMessageBox('PDF do histórico gerado com sucesso!');
      };

      const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/orcamento');
      };

      const handleEditarOrcamento = (orcamento) => {
        setTipo(orcamento.tipo === 'cabecote' ? 'cabecote' : 'motor');
        setSelectedBudgetForView(null);
        setEditingData(orcamento);
      };

      useEffect(() => {
        if (editingData && formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, [editingData]);

      const handleViewBudget = (orcamento) => setSelectedBudgetForView(orcamento);
      const handleCloseView = () => setSelectedBudgetForView(null);
      const scrollToHistorico = () => historicoRef.current?.scrollIntoView({ behavior: 'smooth' });

      const handleImagesUpdated = useCallback((orcamentoId, updatedImages) => {
        if (editingData && (editingData.id === orcamentoId || editingData._id === orcamentoId)) {
          setEditingData(prev => ({ ...prev, imagens: updatedImages }));
        }
        setHistorico(prevHistorico => {
          return prevHistorico.map(item => {
            if (item.id === orcamentoId || item._id === orcamentoId) {
              return { ...item, imagens: updatedImages };
            }
            return item;
          });
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
              const id = orcamento.id || orcamento._id;
              await axios.delete(`${API_BASE_URL}/api/orcamentos/${id}`, {
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
              });
              setHistorico(prev => prev.filter(h => (h.id || h._id) !== id));
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


    const [sortConfig, setSortConfig] = useState({ key: 'ordemServico', direction: 'descending' });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            if (mobile !== isMobile) {
                setIsMobile(mobile);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            setSortConfig({ key: 'ordemServico', direction: 'descending' });
        }
    }, [isMobile]);


      const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredHistorico = useMemo(() => {
        let sortableItems = [...historico];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (sortConfig.key === 'valorTotal' || sortConfig.key === 'ordemServico') {
                    const numA = Number(aValue) || 0;
                    const numB = Number(bValue) || 0;
                    if (numA < numB) return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (numA > numB) return sortConfig.direction === 'ascending' ? 1 : -1;
                    return 0;
                }

                if (sortConfig.key === 'data') {
                    const dateA = aValue ? new Date(aValue) : null;
                    const dateB = bValue ? new Date(bValue) : null;
                    if (!dateA && !dateB) return 0;
                    if (!dateA) return 1;
                    if (!dateB) return -1;
                    if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
                    return 0;
                }

                const stringA = String(aValue || '').toLowerCase();
                const stringB = String(bValue || '').toLowerCase();
                if (stringA < stringB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (stringA > stringB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        return sortableItems.filter(orcamento => {
            if (!searchTerm) return true;
            const term = searchTerm.toLowerCase();
            const dataFormatada = orcamento.data ? new Date(orcamento.data).toLocaleDateString('pt-BR') : '';

            return Object.values(orcamento).some(value =>
                String(value).toLowerCase().includes(term)
            ) || dataFormatada.includes(term);
        });
    }, [historico, sortConfig, searchTerm]);

    return (
        <>
            {messageData.text && (
                <MessageBox
                    message={messageData.text}
                    isError={messageData.isError}
                    onClose={() => setMessageData({ text: null, isError: false })}
                />
            )}
            <div className="painel-orcamentos-container">
                <CustomModal {...modalConfig} />

                {selectedBudgetForView ? (
                    <OrcamentoImpresso orcamento={selectedBudgetForView} onClose={handleCloseView} />
                ) : (
                    <>
                        <h1 className="titulo-escuro">Painel de Orçamentos</h1>

                        <div className="highlight-card">
                            <h2 className="titulo-escuro">Novo Orçamento</h2>
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

                        <main className="orcamento-form-wrapper" ref={formRef} id="orcamento-form">
                            {tipo === 'motor'
                                ? <OrcamentoMotorCompleto
                                    onSubmit={handleSalvar}
                                    editingData={editingData}
                                    showMessage={showMessageBox}
                                />
                                : <OrcamentoCabecote
                                    onSubmit={handleSalvar}
                                    editingData={editingData}
                                    showMessage={showMessageBox}
                                />
                            }

                            {editingData && (
                                <Suspense fallback={<div>Carregando upload de imagem...</div>}>
                                    <UploadImagemOrcamento
                                        orcamentoId={editingData?.id || editingData?._id}
                                        initialImages={editingData?.imagens || []}
                                        authToken={authToken}
                                        apiBaseUrl={API_BASE_URL}
                                        onUploaded={handleImagesUpdated}
                                        showMessage={showMessageBox}
                                    />
                                </Suspense>
                            )}
                        </main>

                        <div ref={historicoRef} />
                        <HistoricoOrcamentos
                            historico={sortedAndFilteredHistorico}
                            onEditarOrcamento={handleEditarOrcamento}
                            onViewBudget={handleViewBudget}
                            onExcluirOrcamento={handleExcluirOrcamento}
                            loading={loadingHistorico}
                            searchTerm={searchTerm}
                            onSearchChange={(e) => setSearchTerm(e.target.value)}
                            requestSort={requestSort}
                            sortConfig={sortConfig}
                        />

                        {hasMore && !loadingHistorico && (
                            <div className="load-more">
                                <button onClick={() => fetchHistorico(false)}>Carregar Mais</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default PainelOrcamentos;