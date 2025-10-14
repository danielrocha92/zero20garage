import React from "react";
import "./ModalConfirmacao.css";

const ModalConfirmacao = ({
  titulo = "Confirmação",
  mensagem,
  onConfirmar,
  onCancelar,
}) => {
  return (
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
};

export default ModalConfirmacao;
