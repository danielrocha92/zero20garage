import React from 'react';
import { dadosOrcamento } from '../components/dadosOrcamento';
import OrcamentoGenerico from './OrcamentoGenerico';

const OrcamentoCabecote = ({ onSubmit, editingData, showMessage, hideMessageBox, message, isErrorMessage }) => {
  return (
    <OrcamentoGenerico
      onSubmit={onSubmit}
      editingData={editingData}
      showMessage={showMessage}
      hideMessageBox={hideMessageBox}
      message={message}
      isErrorMessage={isErrorMessage}
      orcamentoData={dadosOrcamento.cabecote}
      titulo="ORÇAMENTO - CABEÇOTE"
    />
  );
};

export default OrcamentoCabecote;
