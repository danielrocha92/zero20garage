import React from 'react';
import { dadosOrcamento } from '../../components/dadosOrcamento.js';
import OrcamentoGenerico from '../OrcamentoGenerico.jsx';

const OrcamentoTrocaDeOleo = ({ onSubmit, editingData, showMessage, hideMessageBox, message, isErrorMessage }) => {
  return (
    <OrcamentoGenerico
      onSubmit={onSubmit}
      editingData={editingData}
      showMessage={showMessage}
      hideMessageBox={hideMessageBox}
      message={message}
      isErrorMessage={isErrorMessage}
      orcamentoData={dadosOrcamento.trocaDeOleo}
      titulo="ORÇAMENTO - TROCA DE ÓLEO"
    />
  );
};

export default OrcamentoTrocaDeOleo;
