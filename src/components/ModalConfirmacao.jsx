import React from "react";
import ReactDOM from "react-dom"; // 1. Importe o ReactDOM
import "./ModalAlerta.css";

const ModalAlerta = ({ 
  titulo = "Atenção", 
  mensagem, 
  onFechar 
}) => {
  // 2. O JSX do seu modal
  const modalContent = (
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

  // 3. Renderize o conteúdo usando o portal
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-portal")
  );
};

export default ModalAlerta;
