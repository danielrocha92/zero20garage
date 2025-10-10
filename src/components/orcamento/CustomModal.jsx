import React from 'react';
import '../../styles/Modal.css'; // Importa o CSS centralizado

const CustomModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancelar',
  showCancel = false,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          {showCancel && <button onClick={onCancel} className="modal-btn cancel">{cancelText}</button>}
          <button onClick={onConfirm} className="modal-btn confirm">{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;