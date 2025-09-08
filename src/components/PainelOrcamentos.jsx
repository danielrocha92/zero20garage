/* global __app_id, __firebase_config, __initial_auth_token */
import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './PainelOrcamentos.css';

/* Importando os outros componentes */
import FormularioOrcamento from './FormularioOrcamento';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoGenerico from './OrcamentoGenerico';
import OrcamentoImpresso from './OrcamentoImpresso';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import UploadImagemOrcamento from './UploadImagemOrcamento';

// Variáveis globais fornecidas pelo ambiente Canvas
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

const PAGE_SIZE = 10;

// Configuração e Inicialização do Firebase
setLogLevel('debug');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

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

const PainelOrcamentos = () => {
    const [orcamentos, setOrcamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
    const [viewMode, setViewMode] = useState("lista");
    // modos: "lista", "formulario", "visualizar", "imprimir", "upload"

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

    /* --- Autenticação --- */
    useEffect(() => {
        const handleAuth = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (err) {
                console.error("Erro na autenticação:", err);
                setError("Erro na autenticação. Verifique as credenciais.");
            }
        };

        const unsubscribe = auth.onAuthStateChanged(authUser => {
            setUser(authUser);
            setIsAuthReady(true);
        });

        handleAuth();
        return () => unsubscribe();
    }, []);

    /* --- Buscar orçamentos --- */
    const buscarOrcamentos = useCallback(async () => {
        if (loading || !hasMore || !user) return;
        setLoading(true);
        setError(null);

        const collectionPath = `/artifacts/${appId}/users/${user.uid}/orcamentos`;

        try {
            let q = query(
                collection(db, collectionPath),
                orderBy('data', 'desc'),
                limit(PAGE_SIZE)
            );

            if (lastVisible) {
                q = query(
                    collection(db, collectionPath),
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

    useEffect(() => {
        if (isAuthReady && user) {
            setOrcamentos([]);
            setLastVisible(null);
            setHasMore(true);
            buscarOrcamentos();
        }
    }, [isAuthReady, user, buscarOrcamentos]);

    /* --- Exclusão --- */
    const handleExcluirOrcamento = (orcamento) => {
        abrirModal({
            title: 'Confirmar Exclusão',
            message: `Deseja excluir o orçamento de ${orcamento.cliente || 'cliente'} (OS: ${orcamento.ordemServico || '-'})?`,
            confirmText: 'Sim, excluir',
            cancelText: 'Cancelar',
            showCancel: true,
            onConfirm: async () => {
                fecharModal();
                try {
                    const docPath = `/artifacts/${appId}/users/${user.uid}/orcamentos/${orcamento.id}`;
                    await deleteDoc(doc(db, docPath));
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

    /* --- Funções de utilidade --- */
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

    /* --- Renderização condicional --- */
    if (!isAuthReady) return <div className="loading-message">Iniciando sessão...</div>;
    if (!user) return <div className="error-message">Erro de autenticação. Por favor, tente novamente.</div>;

    return (
        <div className="painel-orcamentos">
            <h2>Painel de Orçamentos</h2>
            <div className="user-info">Usuário: {user.uid}</div>

            {viewMode === "lista" && (
                <>
                    {/* Tabela e cards mobile */}
                    {/* ... (sua tabela atual permanece aqui) ... */}

                    {/* Histórico */}
                    <HistoricoOrcamentos />

                    {hasMore && !loading && (
                        <div className="load-more">
                            <button onClick={buscarOrcamentos}>Carregar Mais</button>
                        </div>
                    )}
                    {loading && <div className="loading-more">Carregando mais...</div>}
                </>
            )}

            {viewMode === "formulario" && (
                <FormularioOrcamento
                    orcamento={orcamentoSelecionado}
                    onCancel={() => setViewMode("lista")}
                />
            )}

            {viewMode === "visualizar" && orcamentoSelecionado && (
                <OrcamentoGenerico
                    orcamento={orcamentoSelecionado}
                    onClose={() => setViewMode("lista")}
                />
            )}

            {viewMode === "imprimir" && orcamentoSelecionado && (
                <OrcamentoImpresso
                    orcamento={orcamentoSelecionado}
                    onClose={() => setViewMode("lista")}
                />
            )}

            {viewMode === "upload" && orcamentoSelecionado && (
                <UploadImagemOrcamento
                    orcamento={orcamentoSelecionado}
                    onClose={() => setViewMode("lista")}
                />
            )}

            <CustomModal {...modalConfig} />
        </div>
    );
};

export default PainelOrcamentos;
