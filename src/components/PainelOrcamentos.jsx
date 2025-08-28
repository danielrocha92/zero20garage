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

// URL BASE da sua API Node.js/Firebase no Render
// ATENÇÃO: SUBSTITUA ESTA URL PELA URL REAL DO SEU DEPLOY NO RENDER!
// DEVE SER APENAS O DOMÍNIO, SEM O ENDPOINT /api/orcamentos
const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com'; // Use a URL do seu deploy da API

/**
 * Componente PainelOrcamentos
 * Gerencia a criação, visualização, edição e exportação de orçamentos.
 */
const PainelOrcamentos = () => {
    const navigate = useNavigate();
    // 1. Reintroduza o useRef para criar a referência
    const historicoRef = useRef(null);

    const [tipo, setTipo] = useState('motor');
    const [historico, setHistorico] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);

    // novo estado para controlar upload
    const [uploading, setUploading] = useState(false);

    // auth token (se você usa)
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

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
            // Agora a URL será https://api-orcamento-n49u.onrender.com/api/orcamentos
            const response = await fetch(`${API_BASE_URL}/api/orcamentos`);
            const data = await response.json();
            setHistorico(data);
        } catch (error) {
            console.error('Erro ao buscar histórico no PainelOrcamentos:', error);
            showMessageBox('Erro ao carregar histórico de orçamentos.', true);
        }
    }, [setHistorico]);

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
                fetchHistorico();
                setEditingData(null); // <-- O estado é resetado APENAS se a operação for bem-sucedida
            } else {
                const errorData = result.msg || 'Erro desconhecido ao salvar orçamento.';
                showMessageBox(`Erro ao salvar orçamento: ${errorData}`, true);
                // Não reseta editingData, assim o usuário pode tentar novamente
            }
        } catch (err) {
            console.error('Erro ao conectar com a API ou processar resposta:', err);
            showMessageBox('Erro ao conectar com o servidor da API. Tente novamente.', true);
            // Não reseta editingData, assim o usuário pode tentar novamente
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

    /**
     * Exporta todos os orçamentos do histórico para um arquivo PDF com o mesmo padrão visual do OrcamentoImpresso.
     * Cada orçamento será gerado em uma página separada.
     */
    const exportarPDFCompleto = async () => {
        if (historico.length === 0) {
            return showMessageBox('Nenhum dado para exportar.', true);
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // mm
        const contentWidth = pdfWidth - (margin * 2);

        // Importa a imagem de fundo uma vez
        const backgroundImage = require('../assets/images/background.jpg').default;

        for (let i = 0; i < historico.length; i++) {
            const orcamento = historico[i];

            // Cria um elemento div temporário para CADA orçamento
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px'; // Fora da tela
            tempDiv.style.width = `${contentWidth}mm`; // Define a largura para a renderização do canvas
            tempDiv.style.padding = '10mm'; // Simula o padding do OrcamentoImpresso.css
            tempDiv.style.backgroundColor = 'white'; // Fundo branco para a captura
            document.body.appendChild(tempDiv);

            // Decide a URL da imagem (compatível com diferentes formatos de campo)
            const imagemUrl = (orcamento && (orcamento.imagem?.url || orcamento.imageUrl || orcamento.imagemUrl)) || null;

            // Constrói o HTML para o orçamento atual, replicando a estrutura do OrcamentoImpresso
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

            // Pequeno atraso para garantir que o DOM esteja completamente renderizado
            await new Promise(resolve => setTimeout(resolve, 50)); // Atraso menor, pois é por item

            try {
                const canvas = await html2canvas(tempDiv, {
                    scale: 2, // Aumenta a escala para melhor qualidade do PDF
                    useCORS: true, // Importante se tiver imagens de outras origens
                    logging: false, // Desabilita logs excessivos durante o loop
                });

                const imgData = canvas.toDataURL('image/png');
                const imgHeight = (canvas.height * contentWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = margin;

                if (i > 0) { // Adiciona nova página para todos, exceto o primeiro orçamento
                    pdf.addPage();
                }

                // Adiciona a imagem do orçamento atual
                pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
                heightLeft -= (pdfHeight - margin); // Reduz a altura da página útil

                // Lógica para lidar com orçamentos que são maiores que uma única página A4
                while (heightLeft > -1 * (pdfHeight - margin)) {
                    position = heightLeft - imgHeight + margin;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
                    heightLeft -= (pdfHeight - margin);
                }

            } catch (error) {
                console.error(`Erro ao gerar PDF para o orçamento ${orcamento.id || i}:`, error); // Usar 'i' para o índice do loop
                // Continua para o próximo orçamento mesmo se um falhar
            } finally {
                document.body.removeChild(tempDiv); // Remove o div temporário após o uso
            }
        }

        pdf.save('historico-orcamentos-zero20.pdf');
        showMessageBox('PDF do histórico gerado com sucesso!');
    };

    // ===== Função para upload de imagem (arquivo / câmera) =====
    // Observação: envia multipart/form-data para o endpoint de imagem do orçamento.
    const handleUploadImagem = async (orcamentoId, file) => {
        if (!file || !orcamentoId) return;
        setUploading(true);

        try {
            const form = new FormData();
            // campo 'imagem' — ajuste conforme seu backend (pode ser 'file' ou outro)
            form.append('imagem', file);

            const res = await fetch(`${API_BASE_URL}/api/orcamentos/${orcamentoId}/imagem`, {
                method: 'POST',
                body: form,
                // Caso sua API exija token, adicione headers Authorization aqui
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
            });

            const data = await res.json();

            if (res.ok) {
                showMessageBox('Imagem anexada com sucesso ao orçamento.');
                // Recarrega histórico para trazer a url atualizada
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

    const handleLogout = () => {
        console.log('Removendo authToken...');
        localStorage.removeItem('authToken');
        console.log('authToken removido. Novo valor:', localStorage.getItem('authToken'));
        console.log('Navegando para /orcamento...');
        navigate('/orcamento');
    };

    /**
     * @description Lida com a edição de um orçamento, preenchendo o formulário e rolando a página para o topo.
     * @param {Object} orcamento - O objeto de orçamento a ser editado.
     */
    const handleEditarOrcamento = (orcamento) => {
        // 1. Define os dados de edição, o que preenche o formulário
        setEditingData(orcamento);
        // 2. Define o tipo de orçamento para renderizar o formulário correto
        setTipo(orcamento.tipo === 'Geral' ? 'cabecote' : 'motor');
        // 3. Limpa o estado de visualização para fechar o modal
        setSelectedBudgetForView(null);

        // 4. Adiciona um pequeno delay para garantir que o formulário seja renderizado antes do scroll.
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

    const UploadImagemOrcamento = React.lazy(() => import('./UploadImagemOrcamento'));

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
                            onClick={() => { setTipo('motor'); setEditingData(null); }}
                            className={tipo === 'motor' ? 'active' : ''}
                        >
                            Orçamento Motor Completo
                        </button>
                        <button
                            onClick={() => { setTipo('cabecote'); setEditingData(null); }}
                            className={tipo === 'cabecote' ? 'active' : ''}
                        >
                            Orçamento Cabeçote
                        </button>
                        <button onClick={scrollToHistorico}>
                            Histórico de Orçamentos
                        </button>
                        <button onClick={handleLogout}>
                            Sair
                        </button>
                    </nav>

                    <main className="orcamento-form-wrapper" id="orcamento-form">
                        {tipo === 'motor' ? (
                            <OrcamentoMotorCompleto onSubmit={handleSalvar} editingData={editingData} />
                        ) : (
                            <OrcamentoCabecote onSubmit={handleSalvar} editingData={editingData} />
                        )}

                        {/* ===== Alteração: UploadImagemOrcamento agora aparece sempre (não apenas em editar) ===== */}
                        <Suspense fallback={<div>Carregando upload de imagem...</div>}>
                            <div className="upload-imagem-wrapper" style={{ marginTop: 12 }}>
                                <label style={{ display: 'block', marginBottom: 6 }}>Imagem do Orçamento (arquivo ou câmera):</label>

                                {/* Componente moderno: upload assinado para Cloudinary (captura + assinatura + notificação ao backend) */}
                                {/* Passamos editingData?.id: se estiver editando, o componente atualizará esse orçamento; se não estiver, ele permitirá upload (sem atualizar Firestore) e chamará onChange/onUploaded. */}
                                <UploadImagemOrcamento
                                    orcamentoId={editingData?.id}
                                    authToken={authToken}
                                    imagemAtual={editingData?.imagem || (editingData?.imageUrl ? [{ url: editingData.imageUrl, public_id: editingData.public_id }] : [])}
                                    onUploaded={async (imgs) => {
                                        // Atualiza o editingData local (se houver)
                                        if (editingData) {
                                            setEditingData(prev => prev ? { ...prev, imagem: imgs } : prev);
                                        }
                                        // Recarrega histórico para garantir sincronização
                                        await fetchHistorico();
                                    }}
                                />

                                <hr style={{ margin: '12px 0' }} />

                                {/* Alternativa: input tradicional que envia multipart/form-data direto ao seu endpoint */}
                                <label style={{ display: 'block', marginTop: 8 }}>
                                    Ou envie direto para o servidor (multipart/form-data):
                                    <input
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            // Se não há editingData.id, avisamos o usuário que a imagem será enviada sem associação ao orçamento
                                            if (!file) return;
                                            if (!editingData?.id) {
                                                if (!window.confirm('Nenhum orçamento está em edição. Enviar para o servidor sem vínculo a um orçamento?')) return;
                                                // Você pode chamar um endpoint geral ou simplesmente ignorar; aqui chamamos handleUploadImagem apenas se editingData.id existir
                                            }
                                            if (file && editingData?.id) handleUploadImagem(editingData.id, file);
                                            else if (file && !editingData?.id) {
                                                // Envio sem vínculo: chamar seu endpoint genérico (se tiver) ou exibir aviso
                                                // Exemplo: enviar para endpoint genérico (ajuste conforme necessário)
                                                (async () => {
                                                    setUploading(true);
                                                    try {
                                                        const form = new FormData();
                                                        form.append('imagem', file);
                                                        const res = await fetch(`${API_BASE_URL}/api/orcamentos/imagem-avulsa`, {
                                                            method: 'POST',
                                                            body: form,
                                                            headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
                                                        });
                                                        const data = await res.json();
                                                        if (res.ok) {
                                                            showMessageBox('Imagem enviada com sucesso (avulsa).');
                                                            await fetchHistorico();
                                                        } else {
                                                            console.error('Erro envio avulso:', data);
                                                            showMessageBox(`Erro no envio: ${data?.msg || data?.error || 'Erro desconhecido'}`, true);
                                                        }
                                                    } catch (err) {
                                                        console.error('Erro no envio avulso:', err);
                                                        showMessageBox('Erro no envio avulso. Veja console.', true);
                                                    } finally {
                                                        setUploading(false);
                                                    }
                                                })();
                                            }
                                        }}
                                        disabled={uploading}
                                        style={{ display: 'block', marginTop: 6 }}
                                    />
                                </label>
                                {uploading && <p>Enviando imagem...</p>}

                                {/* Preview da imagem atual (se houver) */}
                                {editingData?.imagem?.url && (
                                    <div style={{ marginTop: 8 }}>
                                        <strong>Imagem atual:</strong>
                                        <div style={{ marginTop: 6 }}>
                                            <img src={editingData.imagem.url} alt="Preview" style={{ maxWidth: 240, borderRadius: 6 }} crossOrigin="anonymous" />
                                        </div>
                                    </div>
                                )}
                                {/* Compatibilidade com outros nomes de campo */}
                                {(!editingData?.imagem?.url && editingData?.imageUrl) && (
                                    <div style={{ marginTop: 8 }}>
                                        <strong>Imagem atual:</strong>
                                        <div style={{ marginTop: 6 }}>
                                            <img src={editingData.imageUrl} alt="Preview" style={{ maxWidth: 240, borderRadius: 6 }} crossOrigin="anonymous" />
                                        </div>
                                    </div>
                                )}
                                {/* Observação: se o usuário não estiver editando, UploadImagemOrcamento permitirá upload sem associação — e acionará onUploaded */}
                            </div>
                        </Suspense>

                        <div className="historico-buttons-group">
                            <button onClick={exportarExcel} className="action-btn">
                                Exportar Todos para Excel
                            </button>
                            <button onClick={exportarPDFCompleto} className="action-btn">
                                Exportar Todos para PDF
                            </button>
                        </div>
                    </main>

                    <div ref={historicoRef}>
                        <HistoricoOrcamentos
                            onEditarOrcamento={handleEditarOrcamento}
                            onViewBudget={handleViewBudget}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default PainelOrcamentos;
