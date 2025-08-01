// src/components/PainelOrcamentos.jsx
import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso'; // Importa o componente de visualização
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import './PainelOrcamentos.css'; // Import the CSS file

// URL do Google Apps Script para comunicação com o Google Sheets.
// Em um ambiente de produção, considere armazenar esta URL em variáveis de ambiente para segurança.
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIrUxPxlq0R_wYNJYBV8gTk94L_obQ_cHlwnoCPCE3/dev';

/**
 * Componente PainelOrcamentos
 * Gerencia a criação, visualização, edição e exportação de orçamentos.
 */
const PainelOrcamentos = () => {
  const navigate = useNavigate(); // Hook para navegação programática

  // Estados para gerenciar o tipo de orçamento, histórico, mensagens e dados de edição/visualização.
  const [tipo, setTipo] = useState('motor'); // 'motor' ou 'cabecote'
  const [historico, setHistorico] = useState([]); // Armazena a lista de orçamentos
  const [message, setMessage] = useState(''); // Mensagem para o usuário (sucesso/erro)
  const [showMessage, setShowMessage] = useState(false); // Controla a visibilidade da caixa de mensagem
  const [editingData, setEditingData] = useState(null); // Armazena dados do orçamento sendo editado
  const [selectedBudgetForView, setSelectedBudgetForView] = useState(null); // Armazena o orçamento selecionado para visualização detalhada

  /**
   * Exibe uma caixa de mensagem para o usuário.
   * @param {string} msg - A mensagem a ser exibida.
   * @param {boolean} [isError=false] - Indica se a mensagem é um erro (pode ser usado para estilização).
   */
  const showMessageBox = (msg, isError = false) => {
    setMessage(msg);
    setShowMessage(true);
    // Lógica para adicionar classe de erro pode ser implementada aqui.
  };

  /**
   * Oculta a caixa de mensagem.
   */
  const hideMessageBox = () => {
    setShowMessage(false);
    setMessage('');
  };

  // Efeito para buscar o histórico de orçamentos quando o componente é montado.
  useEffect(() => {
    /**
     * Busca o histórico de orçamentos do backend.
     * Atualiza o estado 'historico' com os dados recebidos.
     * Esta função foi movida para dentro do useEffect para resolver o erro de dependência do ESLint.
     */
    const fetchHistorico = async () => {
      try {
        // URL da sua API de backend para buscar orçamentos.
        const response = await fetch('https://api-orcamento-n49u.onrender.com/api/orcamento');
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico no PainelOrcamentos:', error);
        showMessageBox('Erro ao carregar histórico de orçamentos.', true);
      }
    };

    fetchHistorico(); // Busca o histórico ao montar o componente
  }, []); // O array de dependências vazio garante que o efeito seja executado apenas uma vez.

  /**
   * Lida com o salvamento de um novo orçamento ou atualização de um existente.
   * Envia os dados para o Google Sheets via Google Apps Script.
   * @param {Object} dados - Os dados do orçamento a serem salvos.
   */

const handleSalvar = async (dados) => {
  const envio = {
    ...editingData,
    ...dados,
    tipo,
    data: new Date().toLocaleString('pt-BR'),
  };

  try {
    // MUDANÇA AQUI: Use a URL da sua API no Render
    const API_RENDER_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos'; // <--- URL DO RENDER

    const res = await fetch(API_RENDER_URL, { // Envia os dados do orçamento para a API Render
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(envio),
    });

    const result = await res.json(); // A sua API Firebase retorna o objeto salvo ou um erro

    if (res.ok) { // Verifica se a resposta HTTP foi de sucesso (status 2xx)
      showMessageBox('Orçamento salvo com sucesso na API e Firestore.');
      // A função fetchHistorico já está a usar a URL da sua API Render, então ela buscará os dados atualizados
      const response = await fetch('https://seu-nome-da-api.onrender.com/api/orcamentos'); // <--- USE A MESMA URL AQUI
      const data = await response.json();
      setHistorico(data);
    } else {
      // Se a API retornar um erro (ex: 400 Bad Request, 500 Internal Server Error)
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

  /**
   * Exporta todos os orçamentos do histórico para um arquivo Excel (.xlsx).
   */
  const exportarExcel = () => {
    if (historico.length === 0) {
      return showMessageBox('Nenhum dado para exportar.', true);
    }

    // Mapeia os dados do histórico para o formato desejado para o Excel.
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Cliente: h.cliente || '',
      Veículo: h.veiculo || '',
      Placa: h.placa || '',
      Telefone: h.telefone || '',
      'Valor Total': h.valorTotal,
      // Converte arrays de peças e serviços em strings separadas por '; ' para o Excel.
      'Peças': h.pecasSelecionadas?.join('; ') || '',
      'Serviços': h.servicosSelecionados?.join('; ') || '',
      Observações: h.observacoes || '',
      'Forma de Pagamento': h.formaPagamento || '',
      Garantia: h.garantia || '',
    }));

    // Cria uma planilha a partir dos dados JSON.
    const ws = XLSX.utils.json_to_sheet(excelData);
    // Cria um novo livro de trabalho.
    const wb = XLSX.utils.book_new();
    // Adiciona a planilha ao livro de trabalho.
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    // Escreve o livro de trabalho em um buffer de array.
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // Salva o buffer como um arquivo .xlsx.
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  /**
   * Exporta um resumo de todos os orçamentos para um arquivo PDF.
   * Nota: Esta função cria um PDF simples com texto. Para PDFs mais complexos,
   * considere usar html2canvas junto com jsPDF como no GerarPdfPage.
   */
  const exportarPDFCompleto = () => {
    if (historico.length === 0) {
      return showMessageBox('Nenhum dado para exportar.', true);
    }

    const doc = new jsPDF(); // Inicializa um novo documento PDF
    let y = 20; // Posição inicial Y para o texto

    historico.forEach(h => {
      // Adiciona informações básicas de cada orçamento ao PDF.
      doc.text(`Cliente: ${h.cliente || 'N/A'}`, 10, y);
      y += 10;
      doc.text(`Veículo: ${h.veiculo || 'N/A'}`, 10, y);
      y += 10;
      doc.text(`Valor Total: R$ ${Number(h.valorTotal || 0).toFixed(2)}`, 10, y);
      y += 10;
      // Exemplo de como adicionar mais detalhes:
      // doc.text(`Peças: ${h.pecasSelecionadas?.join(', ') || 'N/A'}`, 10, y); y += 10;
      // doc.text(`Serviços: ${h.servicosSelecionados?.join(', ') || 'N/A'}`, 10, y); y += 10;

      // Adiciona uma nova página para o próximo orçamento, se necessário.
      // Isso garante que cada orçamento comece em uma nova página.
      doc.addPage();
      y = 20; // Reseta a posição Y para a nova página
    });
    doc.save('painel-orcamentos-zero20.pdf'); // Salva o documento PDF
  };

  /**
   * Lida com o logout do usuário, removendo o token de autenticação
   * e navegando para a página de orçamento.
   */
  const handleLogout = () => {
    console.log('Removendo authToken...');
    localStorage.removeItem('authToken'); // Remove o token do localStorage
    console.log('authToken removido. Novo valor:', localStorage.getItem('authToken'));
    console.log('Navegando para /orcamento...');
    navigate('/orcamento'); // Redireciona para a página de orçamento
  };

  /**
   * Define o orçamento a ser editado no formulário.
   * @param {Object} orcamento - O objeto do orçamento a ser carregado para edição.
   */
  const handleEditarOrcamento = (orcamento) => {
    setEditingData(orcamento); // Carrega os dados do orçamento no formulário para edição
    setTipo(orcamento.tipo); // Define o tipo de orçamento para corresponder ao que está sendo editado
    setSelectedBudgetForView(null); // Garante que a visualização seja fechada ao iniciar a edição
  };

  /**
   * Define o orçamento a ser visualizado em detalhes.
   * @param {Object} orcamento - O objeto do orçamento a ser visualizado.
   */
  const handleViewBudget = (orcamento) => {
    setSelectedBudgetForView(orcamento);
  };

  /**
   * Fecha a visualização detalhada do orçamento.
   */
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
        // Renderiza OrcamentoImpresso se houver um orçamento para visualizar
        <OrcamentoImpresso orcamento={selectedBudgetForView} onClose={handleCloseView} />
      ) : (
        // Conteúdo normal do PainelOrcamentos quando nenhum orçamento está sendo visualizado
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
