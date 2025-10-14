import React from "react";
import "./ModalAlerta.css"; // Importa o novo arquivo CSS

const ModalAlerta = ({ 
  titulo = "Atenção", 
  mensagem, 
  onFechar 
}) => {
  return (
    <div className="alerta-modal-overlay">
      <div className="alerta-modal-container">
        <h3>{titulo}</h3>
        <p>{mensagem}</p>

        <div className="alerta-modal-actions">
          <button className="alerta-btn-fechar" onClick={onFechar}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlerta;
