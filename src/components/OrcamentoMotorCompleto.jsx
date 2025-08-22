import React from 'react';
import { dadosOrcamento } from '../components/dadosOrcamento';
import OrcamentoGenerico from './OrcamentoGenerico';

const OrcamentoMotorCompleto = ({ onSubmit, editingData, showMessage, hideMessageBox, message, isErrorMessage }) => {
  return (
    <OrcamentoGenerico
      onSubmit={onSubmit}
      editingData={editingData}
      showMessage={showMessage}
      hideMessageBox={hideMessageBox}
      message={message}
      isErrorMessage={isErrorMessage}
      orcamentoData={dadosOrcamento.motorCompleto}
      titulo="ORÇAMENTO - MOTOR COMPLETO/PARCIAL"
    />
  );
};

export default OrcamentoMotorCompleto;