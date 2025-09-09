// src/components/HistoricoOrcamentos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HistoricoOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com';

/** =======================
 *  Modal Customizado
 * ======================= */
const CustomModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancelar',
  showCancel = false,
}) => {
  if (!isOpen) return null;
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          {showCancel && (
            <button onClick={onCancel} className="cancel-btn">
              {cancelText}
            </button>
          )}
          <button onClick={onConfirm} className="confirm-btn">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const HistoricoOrcamentos = ({ onEditarOrcamento, onViewBudget, onClose }) => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
    confirmText: 'OK',
    cancelText: 'Cancelar',
    showCancel: false,
  });

  const abrirModal = (config) => setModalConfig({ ...modalConfig, isOpen: true, ...config });
  const fecharModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  /** =======================
   *  Busca histórico de orçamentos
   * ======================= */
  const buscarHistorico = async () => {
    if (error) return; // evita re-tentativa automática se já houve erro
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orcamentos`);
      setHistorico(response.data);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      let mensagemErro = 'Erro ao carregar histórico de orçamentos.';
      if (err.response?.data?.erro || err.response?.data?.error) {
        mensagemErro += ` Detalhes: ${err.response.data.erro || err.response.data.error}`;
      } else if (err.message) {
        mensagemErro += ` (${err.message})`;
      }
      setError(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarHistorico();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** =======================
   *  Excluir orçamento
   * ======================= */
  const handleExcluirOrcamento = (orcamento) => {
    abrirModal({
      title: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir o orçamento de ${orcamento.cliente || 'cliente desconhecido'} (OS: ${orcamento.ordemServico || '-'})?`,
      confirmText: 'Sim, excluir',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm: async () => {
        fecharModal();
        try {
          await axios.delete(`${API_BASE_URL}/api/orcamentos/${orcamento.id}`);
          abrirModal({
            title: 'Sucesso',
            message: 'Orçamento excluído com sucesso!',
            confirmText: 'OK',
            showCancel: false,
            onConfirm: () => fecharModal(),
          });
          buscarHistorico();
        } catch (err) {
          console.error('Erro ao excluir orçamento:', err);
          let mensagemErro = 'Erro ao excluir orçamento.';
          if (err.response?.data?.erro || err.response?.data?.error) {
            mensagemErro += ` Detalhes: ${err.response.data.erro || err.response.data.error}`;
          } else if (err.message) {
            mensagemErro += ` (${err.message})`;
          }
          abrirModal({
            title: 'Erro',
            message: mensagemErro,
            confirmText: 'Fechar',
            showCancel: false,
            onConfirm: () => fecharModal(),
          });
        }
      },
      onCancel: fecharModal,
    });
  };

  const getStatusTagClass = (status) => {
    switch (status) {
      case 'Aberto': return 'amarelo';
      case 'Concluído': return 'verde';
      case 'Cancelado': return 'vermelho';
      default: return '';
    }
  };

  const formatarData = (data) => {
    if (!data) return '-';
    let d = null;
    if (typeof data === 'string') d = new Date(data);
    else if (data?.toDate instanceof Function) d = data.toDate();
    else if (data instanceof Date) d = data;
    else if (data?._seconds) d = new Date(data._seconds * 1000 + (data._nanoseconds || 0)/1000000);
    return d && !isNaN(d.getTime()) ? d.toLocaleString('pt-BR') : '-';
  };

  const getImagemUrl = (orcamento) => {
    if (!orcamento) return null;
    if (Array.isArray(orcamento.imagens) && orcamento.imagens.length > 0) {
      return orcamento.imagens[0].url || orcamento.imagens[0].secure_url || null;
    }
    return orcamento.imagem?.url || orcamento.imageUrl || orcamento.imagemUrl || null;
  };

  const historicoOrdenado = [...historico].sort((a, b) => {
    const dataA = a.data?.toDate ? a.data.toDate() : new Date(a.data);
    const dataB = b.data?.toDate ? b.data.toDate() : new Date(b.data);
    return dataB - dataA;
  });

  if (loading) return <div className="loading-message">Carregando histórico...</div>;

  if (error)
    return (
      <div className="error-message">
        {error}
        <button className="retry-btn" onClick={() => setError(null) || buscarHistorico()}>
          Tentar novamente
        </button>
      </div>
    );

  if (historicoOrdenado.length === 0)
    return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

  return (
    <div id="ancora-historico-orcamentos" className="tabela-historico">
      <div className="header-bar">
        <h2>Histórico de Orçamentos</h2>
        {onClose && <button className="close-button" onClick={onClose}>Fechar</button>}
      </div>

      {/* Desktop */}
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
                <td>R$ {Number(orcamento.valorTotal || 0).toFixed(2)}</td>
                <td>{formatarData(orcamento.data)}</td>
                <td>
                  <span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>
                    {orcamento.status || 'Aberto'}
                  </span>
                </td>
                <td>
                  {getImagemUrl(orcamento) ? (
                    <a href={getImagemUrl(orcamento)} target="_blank" rel="noopener noreferrer" title="Clique para ampliar">
                      <img src={getImagemUrl(orcamento)} alt="Imagem do orçamento" style={{ width: '80px', borderRadius: '6px' }} />
                    </a>
                  ) : '-'}
                </td>
                <td className="acoes-icones">
                  <button onClick={() => onViewBudget(orcamento)} title="Visualizar"><FaEye /></button>
                  <button onClick={() => onEditarOrcamento(orcamento)} title="Editar"><FaEdit /></button>
                  <button onClick={() => handleExcluirOrcamento(orcamento)} title="Excluir"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="historico-mobile">
        {historicoOrdenado.map((orcamento) => (
          <details key={orcamento.id} className="orcamento-card">
            <summary className="card-header">
              <h3>OS.: {orcamento.ordemServico || '-'}</h3>
              <span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>{orcamento.status || 'Aberto'}</span>
            </summary>
            <div className="card-content">
              <p><strong>Cliente:</strong> {orcamento.cliente}</p>
              <p><strong>Veículo:</strong> {orcamento.veiculo || '-'}</p>
              <p><strong>Tipo:</strong> {orcamento.tipo}</p>
              <p><strong>Valor Total:</strong> R$ {Number(orcamento.valorTotal || 0).toFixed(2)}</p>
              <p><strong>Data/Hora:</strong> {formatarData(orcamento.data)}</p>
              {getImagemUrl(orcamento) && (
                <div>
                  <a href={getImagemUrl(orcamento)} target="_blank" rel="noopener noreferrer">
                    <img src={getImagemUrl(orcamento)} alt="Imagem do orçamento" />
                  </a>
                </div>
              )}
              <div className="card-acoes">
                <button onClick={() => onViewBudget(orcamento)} className="action-btn view-btn">Visualizar</button>
                <button onClick={() => onEditarOrcamento(orcamento)} className="action-btn edit-btn">Editar</button>
                <button onClick={() => handleExcluirOrcamento(orcamento)} className="action-btn delete-btn">Excluir</button>
              </div>
            </div>
          </details>
        ))}
      </div>

      <CustomModal {...modalConfig} />
    </div>
  );
};

export default HistoricoOrcamentos;
