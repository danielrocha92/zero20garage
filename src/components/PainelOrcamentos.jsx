// src/components/PainelOrcamentos.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Importa html2canvas
import { useNavigate } from 'react-router-dom';
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
              <span>Valor total de mão de Obra:</span>
              <strong>R$ ${Number(orcamento?.totalMaoDeObra || 0).toFixed(2).replace('.', ',')}</strong>
            </div>
            <div class="total-line-impresso final-total">
              <span>TOTAL GERAL:</span>
              <strong>R$ ${Number(orcamento?.valorTotal || 0).toFixed(2).replace('.', ',')}</strong>
            </div>
            <p><strong>Forma de Pagamento:</strong> ${orcamento?.formaPagamento || 'N/A'}</p>
            <p><strong>Garantia:</strong> ${orcamento?.garantia || 'N/A'}</p>
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

  // 2. Reintroduza a função para rolar para a seção do histórico
  const scrollToHistorico = () => {
    if (historicoRef.current) {
      historicoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
            {/* 3. Reintroduza o botão para a rolagem */}
            <button onClick={scrollToHistorico}>
              Histórico de Orçamentos
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

          {/* 4. Envolva o componente `HistoricoOrcamentos` com a ref */}
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