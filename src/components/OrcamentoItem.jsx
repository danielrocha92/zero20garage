// src/components/OrcamentoItem.jsx
import React from "react";
import "./OrcamentoItem.css";

const OrcamentoItem = ({ nome, subitens = [], obs = "", qtd = "" }) => {
  const temSubitens = subitens && subitens.length > 0;
  const temObs = obs && obs.trim() !== "";
  const temQtd = qtd && qtd.toString().trim() !== "";

  return (
    <div className="orcamento-item">
      {/* Nome do item principal */}
      <h3 className="item-nome">
        <span className="bullet">●</span> {nome}
      </h3>

      {/* Lista de subitens */}
      {temSubitens && (
        <ul className="subitens">
          {subitens.map((sub, i) => (
            <li key={i}>
              <span className="bullet">●</span> {sub}
            </li>
          ))}
        </ul>
      )}

      {/* Observação */}
      {temObs && (
        <div className="linha">
          <span className="label">Obs:</span>
          <span className="valor">{obs}</span>
        </div>
      )}

      {/* Quantidade */}
      {temQtd && (
        <div className="linha">
          <span className="label">Qtd:</span>
          <span className="valor">{qtd}</span>
        </div>
      )}
    </div>
  );
};

export default OrcamentoItem;