import React from 'react';
import { dadosOrcamento } from '../../components/dadosOrcamento.js';
import OrcamentoGenerico from '../OrcamentoGenerico.jsx';

const OrcamentoServicosDiversos = ({ onSubmit, editingData, showMessage, hideMessageBox, message, isErrorMessage }) => {
  return (
    <OrcamentoGenerico
      onSubmit={onSubmit}
      editingData={editingData}
      showMessage={showMessage}
      hideMessageBox={hideMessageBox}
      message={message}
      isErrorMessage={isErrorMessage}
      orcamentoData={dadosOrcamento.servicosDiversos}
      titulo="ORÇAMENTO - SERVIÇOS DIVERSOS"
    />
  );
};

export default OrcamentoServicosDiversos;
