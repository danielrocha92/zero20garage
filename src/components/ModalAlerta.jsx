// src/components/ModalAlerta.jsx
import React from "react";
import "./ModalAlerta.css";

const ModalAlerta = ({ 
  titulo = "Atenção", 
  mensagem, 
  onFechar 
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>{titulo}</h3>
        <p>{mensagem}</p>

        <div className="modal-actions">
          <button className="btn-confirmar" onClick={onFechar}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlerta;