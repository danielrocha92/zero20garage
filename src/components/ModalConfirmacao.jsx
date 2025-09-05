// src/components/ModalConfirmacao.jsx
import React from "react";
import "./ModalConfirmacao.css";

const ModalConfirmacao = ({ 
  titulo = "Confirmação", 
  mensagem, 
  onConfirmar, 
  onCancelar 
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{titulo}</h3>
        <p>{mensagem}</p>

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn-confirmar" onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;