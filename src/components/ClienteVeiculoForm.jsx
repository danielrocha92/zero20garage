// src/components/ClienteVeiculoForm.jsx
import React from "react";
import "./OrcamentoGenerico.css";

const ClienteVeiculoForm = ({ formData, handleChange }) => {
  return (
    <div className="section">
      <h3>Dados do Cliente & Veículo</h3>
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(11) 99999-9999"
          required
        />
      </div>

      <div className="form-group">
        <label>Placa</label>
        <input
          type="text"
          name="placa"
          value={formData.placa}
          onChange={handleChange}
          placeholder="ABC-1234"
          required
        />
      </div>

      <div className="form-group">
        <label>Veículo</label>
        <input
          type="text"
          name="veiculo"
          value={formData.veiculo}
          onChange={handleChange}
          placeholder="Modelo / Ano"
          required
        />
      </div>
    </div>
  );
};

export default ClienteVeiculoForm;