  import React, { useState } from 'react';
  import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
  import axios from 'axios'; // Mover para baixo para agrupar com o código que o usa
  import './Modal.css'; // Importa o CSS centralizado
  import './HistoricoOrcamentos.css';

  const CustomModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancelar', showCancel = false }) => {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <h3>{title}</h3>
          <p>{message}</p>
          <div className="modal-actions">
            {showCancel && <button onClick={onCancel} className="modal-btn cancel">{cancelText}</button>}
            <button onClick={onConfirm} className="modal-btn confirm">{confirmText}</button>
          </div>
        </div>
      </div>
    );
  };

  const HistoricoOrcamentos = ({ historico = [], hasMore = false, loading = false, fetchMore, onEditarOrcamento, onViewBudget, onOrcamentoDeleted, onClose }) => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: null, onCancel: null, confirmText: 'OK', cancelText: 'Cancelar', showCancel: false });

    const abrirModal = (config) => setModalConfig({ ...modalConfig, isOpen: true, ...config });
    const fecharModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos';

    const handleExcluirOrcamento = (orcamento) => {
      abrirModal({
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o orçamento de ${orcamento.cliente || 'cliente desconhecido'} (OS: ${orcamento.ordemServico || '-'})?`,
        confirmText: 'Sim, Excluir', showCancel: true,
        onConfirm: async () => {
          fecharModal();
          try {
            await axios.delete(`${API_BASE_URL}/${orcamento.id}`, {
              headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
            });
            onOrcamentoDeleted(orcamento.id); // Notifica o componente pai
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

  const formatarData = (data) => {
    if (!data) return 'Data não disponível';
    const d = new Date(data);
    if (isNaN(d.getTime())) return 'Data inválida';

    const dataFormatada = d.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const horaFormatada = d.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${dataFormatada} às ${horaFormatada}`;
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

    const handleEditar = async (orcamento) => {      const imagensPreload = await preloadImages(orcamento);
      onEditarOrcamento({ ...orcamento, imagens: imagensPreload });
    };

    if (loading && historico.length === 0) return <div className="loading-message">Carregando histórico...</div>;
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
        {hasMore && !loading && <div className="load-more"><button onClick={() => fetchMore(true)}>Carregar Mais</button></div>}
        {loading && historico.length > 0 && <div className="loading-more">Carregando mais...</div>}
      </div>
    );
  };

  export default HistoricoOrcamentos;
