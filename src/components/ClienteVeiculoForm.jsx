// src/components/ClienteVeiculoForm.jsx
import React from "react";
import "./ClienteVeiculoForm.css"; // Importa o CSS atualizado

const ClienteVeiculoForm = ({ formData, handleChange }) => {
  return (
    <div className="section">
      <h3>Dados do Cliente & Veículo</h3>

      <div className="form-grid">
        {/* Linha 1 no Mobile */}
        <div className="form-group">
          <label>OS:</label>
          <input
            type="text"
            name="os"
            value={formData.os}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Cliente:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Linha 2 no Mobile */}
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Veículo:</label>
          <input
            type="text"
            name="veiculo"
            value={formData.veiculo}
            onChange={handleChange}
            placeholder="Modelo / Ano"
            required
          />
        </div>

        {/* Linha 3 no Mobile */}
        <div className="form-group">
          <label>Placa:</label>
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
          <label>Telefone:</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ClienteVeiculoForm;