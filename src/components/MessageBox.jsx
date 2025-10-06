import React from "react";
import "./MessageBox.css";

const MessageBox = ({ message, isError, onClose }) => {
  // Se não houver mensagem, o componente não renderiza nada
  if (!message) {
    return null;
  }

  return (
    <div className={`message-box ${isError ? "error" : "success"}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default MessageBox;