import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config.js'; // Caminho de importação corrigido
import './HistoricoOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Modal Customizado
const CustomModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancelar', showCancel = false }) => {
  if (!isOpen) return null;
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          {showCancel && <button onClick={onCancel} className="cancel-btn">{cancelText}</button>}
          <button onClick={onConfirm} className="confirm-btn">{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

const HistoricoOrcamentos = ({ onEditarOrcamento, onViewBudget, onClose }) => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false, title: '', message: '', onConfirm: null, onCancel: null, confirmText: 'OK', cancelText: 'Cancelar', showCancel: false
  });

  const abrirModal = (config) => setModalConfig({ ...modalConfig, isOpen: true, ...config });
  const fecharModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  // Buscar todo o histórico de uma vez
  const buscarHistorico = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Cria uma consulta sem orderBy para evitar a necessidade de índices.
      const q = query(collection(db, 'orcamentos'));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setHistorico(docs);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      setError('Erro ao carregar histórico de orçamentos. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarHistorico();
  }, [buscarHistorico]);

  // Excluir orçamento
  const handleExcluirOrcamento = (orcamento) => {
    abrirModal({
      title: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir o orçamento de ${orcamento.cliente || 'cliente desconhecido'} (OS: ${orcamento.ordemServico || '-'})?`,
      confirmText: 'Sim, excluir',
      showCancel: true,
      onConfirm: async () => {
        fecharModal();
        try {
          await deleteDoc(doc(db, 'orcamentos', orcamento.id));
          setHistorico(prev => prev.filter(h => h.id !== orcamento.id));
          abrirModal({ title: 'Sucesso', message: 'Orçamento excluído com sucesso!', confirmText: 'OK', onConfirm: fecharModal });
        } catch (err) {
          console.error('Erro ao excluir orçamento:', err);
          abrirModal({ title: 'Erro', message: 'Não foi possível excluir o orçamento.', confirmText: 'Fechar', onConfirm: fecharModal });
        }
      },
      onCancel: fecharModal
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
    const d = data.seconds ? new Date(data.seconds * 1000) : new Date(data);
    return d.toLocaleString('pt-BR');
  };

  const getImagemUrl = (orcamento) => {
    if (Array.isArray(orcamento.imagens) && orcamento.imagens.length) return orcamento.imagens[0].secure_url || orcamento.imagens[0].url;
    return orcamento.imagem?.url || orcamento.imageUrl || null;
  };

  // Ordena os dados localmente
  const historicoOrdenado = [...historico].sort((a, b) => new Date(b.data) - new Date(a.data));

  if (loading && historico.length === 0) return <div className="loading-message">Carregando histórico...</div>;
  if (error && historico.length === 0) return <div className="error-message">{error}</div>;
  if (historicoOrdenado.length === 0) return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

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
              <th>OS.</th><th>Cliente</th><th>Veículo</th><th>Tipo</th><th>Valor Total</th><th>Data/Hora</th><th>Status</th><th>Imagem</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {historicoOrdenado.map(o => (
              <tr key={o.id}>
                <td>{o.ordemServico || '-'}</td>
                <td>{o.cliente}</td>
                <td>{o.veiculo || '-'}</td>
                <td>{o.tipo}</td>
                <td>R$ {Number(o.valorTotal).toFixed(2)}</td>
                <td>{formatarData(o.data)}</td>
                <td><span className={`status-tag ${getStatusTagClass(o.status)}`}>{o.status || 'Aberto'}</span></td>
                <td>
                  {getImagemUrl(o) ? <a href={getImagemUrl(o)} target="_blank" rel="noopener noreferrer">
                    <img src={getImagemUrl(o)} alt="Orçamento" style={{ width: 80, borderRadius: 6 }} crossOrigin="anonymous" />
                  </a> : '-'}
                </td>
                <td className="acoes-icones">
                  <button onClick={() => onViewBudget(o)}><FaEye /></button>
                  <button onClick={() => onEditarOrcamento(o)}><FaEdit /></button>
                  <button onClick={() => handleExcluirOrcamento(o)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="historico-mobile">
        {historicoOrdenado.map(o => (
          <details key={o.id} className="orcamento-card">
            <summary className="card-header">
              <h3>OS.: {o.ordemServico || '-'}</h3>
              <span className={`status-tag ${getStatusTagClass(o.status)}`}>{o.status || 'Aberto'}</span>
            </summary>
            <div className="card-content">
              <p><strong>Cliente:</strong> {o.cliente}</p>
              <p><strong>Veículo:</strong> {o.veiculo || '-'}</p>
              <p><strong>Tipo:</strong> {o.tipo}</p>
              <p><strong>Valor Total:</strong> R$ {Number(o.valorTotal).toFixed(2)}</p>
              <p><strong>Data/Hora:</strong> {formatarData(o.data)}</p>
              {getImagemUrl(o) && (
                <div>
                  <a href={getImagemUrl(o)} target="_blank" rel="noopener noreferrer">
                    <img src={getImagemUrl(o)} alt="Imagem do orçamento" crossOrigin="anonymous" />
                  </a>
                </div>
              )}
              <div className="card-acoes">
                <button onClick={() => onViewBudget(o)} className="action-btn view-btn">Visualizar</button>
                <button onClick={() => onEditarOrcamento(o)} className="action-btn edit-btn">Editar</button>
                <button onClick={() => handleExcluirOrcamento(o)} className="action-btn delete-btn">Excluir</button>
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
