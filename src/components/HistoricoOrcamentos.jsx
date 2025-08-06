// src/components/HistoricoOrcamentos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Se você estiver usando axios
import './HistoricoOrcamentos.css'; // Importe o CSS se existir

// URL BASE da sua API Node.js/Firebase no Render
// ATENÇÃO: Substitua pela URL REAL do seu deploy da API!
const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com'; // A mesma URL base do PainelOrcamentos

const HistoricoOrcamentos = ({ onEditarOrcamento, onViewBudget }) => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar o histórico de orçamentos
  const buscarHistorico = async () => {
    setLoading(true);
    setError(null);
    try {
      // CORRIGIDO AQUI: Usando o endpoint PLURAL /api/orcamentos
      const response = await axios.get(`${API_BASE_URL}/api/orcamentos`);
      setHistorico(response.data);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setError('Erro ao carregar histórico de orçamentos.');
    } finally {
      setLoading(false);
    }
  };

  // Efeito para buscar o histórico quando o componente é montado
  useEffect(() => {
    buscarHistorico();
  }, []); // Array de dependências vazio para rodar apenas uma vez

  // ... (restante do seu código HistoricoOrcamentos) ...

  const handleExcluirOrcamento = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      try {
        // CORRIGIDO AQUI: Usando o endpoint PLURAL /api/orcamentos/:id para DELETE
        await axios.delete(`${API_BASE_URL}/api/orcamentos/${id}`);
        alert('Orçamento excluído com sucesso!');
        buscarHistorico(); // Atualiza a lista após a exclusão
      } catch (err) {
        console.error('Erro ao excluir orçamento:', err);
        alert('Erro ao excluir orçamento. Tente novamente.');
      }
    }
  };

  if (loading) return <div className="loading-message">Carregando histórico...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (historico.length === 0) return <div className="no-data-message">Nenhum orçamento encontrado.</div>;


  return (
    <div className="historico-orcamentos-container">
      <h2>Histórico de Orçamentos</h2>
      <div className="historico-list">
        {historico.map((orcamento) => (
          <div key={orcamento.id} className="orcamento-item">
            <p><strong>OS.:</strong> {orcamento.ordemServico}</p>
            <p><strong>Cliente:</strong> {orcamento.cliente}</p>
            <p><strong>Veículo:</strong> {orcamento.veiculo}</p>
            <p><strong>Tipo:</strong> {orcamento.tipo}</p>
            <p><strong>Valor Total:</strong> R$ {Number(orcamento.valorTotal).toFixed(2)}</p>
            <p><strong>Data/Hora:</strong> {orcamento.data}</p>
            <div className="orcamento-actions">
              <button onClick={() => onViewBudget(orcamento)} className="action-btn view-btn">Visualizar</button>
              <button onClick={() => onEditarOrcamento(orcamento)} className="action-btn edit-btn">Editar</button>
              <button onClick={() => handleExcluirOrcamento(orcamento.id)} className="action-btn delete-btn">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricoOrcamentos;
