// src/components/PainelOrcamentos.jsx
import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import './PainelOrcamentos.css';

// lazy import para evitar problemas de import circular
const UploadImagemOrcamento = React.lazy(() => import('./UploadImagemOrcamento'));

// URL BASE da sua API Node.js/Firebase no Render
const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com';

const PainelOrcamentos = () => {
    const navigate = useNavigate();
    const historicoRef = useRef(null);

    const [tipo, setTipo] = useState('motor');
    const [historico, setHistorico] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);

    // upload state
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]); // para previews antes do envio

    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    const showMessageBox = (msg, isError = false) => {
        setMessage(msg);
        setShowMessage(true);
    };

    const hideMessageBox = () => {
        setShowMessage(false);
        setMessage('');
    };

    const fetchHistorico = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/orcamentos`);
            const data = await response.json();
            setHistorico(data);
        } catch (error) {
            console.error('Erro ao buscar histórico no PainelOrcamentos:', error);
            showMessageBox('Erro ao carregar histórico de orçamentos.', true);
        }
    }, [setHistorico]);

    useEffect(() => {
        fetchHistorico();
    }, [fetchHistorico]);

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
                fetchHistorico();
                setEditingData(null);
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
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
        const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
    };

    const exportarPDFCompleto = async () => {
        if (historico.length === 0) {
            return showMessageBox('Nenhum dado para exportar.', true);
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // mm
        const contentWidth = pdfWidth - (margin * 2);

        const backgroundImage = require('../assets/images/background.jpg').default;

        for (let i = 0; i < historico.length; i++) {
            const orcamento = historico[i];

            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.width = `${contentWidth}mm`;
            tempDiv.style.padding = '10mm';
            tempDiv.style.backgroundColor = 'white';
            document.body.appendChild(tempDiv);

            const imagemUrl = (orcamento && (orcamento.imagem?.url || orcamento.imageUrl || orcamento.imagemUrl)) || null;

            tempDiv.innerHTML = `
        <div class="orcamento-impresso-content">
          <div class="header-impresso">
            <h1>ORÇAMENTO - ${orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
            <div class="logo-impresso-div" style="background-image: url(${backgroundImage}); background-size: contain; background-position: center; background-repeat: no-repeat; width: 100px; height: 50px;" aria-label="Logo Zero20Garage"></div>
          </div>

          <section class="info-section">
            <table class="info-table">
              <tbody>
                <tr>
                  <td>Veículo: <span class="input-line">${orcamento?.veiculo || ''}</span></td>
                  <td>OS: <span class="input-line">${orcamento?.ordemServico || ''}</span></td>
                  <td>Cliente: <span class="input-line">${orcamento?.cliente || ''}</span></td>
                  <td>Data: <span class="input-line">${orcamento?.data || ''}</span></td>
                </tr>
              </tbody>
            </table>
          </section>

          ${imagemUrl ? `<section class="imagem-section"><img src="${imagemUrl}" crossorigin="anonymous" alt="Imagem do orçamento" style="max-width:100%; max-height:400px; object-fit:contain; border-radius:6px; margin-top:12px;" /></section>` : ''}

          <section class="items-section">
            <h2>Peças</h2>
            <div class="items-columns">
              <ul class="item-list-impresso">
                ${(orcamento?.pecasSelecionadas || []).map((item, idx) => `
                  <li key="peca-${idx}">
                    <span class="checkbox-box"></span>
                    <span class="item-text">${item}</span>
                    <span class="input-line-small"></span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="total-line-impresso">
              <span>Valor total de Peças:</span>
              <strong>R$ ${Number(orcamento?.valorTotalPecas || 0).toFixed(2).replace('.', ',')}</strong>
            </div>
          </section>

          <section class="items-section">
            <h2>Serviços - Retífica</h2>
            <div class="items-columns">
              <ul class="item-list-impresso">
                ${(orcamento?.servicosSelecionados || []).map((item, idx) => `
                  <li key="servico-${idx}">
                    <span class="checkbox-box"></span>
                    <span class="item-text">${item}</span>
                    <span class="input-line-small"></span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div class="total-line-impresso">
              <span>Valor total de Serviços:</span>
              <strong>R$ ${Number(orcamento?.valorTotalServicos || 0).toFixed(2).replace('.', ',')}</strong>
            </div>
          </section>

          <section class="summary-section-impresso">
            <div class="total-line-impresso">
              <span>Valor total de mão de Obra Mecânica:</span>
              <strong>R$ ${Number(orcamento?.totalMaoDeObra || 0).toFixed(2).replace('.', ',')}</strong>
            </div>
            <div class="total-line-impresso final-total">
              <span>TOTAL GERAL:</span>
              <strong>R$ ${Number(orcamento?.valorTotal || 0).toFixed(2).replace('.', ',')}</strong>
            </div>
            <p><strong>Forma de Pagamento:</strong> ${orcamento?.formaPagamento || 'N/A'}</p>
            <p><strong>Observações:</strong> ${orcamento?.observacoes || 'N/A'}</p>
            <p><strong>Status:</strong> ${orcamento?.status || 'N/A'}</p>
          </section>
        </div>
      `;

            await new Promise(resolve => setTimeout(resolve, 50));

            try {
                const canvas = await html2canvas(tempDiv, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                });

                const imgData = canvas.toDataURL('image/png');
                const imgHeight = (canvas.height * contentWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = margin;

                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
                heightLeft -= (pdfHeight - margin);

                while (heightLeft > -1 * (pdfHeight - margin)) {
                    position = heightLeft - imgHeight + margin;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
                    heightLeft -= (pdfHeight - margin);
                }

            } catch (error) {
                console.error(`Erro ao gerar PDF para o orçamento ${orcamento.id || i}:`, error);
            } finally {
                document.body.removeChild(tempDiv);
            }
        }

        pdf.save('historico-orcamentos-zero20.pdf');
        showMessageBox('PDF do histórico gerado com sucesso!');
    };

    // envia um único arquivo (mantive sua função original)
    const handleUploadImagem = async (orcamentoId, file) => {
        if (!file || !orcamentoId) return;
        setUploading(true);

        try {
            const form = new FormData();
            form.append('imagem', file);

            const res = await fetch(`${API_BASE_URL}/api/orcamentos/${orcamentoId}/imagem`, {
                method: 'POST',
                body: form,
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
            });

            const data = await res.json();

            if (res.ok) {
                showMessageBox('Imagem anexada com sucesso ao orçamento.');
                await fetchHistorico();
            } else {
                console.error('Resposta inválida do upload:', data);
                showMessageBox(`Erro no upload: ${data?.msg || data?.error || 'Erro desconhecido'}`, true);
            }
        } catch (err) {
            console.error('Erro no upload da imagem:', err);
            showMessageBox('Falha no upload da imagem. Veja console.', true);
        } finally {
            setUploading(false);
        }
    };

    // envia múltiplos arquivos em um único POST (ajuste se seu backend não suportar)
    const uploadFilesForOrcamento = async (orcamentoId, files) => {
        if (!orcamentoId || !files || files.length === 0) return;
        setUploading(true);

        try {
            const form = new FormData();
            files.forEach((f) => form.append('imagem', f)); // vários campos 'imagem'
            const res = await fetch(`${API_BASE_URL}/api/orcamentos/${orcamentoId}/imagens`, {
                method: 'POST',
                body: form,
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
            });

            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = text; }

            if (!res.ok) {
                console.error('Erro upload múltiplo', { status: res.status, body: data });
                showMessageBox(`Erro no upload múltiplo: ${data?.msg || data || res.status}`, true);
                return;
            }

            showMessageBox('Imagens anexadas com sucesso.');
            setSelectedFiles([]);
            await fetchHistorico();
        } catch (err) {
            console.error('Erro no upload múltiplo:', err);
            showMessageBox('Falha no upload múltiplo. Veja console.', true);
        } finally {
            setUploading(false);
        }
    };

    // remove imagem existente (usa public_id — ajuste se necessário)
    const removeImage = async (public_id) => {
        if (!editingData?.id || !public_id) return;
        if (!window.confirm('Confirma a exclusão desta imagem?')) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/orcamentos/${editingData.id}/imagem/${public_id}`, {
                method: 'DELETE',
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
            });

            const data = await res.json();

            if (res.ok) {
                showMessageBox('Imagem removida com sucesso.');
                // Atualiza localmente: recarrega histórico e editingData
                await fetchHistorico();
                // opcional: atualizar editingData local sem fetch:
                setEditingData(prev => {
                    if (!prev) return prev;
                    const novas = (prev.imagens || []).filter(img => img.public_id !== public_id);
                    return { ...prev, imagens: novas };
                });
            } else {
                console.error('Erro ao remover imagem:', data);
                showMessageBox(`Erro ao remover imagem: ${data?.msg || data?.error || 'Erro desconhecido'}`, true);
            }
        } catch (err) {
            console.error('Erro ao remover imagem:', err);
            showMessageBox('Erro ao remover imagem. Veja console.', true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/orcamento');
    };

    const handleEditarOrcamento = (orcamento) => {
        setEditingData(orcamento);
        setTipo(orcamento.tipo === 'Geral' ? 'cabecote' : 'motor');
        setSelectedBudgetForView(null);

        setTimeout(() => {
            const formElement = document.getElementById('orcamento-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleViewBudget = (orcamento) => {
        setSelectedBudgetForView(orcamento);
    };

    const handleCloseView = () => {
        setSelectedBudgetForView(null);
    };

    const scrollToHistorico = () => {
        if (historicoRef.current) {
            historicoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // helper para normalizar imagens existentes (pode vir em formatos diferentes)
    const imagensExistentes = (() => {
        if (!editingData) return [];
        if (Array.isArray(editingData.imagens) && editingData.imagens.length) return editingData.imagens;
        if (editingData.imagem) return [editingData.imagem];
        if (editingData.imageUrl) return [{ url: editingData.imageUrl, public_id: editingData.public_id }];
        return [];
    })();

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
                        <button onClick={() => { setTipo('motor'); setEditingData(null); }} className={tipo === 'motor' ? 'active' : ''}>
                            Orçamento Motor Completo
                        </button>
                        <button onClick={() => { setTipo('cabecote'); setEditingData(null); }} className={tipo === 'cabecote' ? 'active' : ''}>
                            Orçamento Cabeçote
                        </button>
                        <button onClick={scrollToHistorico}>Histórico de Orçamentos</button>
                        <button onClick={handleLogout}>Sair</button>
                    </nav>

                    <main className="orcamento-form-wrapper" id="orcamento-form">
                        {tipo === 'motor' ? (
                            <OrcamentoMotorCompleto onSubmit={handleSalvar} editingData={editingData} />
                        ) : (
                            <OrcamentoCabecote onSubmit={handleSalvar} editingData={editingData} />
                        )}

                        {/* =====================================================
                            SEÇÃO DE UPLOAD / IMAGENS — deve aparecer após a seção "Status"
                            (como solicitado). Aqui simplificamos e suportamos múltiplas imagens,
                            pré-visualização e exclusão.
                           ===================================================== */}
                        <Suspense fallback={<div>Carregando upload de imagem...</div>}>
                            <div className="upload-imagem-wrapper" style={{ marginTop: 12 }}>
                                <label style={{ display: 'block', marginBottom: 6 }}>Imagem do Orçamento (arquivo ou câmera):</label>

                                {/* Componente de upload moderno (lazy) — opcional */}
                                <UploadImagemOrcamento
                                    orcamentoId={editingData?.id}
                                    authToken={authToken}
                                    imagemAtual={imagensExistentes}
                                    onUploaded={async (imgs) => {
                                        if (editingData) {
                                            setEditingData(prev => prev ? { ...prev, imagens: imgs } : prev);
                                        }
                                        await fetchHistorico();
                                    }}
                                />

                                <hr style={{ margin: '12px 0' }} />

                                {/* INPUT MULTI (selecionar várias imagens / captura) */}
                                <label style={{ display: 'block', marginTop: 8 }} className="file-label">
                                    Selecionar imagens (pode escolher várias, capture com câmera em mobile):
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        capture="environment"
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            if (!files.length) return;
                                            setSelectedFiles(files);

                                            // Se houver um orçamento em edição, envia automaticamente em lote
                                            if (editingData?.id) {
                                                uploadFilesForOrcamento(editingData.id, files);
                                            } else {
                                                // sem edição: pergunta se deseja enviar "avulso"
                                                if (window.confirm('Nenhum orçamento em edição. Deseja enviar as imagens sem vínculo?')) {
                                                    uploadFilesForOrcamento(null, files); // seu endpoint avulso deve aceitar /api/orcamentos/imagens (ajuste se necessário)
                                                } else {
                                                    // apenas mantém preview selecionado até o usuário salvar/associar
                                                }
                                            }
                                        }}
                                        disabled={uploading}
                                        style={{ display: 'block', marginTop: 6 }}
                                    />
                                </label>

                                {uploading && <p className="loading-message">Enviando imagem(s)...</p>}

                                {/* Preview das imagens selecionadas (antes do upload ou para visualização) */}
                                {selectedFiles && selectedFiles.length > 0 && (
                                    <div className="selected-images">
                                        <h4>Imagens selecionadas ({selectedFiles.length}):</h4>
                                        <div className="image-list">
                                            {selectedFiles.map((f, idx) => {
                                                const url = URL.createObjectURL(f);
                                                return (
                                                    <div key={idx} className="image-item">
                                                        <img src={url} alt={f.name} className="image-preview" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Imagens já associadas ao orçamento (se houver) */}
                                {imagensExistentes.length > 0 && (
                                    <div className="existing-images">
                                        <h4>Imagens do orçamento:</h4>
                                        <div className="image-list">
                                            {imagensExistentes.map((img, idx) => (
                                                <div key={img.public_id || img.url || idx} className="image-item">
                                                    <img src={img.url || img.uri || img} alt={`Imagem ${idx + 1}`} />
                                                    {img.public_id && (
                                                        <button
                                                            className="remove-button"
                                                            title="Remover imagem"
                                                            onClick={() => removeImage(img.public_id)}
                                                        >&times;</button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Suspense>

                        <div className="historico-buttons-group">
                            <button onClick={exportarExcel} className="action-btn">Exportar Todos para Excel</button>
                            <button onClick={exportarPDFCompleto} className="action-btn">Exportar Todos para PDF</button>
                        </div>
                    </main>

                    <div ref={historicoRef}>
                        <HistoricoOrcamentos onEditarOrcamento={handleEditarOrcamento} onViewBudget={handleViewBudget} />
                    </div>
                </>
            )}
        </div>
    );
};

export default PainelOrcamentos;
