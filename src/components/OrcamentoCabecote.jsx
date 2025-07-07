import React from "react";
import "../pages/orcamento/Orcamento.css";

const OrcamentoCabecote = () => {
  return (
    <div className="orcamento-impresso-container">
      <div className="header-info">
        <div className="client-data">
          {/* Coloque aqui os dados do cliente */}
          <p>Nome: João da Silva</p>
          <p>Veículo: Gol 1.0</p>
          <p>Data: 07/07/2025</p>
        </div>
      </div>
      {/* Continue o layout aqui */}
    </div>
  );
};

export default OrcamentoCabecote;
