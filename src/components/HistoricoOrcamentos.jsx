// src/components/HistoricoOrcamentos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoricoOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// URL BASE da sua API
const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com';

const HistoricoOrcamentos = ({ onEditarOrcamento, onViewBudget, onClose }) => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const buscarHistorico = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orcamentos`);
      setHistorico(response.data);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setError('Erro ao carregar histórico de orçamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarHistorico();
  }, []);

  const handleExcluirOrcamento = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orcamentos/${id}`);
        alert('Orçamento excluído com sucesso!');
        buscarHistorico();
      } catch (err) {
        console.error('Erro ao excluir orçamento:', err);
        alert('Erro ao excluir orçamento. Tente novamente.');
      }
    }
  };

  const getStatusTagClass = (status) => {
    switch (status) {
      case 'Aberto':
        return 'amarelo';
      case 'Concluído':
        return 'verde';
      case 'Cancelado':
        return 'vermelho';
      default:
        return '';
    }
  };

  const formatarData = (data) => {
    return data && data.toDate
      ? data.toDate().toLocaleString('pt-BR')
      : 'Data não disponível';
  };

  if (loading) return <div className="loading-message">Carregando histórico...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (historico.length === 0) return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

  return (
    <div id="ancora-historico-orcamentos" className="tabela-historico">
      <h2>Histórico de Orçamentos</h2>

      {/* Estrutura para Desktop (Tabela) */}
      <div className="historico-desktop">
        <table className="tabela-light">
          <thead>
            <tr>
              <th>OS.</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Tipo</th>
              <th>Valor Total</th>
              <th>Data/Hora</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((orcamento) => (
              <tr key={orcamento.id}>
                <td>{orcamento.ordemServico || '-'}</td>
                <td>{orcamento.cliente}</td>
                <td>{orcamento.veiculo || '-'}</td>
                <td>{orcamento.tipo}</td>
                <td>R$ {Number(orcamento.valorTotal).toFixed(2)}</td>
                <td>{formatarData(orcamento.data)}</td>
                <td>
                  <span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>
                    {orcamento.status || 'Aberto'}
                  </span>
                </td>
                <td className="acoes-icones">
                  <FaEye title="Visualizar" onClick={() => onViewBudget(orcamento)} />
                  <FaEdit title="Editar" onClick={() => onEditarOrcamento(orcamento)} />
                  <FaTrash title="Excluir" onClick={() => handleExcluirOrcamento(orcamento.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estrutura para Mobile (Cards) */}
      <div className="historico-mobile">
        {historico.map((orcamento) => (
          <div key={orcamento.id} className="orcamento-card">
            <div className="card-header">
              <h3>OS.: {orcamento.ordemServico || '-'}</h3>
              <span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>
                {orcamento.status || 'Aberto'}
              </span>
            </div>
            <p><strong>Cliente:</strong> {orcamento.cliente}</p>
            <p><strong>Veículo:</strong> {orcamento.veiculo || '-'}</p>
            <p><strong>Tipo:</strong> {orcamento.tipo}</p>
            <p><strong>Valor Total:</strong> R$ {Number(orcamento.valorTotal).toFixed(2)}</p>
            <p><strong>Data/Hora:</strong> {formatarData(orcamento.data)}</p>
            <div className="card-acoes">
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