import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoricoOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

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

  const handleExcluirOrcamento = async (orcamento) => {
    // 🚨 Troca de window.confirm() por um modal customizado para evitar alertas do navegador em iframes
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o orçamento de ${orcamento.cliente || 'cliente desconhecido'} (OS: ${
        orcamento.ordemServico || '-'
      })?`
    );
    if (confirmar) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orcamentos/${orcamento.id}`);
        // 🚨 Troca de alert() por um modal customizado
        alert('Orçamento excluído com sucesso!');
        buscarHistorico();
      } catch (err) {
        console.error('Erro ao excluir orçamento:', err);
        // 🚨 Troca de alert() por um modal customizado
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

  /**
   * Função para formatar a data, lidando com diferentes formatos (string ISO, objeto Date, timestamp Firestore).
   * @param {string | object} data - A data a ser formatada. Pode ser uma string ISO ou um objeto Date/Timestamp do Firestore.
   * @returns {string} A data e hora formatada ou uma mensagem de erro.
   */
  const formatarData = (data) => {
    if (!data) return 'Data não disponível';
    let d = null;

    if (typeof data === 'string') {
      d = new Date(data);
    } else if (data && typeof data.toDate === 'function') {
      // Caso seja um objeto Timestamp do Firestore
      d = data.toDate();
    } else if (data instanceof Date) {
      d = data;
    } else if (data && typeof data._seconds === 'number' && typeof data._nanoseconds === 'number') {
      // Caso seja um objeto de timestamp do Firestore retornado como JSON
      d = new Date(data._seconds * 1000 + data._nanoseconds / 1000000);
    }

    if (d && !isNaN(d.getTime())) {
      return d.toLocaleString('pt-BR');
    }
    return 'Data inválida';
  };

  // ✅ Extraído em função reutilizável
  const getImagemUrl = (orcamento) => {
    if (Array.isArray(orcamento.imagens) && orcamento.imagens.length > 0 && typeof orcamento.imagens[0]?.secure_url === 'string') {
      return orcamento.imagens[0].secure_url;
    }
    return orcamento.imagem?.url || orcamento.imageUrl || null;
  };

  // ✅ Ordenação por data (mais recentes primeiro)
  const historicoOrdenado = [...historico].sort((a, b) => {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);
    return dataB - dataA;
  });

  if (loading) return <div className="loading-message">Carregando histórico...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (historicoOrdenado.length === 0)
    return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

  return (
    <div id="ancora-historico-orcamentos" className="tabela-historico">
      <div className="header-bar">
        <h2>Histórico de Orçamentos</h2>
        {onClose && (
          <button className="close-button" onClick={onClose}>
            Fechar
          </button>
        )}
      </div>

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
              <th>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {historicoOrdenado.map((orcamento) => (
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
                <td>
                  {getImagemUrl(orcamento) ? (
                    <a
                      href={getImagemUrl(orcamento)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Clique para ampliar"
                    >
                      <img
                        src={getImagemUrl(orcamento)}
                        alt="Imagem do orçamento"
                        style={{
                          width: '80px',
                          height: 'auto',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                        crossOrigin="anonymous"
                      />
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="acoes-icones">
                  <button onClick={() => onViewBudget(orcamento)} title="Visualizar">
                    <FaEye />
                  </button>
                  <button onClick={() => onEditarOrcamento(orcamento)} title="Editar">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleExcluirOrcamento(orcamento)} title="Excluir">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estrutura para Mobile (Cards) */}
      <div className="historico-mobile">
        {historicoOrdenado.map((orcamento) => (
          <details key={orcamento.id} className="orcamento-card">
            <summary className="card-header">
              <h3>OS.: {orcamento.ordemServico || '-'}</h3>
              {/* CORREÇÃO: Colocando a crase de fechamento no lugar correto */}
              <span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>
                {orcamento.status || 'Aberto'}
              </span>
            </summary>

            <div className="card-content">
              <p>
                <strong>Cliente:</strong> {orcamento.cliente}
              </p>
              <p>
                <strong>Veículo:</strong> {orcamento.veiculo || '-'}
              </p>
              <p>
                <strong>Tipo:</strong> {orcamento.tipo}
              </p>
              <p>
                <strong>Valor Total:</strong> R$ {Number(orcamento.valorTotal).toFixed(2)}
              </p>
              <p>
                <strong>Data/Hora:</strong> {formatarData(orcamento.data)}
              </p>

              {getImagemUrl(orcamento) && (
                <div style={{ margin: '12px 0' }}>
                  <a
                    href={getImagemUrl(orcamento)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Clique para ver a imagem em tamanho maior"
                  >
                    <img
                      src={getImagemUrl(orcamento)}
                      alt="Imagem do orçamento"
                      style={{
                        width: '100%',
                        maxWidth: '280px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                      crossOrigin="anonymous"
                    />
                  </a>
                </div>
              )}

              <div className="card-acoes">
                <button
                  onClick={() => onViewBudget(orcamento)}
                  className="action-btn view-btn"
                >
                  Visualizar
                </button>
                <button
                  onClick={() => onEditarOrcamento(orcamento)}
                  className="action-btn edit-btn"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluirOrcamento(orcamento)}
                  className="action-btn delete-btn"
                >
                  Excluir
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default HistoricoOrcamentos;
