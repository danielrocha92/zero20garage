// src/components/PainelOrcamentos.jsx
import React, { useState, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import HistoricoOrcamentos from './HistoricoOrcamentos';
import OrcamentoImpresso from './OrcamentoImpresso';
import './PainelOrcamentos.css';

const UploadImagemOrcamento = React.lazy(() => import('./UploadImagemOrcamento'));

const PainelOrcamentos = () => {
  const navigate = useNavigate();
  const historicoRef = useRef(null);

  const [tipo, setTipo] = useState('motor');
  const [editingData, setEditingData] = useState(null);
  const [selectedBudgetForView, setSelectedBudgetForView] = useState(null);

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const handleSalvar = async (dados) => {
    if (editingData?.id) {
      // Atualização de orçamento
      console.log('Atualizar orçamento:', editingData.id, dados);
    } else {
      // Criação de novo orçamento
      console.log('Criar novo orçamento:', dados);
    }
  };

  const handleLogout = () => { localStorage.removeItem('authToken'); navigate('/orcamento'); };
  const handleEditarOrcamento = (orcamento) => {
    setEditingData(orcamento);
    setTipo(orcamento.tipo === 'Geral' ? 'cabecote' : 'motor');
    setSelectedBudgetForView(null);
    setTimeout(() => document.getElementById('orcamento-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const handleViewBudget = (orcamento) => setSelectedBudgetForView(orcamento);
  const handleCloseView = () => setSelectedBudgetForView(null);
  const scrollToHistorico = () => historicoRef.current?.scrollIntoView({ behavior: 'smooth' });

  const imagensExistentes = (() => {
    if (!editingData) return [];
    if (Array.isArray(editingData.imagens) && editingData.imagens.length) return editingData.imagens;
    if (editingData.imagem) return [editingData.imagem];
    if (editingData.imageUrl) return [{ url: editingData.imageUrl, public_id: editingData.public_id }];
    return [];
  })();

  return (
    <div className='painel-orcamentos-container'>
      {selectedBudgetForView ? (
        <OrcamentoImpresso orcamento={selectedBudgetForView} onClose={handleCloseView} />
      ) : (
        <>
          <h1 className='titulo-escuro'>Painel de Orçamentos</h1>

          <nav className="tipo-orcamento-selector">
            <button onClick={() => { setTipo('motor'); setEditingData(null); }} className={tipo === 'motor' ? 'active' : ''}>
              Orçamento Motor Completo
            </button>
            <button onClick={() => { setTipo('cabecote'); setEditingData(null); }} className={tipo === 'cabecote' ? 'active' : ''}>
              Orçamento Cabeçote
            </button>
            <button onClick={scrollToHistorico}>Histórico de Orçamentos</button>
            <button onClick={handleLogout}>Sair</button>
          </nav>

          <main className="orcamento-form-wrapper mt-24" id="orcamento-form">
            {tipo === 'motor'
              ? <OrcamentoMotorCompleto onSubmit={handleSalvar} editingData={editingData} />
              : <OrcamentoCabecote onSubmit={handleSalvar} editingData={editingData} />
            }

            <Suspense fallback={<div>Carregando upload de imagem...</div>}>
              <UploadImagemOrcamento
                orcamentoId={editingData?.id}
                authToken={authToken}
                imagemAtual={imagensExistentes}
                onUploaded={async (imgs) => {
                  if (editingData) setEditingData(prev => prev ? { ...prev, imagens: imgs } : prev);
                }}
              />
            </Suspense>
          </main>

          <div ref={historicoRef}>
            <HistoricoOrcamentos
              onEditarOrcamento={handleEditarOrcamento}
              onViewBudget={handleViewBudget}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PainelOrcamentos;
