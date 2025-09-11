// src/components/HistoricoOrcamentos.jsx
import React, { useState, useEffect } from 'react';
import './HistoricoOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc, query, orderBy, limit, startAfter } from 'firebase/firestore';

/** =======================
 * Modal Customizado
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

  // Estados para a paginação
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const abrirModal = (config) => setModalConfig({ ...modalConfig, isOpen: true, ...config });
  const fecharModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  /** =======================
   * Busca histórico de orçamentos
   * ======================= */
  const buscarHistorico = async (loadMore = false) => {
    setLoading(true);
    setError(null);
    try {
      const orcamentosCollection = collection(db, 'orcamentos');
      const LIMIT = 10;
      let q = query(orcamentosCollection, orderBy('data', 'desc'), limit(LIMIT));

      if (loadMore && lastDoc) {
        q = query(orcamentosCollection, orderBy('data', 'desc'), startAfter(lastDoc), limit(LIMIT));
      }

      const orcamentoSnapshot = await getDocs(q);
      const historicoList = orcamentoSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Atualiza o estado com os novos documentos
      setHistorico(prev => [...prev, ...historicoList]);

      // Atualiza o último documento para a próxima busca
      if (!orcamentoSnapshot.empty) {
        setLastDoc(orcamentoSnapshot.docs[orcamentoSnapshot.docs.length - 1]);
      }

      // Checa se há mais documentos para carregar
      setHasMore(orcamentoSnapshot.docs.length === LIMIT);

    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setError('Erro ao carregar histórico de orçamentos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarHistorico();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** =======================
   * Excluir orçamento
   * ======================= */
  const handleExcluirOrcamento = (orcamento) => {
    abrirModal({
      title: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir o orçamento de ${
        orcamento.cliente || 'cliente desconhecido'
      } (OS: ${orcamento.ordemServico || '-'})?`,
      confirmText: 'Sim, excluir',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm: async () => {
        fecharModal();
        try {
          const docRef = doc(db, 'orcamentos', orcamento.id);
          await deleteDoc(docRef);
          abrirModal({
            title: 'Sucesso',
            message: 'Orçamento excluído com sucesso!',
            confirmText: 'OK',
            showCancel: false,
            onConfirm: () => fecharModal(),
          });
          // Reinicia a busca do histórico
          setHistorico([]);
          setLastDoc(null);
          setHasMore(true);
          buscarHistorico();
        } catch (err) {
          console.error('Erro ao excluir orçamento:', err);
          abrirModal({
            title: 'Erro',
            message: 'Erro ao excluir orçamento.',
            confirmText: 'Fechar',
            showCancel: false,
            onConfirm: () => fecharModal(),
          });
        }
      },
      onCancel: fecharModal,
    });
  };

  /** =======================
   * Helpers
   * ======================= */
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

  /** =======================
   * Renderização
   * ======================= */
  if (loading && historico.length === 0) return <div className="loading-message">Carregando histórico...</div>;
  if (error) return (
    <div className="error-message">
      {error}
      <button className="retry-btn" onClick={() => setError(null) || buscarHistorico()}>
        Tentar novamente
      </button>
    </div>
  );
  if (historico.length === 0 && !loading) return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

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
            {historico.map(orcamento => (
              <tr key={orcamento.id}>
                <td>{orcamento.ordemServico || '-'}</td>
                <td>{orcamento.cliente}</td>
                <td>{orcamento.veiculo || '-'}</td>
                <td>{orcamento.tipo}</td>
                <td>R$ {Number(orcamento.valorTotal || 0).toFixed(2)}</td>
                <td>{formatarData(orcamento.data)}</td>
                <td><span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>{orcamento.status || 'Aberto'}</span></td>
                <td>
                  {getImagemUrl(orcamento) ? (
                    <a href={getImagemUrl(orcamento)} target="_blank" rel="noopener noreferrer" title="Clique para ampliar">
                      <img src={getImagemUrl(orcamento)} alt="Imagem do orçamento" className="thumbnail-img" />
                    </a>
                  ) : '-'}
                </td>
                <td className="acoes-icones">
                  <button
                    onClick={() => {
                      const orcamentoCompleto = {
                        ...orcamento,
                        imagens: orcamento.imagens || (getImagemUrl(orcamento) ? [{ url: getImagemUrl(orcamento) }] : []),
                      };
                      onViewBudget(orcamentoCompleto);
                    }}
                    title="Visualizar"
                  >
                    <FaEye />
                  </button>
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
        {historico.map(orcamento => (
          <details key={orcamento.id} className="orcamento-card">
            <summary className="card-header">
              <h3>OS.: {orcamento.ordemServico || '-'}</h3>
              <span
                className={`status-tag ${getStatusTagClass(
                  orcamento.status
                )}`}
              >
                {orcamento.status || 'Aberto'}
              </span>
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
                    <img src={getImagemUrl(orcamento)} alt="Imagem do orçamento" className="card-img" />
                  </a>
                </div>
              )}
              <div className="card-acoes">
                <button
                  onClick={() => {
                    const orcamentoCompleto = {
                      ...orcamento,
                      imagens: orcamento.imagens || (getImagemUrl(orcamento) ? [{ url: getImagemUrl(orcamento) }] : []),
                    };
                    onViewBudget(orcamentoCompleto);
                  }}
                  className="action-btn view-btn"
                >
                  Visualizar
                </button>
                <button onClick={() => onEditarOrcamento(orcamento)} className="action-btn edit-btn">Editar</button>
                <button onClick={() => handleExcluirOrcamento(orcamento)} className="action-btn delete-btn">Excluir</button>
              </div>
            </div>
          </details>
        ))}
      </div>

      <CustomModal {...modalConfig} />

      {hasMore && !loading && (
        <div className="load-more">
          <button onClick={() => buscarHistorico(true)}>Carregar Mais</button>
        </div>
      )}

      {loading && historico.length > 0 && <div className="loading-more">Carregando mais...</div>}
    </div>
  );
};

export default HistoricoOrcamentos;