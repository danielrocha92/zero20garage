import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { __firebase_config, __initial_auth_token } from './firebase-config';
import './PainelOrcamentos.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const PAGE_SIZE = 10;

// Configuração e Inicialização do Firebase
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Modal Customizado
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
                    {showCancel && <button onClick={onCancel} className="cancel-btn">{cancelText}</button>}
                    <button onClick={onConfirm} className="confirm-btn">{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

const PainelOrcamentos = ({ onEditarOrcamento, onViewBudget }) => {
    const [orcamentos, setOrcamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

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

    // Lógica de Autenticação
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                try {
                    if (__initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth);
                    }
                    setUser(auth.currentUser);
                } catch (error) {
                    console.error("Erro na autenticação:", error);
                    setError("Erro na autenticação. Verifique as credenciais.");
                }
            }
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    // --- Buscar orçamentos do Firestore com paginação ---
    const buscarOrcamentos = useCallback(async () => {
        if (loading || !hasMore || !user) return; // Garante que a busca só ocorra se o usuário estiver autenticado
        setLoading(true);
        setError(null);

        try {
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
            const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));

            setOrcamentos(prev => [...prev, ...data]);
            setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
            setHasMore(data.length === PAGE_SIZE);
        } catch (err) {
            console.error('Erro ao buscar orçamentos:', err);
            setError('Erro ao carregar os orçamentos.');
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, lastVisible, user]);

    // Chama a função de busca após o estado de autenticação ser confirmado
    useEffect(() => {
        if (isAuthReady && user) {
            buscarOrcamentos();
        }
    }, [isAuthReady, user, buscarOrcamentos]);

    // --- Exclusão ---
    const handleExcluirOrcamento = (orcamento) => {
        abrirModal({
            title: 'Confirmar Exclusão',
            message: `Deseja excluir o orçamento de ${orcamento.cliente || 'cliente desconhecido'} (OS: ${orcamento.ordemServico || '-'})?`,
            confirmText: 'Sim, excluir',
            cancelText: 'Cancelar',
            showCancel: true,
            onConfirm: async () => {
                fecharModal();
                try {
                    await deleteDoc(doc(db, 'orcamentos', orcamento.id));
                    setOrcamentos(prev => prev.filter(o => o.id !== orcamento.id));
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

    // --- Funções utilitárias ---
    const getStatusTagClass = (status) => {
        switch (status) {
            case 'Aberto': return 'amarelo';
            case 'Concluído': return 'verde';
            case 'Cancelado': return 'vermelho';
            default: return '';
        }
    };

    const formatarData = (data) => {
        if (!data) return 'Data não disponível';
        let d = null;
        if (data instanceof Date) d = data;
        else if (data?._seconds) d = new Date(data._seconds * 1000 + (data._nanoseconds || 0) / 1000000);
        else d = new Date(data);
        return d && !isNaN(d.getTime()) ? d.toLocaleString('pt-BR') : 'Data inválida';
    };

    const getImagemUrl = (orcamento) => {
        if (Array.isArray(orcamento.imagens) && orcamento.imagens.length && typeof orcamento.imagens[0]?.secure_url === 'string') {
            return orcamento.imagens[0].secure_url;
        }
        return orcamento.imagem?.url || orcamento.imageUrl || null;
    };

    if (!isAuthReady) return <div className="loading-message">Iniciando sessão...</div>;
    if (loading && orcamentos.length === 0) return <div className="loading-message">Carregando orçamentos...</div>;
    if (error && orcamentos.length === 0) return <div className="error-message">{error}</div>;
    if (orcamentos.length === 0) return <div className="no-data-message">Nenhum orçamento encontrado.</div>;

    return (
        <div className="painel-orcamentos">
            <h2>Painel de Orçamentos</h2>

            {/* Desktop */}
            <div className="painel-desktop">
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
                        {orcamentos.map(o => (
                            <tr key={o.id}>
                                <td>{o.ordemServico || '-'}</td>
                                <td>{o.cliente}</td>
                                <td>{o.veiculo || '-'}</td>
                                <td>{o.tipo}</td>
                                <td>R$ {Number(o.valorTotal).toFixed(2)}</td>
                                <td>{formatarData(o.data)}</td>
                                <td><span className={`status-tag ${getStatusTagClass(o.status)}`}>{o.status || 'Aberto'}</span></td>
                                <td>
                                    {getImagemUrl(o) ? (
                                        <a href={getImagemUrl(o)} target="_blank" rel="noopener noreferrer">
                                            <img src={getImagemUrl(o)} alt="Imagem do orçamento" style={{ width: '80px', borderRadius: '6px' }} crossOrigin="anonymous" />
                                        </a>
                                    ) : '-'}
                                </td>
                                <td className="acoes-icones">
                                    <button onClick={() => onViewBudget(o)} title="Visualizar"><FaEye /></button>
                                    <button onClick={() => onEditarOrcamento(o)} title="Editar"><FaEdit /></button>
                                    <button onClick={() => handleExcluirOrcamento(o)} title="Excluir"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="painel-mobile">
                {orcamentos.map(o => (
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

            {hasMore && !loading && (
                <div className="load-more">
                    <button onClick={buscarOrcamentos}>Carregar Mais</button>
                </div>
            )}

            {loading && <div className="loading-more">Carregando mais...</div>}
        </div>
    );
};

export default PainelOrcamentos;
