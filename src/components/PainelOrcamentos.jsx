import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';

const PainelOrcamentos = () => {
  const [tipo, setTipo] = useState('motor'); // motor | cabecote

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  return (
    <div className="painel-orcamento">
      <h1>Painel de Orçamentos</h1>

      <select value={tipo} onChange={handleTipoChange}>
        <option value="motor">Motor Completo</option>
        <option value="cabecote">Cabeçote</option>
      </select>

      <div className="orcamento-dinamico">
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto />
        ) : (
          <OrcamentoCabecote />
        )}
      </div>
    </div>
  );
};

export default PainelOrcamentos;