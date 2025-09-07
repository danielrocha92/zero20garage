// src/components/HistoricoOrcamentos.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db, authenticateUser } from '../services/firebaseOrcamentos'; // ✅ usa config de Orçamentos
import './HistoricoOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const PAGE_SIZE = 10;

// --- Modal Customizado ---
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

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

  const abrirModal = (config) =>
    setModalConfig({ ...modalConfig, isOpen: true, ...config });
  const fecharModal = () =>
    setModalConfig({ ...modalConfig, isOpen: false });

  // --- Buscar histórico do Firestore com paginação ---
  const buscarHistorico = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      await authenticateUser(); // ✅ garante auth anônima

      let q = query(
        collection(db, 'orcamentos'),
        orderBy('data', 'desc'),
        limit(PAGE_SIZE)
      );
      if (lastVisible) {
        q = query(
          collection(db, 'orcamentos'),
          orderBy('data', 'desc'),
          startAfter(lastVisible),
          limit(PAGE_SIZE)
        );
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setHistorico((prev) => [...prev, ...data]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(data.length === PAGE_SIZE);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setError('Erro ao carregar histórico de orçamentos.');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastVisible]);

  useEffect(() => {
    buscarHistorico();
  }, [buscarHistorico]);

  // --- Exclusão ---
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
          await deleteDoc(doc(db, 'orcamentos', orcamento.id));
          setHistorico((prev) =>
            prev.filter((h) => h.id !== orcamento.id)
          );
          abrirModal({
            title: 'Sucesso',
            message: 'Orçamento excluído com sucesso!',
            confirmText: 'OK',
            showCancel: false,
            onConfirm: fecharModal,
          });
        } catch (err) {
          console.error('Erro ao excluir orçamento:', err);
          abrirModal({
            title: 'Erro',
            message: 'Erro ao excluir orçamento.',
            confirmText: 'Fechar',
            showCancel: false,
            onConfirm: fecharModal,
          });
        }
      },
      onCancel: fecharModal,
    });
  };

  // --- Utilitários ---
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
    if (!data) return 'Data não disponível';
    let d = null;
    if (data instanceof Date) d = data;
    else if (data?._seconds)
      d = new Date(
        data._seconds * 1000 + (data._nanoseconds || 0) / 1000000
      );
    else d = new Date(data);
    return d && !isNaN(d.getTime())
      ? d.toLocaleString('pt-BR')
      : 'Data inválida';
  };

  const getImagemUrl = (orcamento) => {
    if (
      Array.isArray(orcamento.imagens) &&
      orcamento.imagens.length &&
      typeof orcamento.imagens[0]?.secure_url === 'string'
    ) {
      return orcamento.imagens[0].secure_url;
    }
    return orcamento.imagem?.url || orcamento.imageUrl || null;
  };

  // --- Render ---
  if (loading && historico.length === 0)
    return (
      <div className="loading-message">Carregando histórico...</div>
    );
  if (error && historico.length === 0)
    return <div className="error-message">{error}</div>;
  if (historico.length === 0)
    return (
      <div className="no-data-message">
        Nenhum orçamento encontrado.
      </div>
    );

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

      {/* --- Desktop --- */}
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
            {historico.map((orcamento) => (
              <tr key={orcamento.id}>
                <td>{orcamento.ordemServico || '-'}</td>
                <td>{orcamento.cliente}</td>
                <td>{orcamento.veiculo || '-'}</td>
                <td>{orcamento.tipo}</td>
                <td>
                  R$ {Number(orcamento.valorTotal).toFixed(2)}
                </td>
                <td>{formatarData(orcamento.data)}</td>
                <td>
                  <span
                    className={`status-tag ${getStatusTagClass(
                      orcamento.status
                    )}`}
                  >
                    {orcamento.status || 'Aberto'}
                  </span>
                </td>
                <td>
                  {getImagemUrl(orcamento) ? (
                    <a
                      href={getImagemUrl(orcamento)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={getImagemUrl(orcamento)}
                        alt="Imagem do orçamento"
                        style={{ width: '80px', borderRadius: '6px' }}
                        crossOrigin="anonymous"
                      />
                    </a>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="acoes-icones">
                  <button
                    onClick={() => onViewBudget(orcamento)}
                    title="Visualizar"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onEditarOrcamento(orcamento)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleExcluirOrcamento(orcamento)}
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile --- */}
      <div className="historico-mobile">
        {historico.map((orcamento) => (
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
                <strong>Valor Total:</strong> R${' '}
                {Number(orcamento.valorTotal).toFixed(2)}
              </p>
              <p>
                <strong>Data/Hora:</strong>{' '}
                {formatarData(orcamento.data)}
              </p>
              {getImagemUrl(orcamento) && (
                <div>
                  <a
                    href={getImagemUrl(orcamento)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={getImagemUrl(orcamento)}
                      alt="Imagem do orçamento"
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

      <CustomModal {...modalConfig} />

      {hasMore && !loading && (
        <div className="load-more">
          <button onClick={buscarHistorico}>Carregar Mais</button>
        </div>
      )}

      {loading && (
        <div className="loading-more">Carregando mais...</div>
      )}
    </div>
  );
};

export default HistoricoOrcamentos;
