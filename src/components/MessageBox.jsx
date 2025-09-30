// src/components/MessageBox.jsx
import React from "react";
import "./OrcamentoGenerico.css";

const MessageBox = ({ message, isError, onClose }) => {
  if (!message) return null;

  return (
    <div className={`message-box ${isError ? "error" : "success"}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default MessageBox;