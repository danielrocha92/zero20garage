// src/components/TotaisForm.jsx
import React from "react";
import { formatCurrency, parseCurrency } from "../hooks/useCurrencyFormatter";
import "./TotaisForm.css";

const TotaisForm = ({ totais, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, parseCurrency(value));
  };

  return (
    <div className="section">
      <h3>Totais</h3>
      <div className="form-group">
        <label>Valor total de Serviços:</label>
        <input
          type="text"
          value={formatCurrency(totais.servicos)}
          onChange={(e) => handleChange("servicos", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Valor total de Peças:</label>
        <input
          type="text"
          value={formatCurrency(totais.pecas)}
          onChange={(e) => handleChange("pecas", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Valor total de Mão de Obra Mecânica:</label>
        <input
          type="text"
          value={formatCurrency(totais.maoObra)}
          onChange={(e) => handleChange("maoObra", e.target.value)}
        />
      </div>

      <div className="form-group total">
        <strong>Valor total do Orçamento:</strong>
        <span>{formatCurrency(totais.servicos + totais.pecas + totais.maoObra)}</span>
      </div>
    </div>
  );
};

export default TotaisForm;