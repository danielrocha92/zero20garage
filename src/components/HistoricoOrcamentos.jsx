  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './HistoricoOrcamentos.css';
  import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

  const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos';
  const PAGE_SIZE = 10;

  // --- Modal Customizado ---
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

  const HistoricoOrcamentos = ({ historico: historicoProp = [], fetchMore, hasMore: hasMoreProp = true, loading: loadingProp = false, onEditarOrcamento, onViewBudget, onClose }) => {
    const [historico, setHistorico] = useState(historicoProp);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastDocId, setLastDocId] = useState(null);
    const [hasMore, setHasMore] = useState(hasMoreProp);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: null, onCancel: null, confirmText: 'OK', cancelText: 'Cancelar', showCancel: false });

    const abrirModal = (config) => setModalConfig({ ...modalConfig, isOpen: true, ...config });
    const fecharModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    // --- Buscar histórico via cursor ---
    const buscarHistorico = async () => {
      if (loading) return;
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${API_BASE_URL}`, {
          params: { size: PAGE_SIZE, lastId: lastDocId || undefined },
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        });

        const data = res.data;
        const novosOrcamentos = data.orcamentos?.map(orc => ({ ...orc, imagens: orc.imagens || [] })) || [];

        setHistorico(prev => {
          const combined = [...prev, ...novosOrcamentos];
          const unique = combined.filter((orc, index, self) => index === self.findIndex(o => o.id === orc.id));
          return unique;
        });

        setLastDocId(data.lastDocId);
        setHasMore(data.lastDocId !== null && novosOrcamentos.length > 0);
      } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        let mensagemErro = 'Erro ao carregar histórico de orçamentos.';
        if (err.response?.data?.erro) mensagemErro += ` Detalhes: ${err.response.data.erro}`;
        else if (err.message) mensagemErro += ` (${err.message})`;
        setError(mensagemErro);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      setHistorico(historicoProp);
      setHasMore(hasMoreProp);
      setLastDocId(null);
    }, [historicoProp, hasMoreProp]);

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
            await axios.delete(`${API_BASE_URL}/${orcamento.id}`, {
              headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
            });
            setHistorico(prev => prev.filter(h => h.id !== orcamento.id));
            abrirModal({ title: 'Sucesso', message: 'Orçamento excluído com sucesso!', confirmText: 'OK', showCancel: false, onConfirm: fecharModal });
          } catch (err) {
            console.error('Erro ao excluir orçamento:', err);
            let mensagemErro = 'Erro ao excluir orçamento.';
            if (err.response?.data?.erro) mensagemErro += ` Detalhes: ${err.response.data.erro}`;
            else if (err.message) mensagemErro += ` (${err.message})`;
            abrirModal({ title: 'Erro', message: mensagemErro, confirmText: 'Fechar', showCancel: false, onConfirm: fecharModal });
          }
        },
        onCancel: fecharModal,
      });
    };

    const getStatusTagClass = status => {
      switch (status) {
        case 'Aberto': return 'amarelo';
        case 'Concluído': return 'verde';
        case 'Cancelado': return 'vermelho';
        default: return '';
      }
    };

    const formatarData = data => {
      if (!data) return 'Data não disponível';
      let d = new Date(data);
      return !isNaN(d.getTime()) ? d.toLocaleString('pt-BR') : 'Data inválida';
    };

    // --- Corrigido: Obter URL da imagem ---
    const getImagemUrl = (orcamento) => {
      if (!orcamento?.imagens || orcamento.imagens.length === 0) return null;
      const img = orcamento.imagens[0];
      if (typeof img === 'string') return img;
      if (img?.imagemUrl) return img.imagemUrl;
      if (img?.url) return img.url;
      if (img?.uri) return img.uri;
      return null;
    };

    const preloadImages = async (orcamento) => {
      if (!orcamento?.imagens || orcamento.imagens.length === 0) return [];
      const loadedImages = await Promise.all(
        orcamento.imagens.map(async (img) => typeof img === 'string' ? img : img?.imagemUrl || img?.url || img?.uri || null)
      );
      return loadedImages.filter(Boolean);
    };

    const handleEditar = async (orcamento) => {
      const imagensPreload = await preloadImages(orcamento);
      onEditarOrcamento({ ...orcamento, imagens: imagensPreload });
    };

    if (loading && historico.length === 0) return <div className="loading-message">Carregando histórico...</div>;
    if (error && historico.length === 0) return <div className="error-message">{error}</div>;
    if (historico.length === 0) return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

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
          <th>OS.</th><th>Cliente</th><th>Veículo</th><th>Tipo</th><th>Valor Total</th>
          <th>Data/Hora</th><th>Status</th><th>Imagem</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {historico.map((orcamento, index) => (
          <tr key={`${orcamento.id}-${index}`}>
            <td>{orcamento.ordemServico || '-'}</td>
            <td>{orcamento.cliente}</td>
            <td>{orcamento.veiculo || '-'}</td>
            <td>{orcamento.tipo}</td>
            <td>R$ {Number(orcamento.valorTotal).toFixed(2)}</td>
            <td>{formatarData(orcamento.data)}</td>
            <td><span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>{orcamento.status || 'Aberto'}</span></td>
            <td>
              {getImagemUrl(orcamento) ? (
                <a href={getImagemUrl(orcamento)} target="_blank" rel="noopener noreferrer">
                  <img
                    src={getImagemUrl(orcamento)}
                    alt="Imagem"
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                </a>
              ) : '-'}
            </td>
            <td className="acoes-icones">
              <button onClick={() => onViewBudget(orcamento)} title="Visualizar"><FaEye /></button>
              <button onClick={() => handleEditar(orcamento)} title="Editar"><FaEdit /></button>
              <button onClick={() => handleExcluirOrcamento(orcamento)} title="Excluir"><FaTrash /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile */}
  <div className="historico-mobile">
    {historico.map((orcamento, index) => (
      <details key={`${orcamento.id}-${index}`} className="orcamento-card">
        <summary className="card-header">
          <h3>OS.: {orcamento.ordemServico || '-'}</h3>
          <span className={`status-tag ${getStatusTagClass(orcamento.status)}`}>{orcamento.status || 'Aberto'}</span>
        </summary>
        <div className="card-content">
          <p><strong>Cliente:</strong> {orcamento.cliente}</p>
          <p><strong>Veículo:</strong> {orcamento.veiculo || '-'}</p>
          <p><strong>Tipo:</strong> {orcamento.tipo}</p>
          <p><strong>Valor Total:</strong> R$ {Number(orcamento.valorTotal).toFixed(2)}</p>
          <p><strong>Data/Hora:</strong> {formatarData(orcamento.data)}</p>
          {getImagemUrl(orcamento) && (
            <div>
              <a href={getImagemUrl(orcamento)} target="_blank" rel="noopener noreferrer">
                <img
                  src={getImagemUrl(orcamento)}
                  alt="Imagem"
                  style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }}
                />
              </a>
            </div>
          )}
          <div className="card-acoes">
            <button onClick={() => onViewBudget(orcamento)} className="action-btn view-btn">Visualizar</button>
            <button onClick={() => handleEditar(orcamento)} className="action-btn edit-btn">Editar</button>
            <button onClick={() => handleExcluirOrcamento(orcamento)} className="action-btn delete-btn">Excluir</button>
          </div>
        </div>
      </details>
    ))}
  </div>


        {/* Modal */}
        <CustomModal {...modalConfig} />

        {/* Carregar mais */}
        {hasMore && !loading && <div className="load-more"><button onClick={buscarHistorico}>Carregar Mais</button></div>}
        {loading && historico.length > 0 && <div className="loading-more">Carregando mais...</div>}
      </div>
    );
  };

  export default HistoricoOrcamentos;
