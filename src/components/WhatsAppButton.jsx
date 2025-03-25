// components/WhatsAppButton.js
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css"; // Importando o CSS

const WhatsAppButton = () => {
  const phoneNumber = "5511941097471"; // Substitua pelo número desejado

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;
