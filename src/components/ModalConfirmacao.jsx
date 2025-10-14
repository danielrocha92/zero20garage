// src/components/ModalConfirmacao.jsx
import React from "react";
import ReactDOM from "react-dom"; // Importe o ReactDOM
import "./ModalConfirmacao.css";

const ModalConfirmacao = ({
  titulo = "Confirmação",
  mensagem,
  onConfirmar,
  onCancelar,
}) => {
  // O JSX do modal que você já tem
  const modalContent = (
    <div className="confirmacao-modal-overlay">
      <div className="confirmacao-modal-container">
        <h3>{titulo}</h3>
        <p>{mensagem}</p>
        <div className="confirmacao-modal-actions">
          <button className="confirmacao-btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="confirmacao-btn-confirmar" onClick={onConfirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );

  // Use o Portal para renderizar o modal no div #modal-portal
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-portal")
  );
};

export default ModalConfirmacao;
