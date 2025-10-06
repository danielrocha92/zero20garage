import React from 'react';
import { dadosOrcamento } from '../components/dadosOrcamento';
import OrcamentoGenerico from './OrcamentoGenerico';

const OrcamentoCabecote = ({
  onSubmit,
  editingData,
  showMessage,
  hideMessageBox,
  message, // <-- Recebe a mensagem do pai
  isErrorMessage // <-- Recebe se é erro
}) => {
  return (
    <OrcamentoGenerico
      onSubmit={onSubmit}
      editingData={editingData}
      showMessage={showMessage}
      hideMessageBox={hideMessageBox}
      message={message} // <-- Repassa a mensagem para o filho
      isErrorMessage={isErrorMessage} // <-- Repassa se é erro
      orcamentoData={dadosOrcamento.cabecote}
      titulo="ORÇAMENTO - CABEÇOTE"
    />
  );
};

export default OrcamentoCabecote;