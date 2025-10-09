import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const ContatoCta = () => (
  <div className="highlight-item">
    <h2 className="titulo-claro">Nossos Canais de Atendimento</h2>
    <p className="subtitulo-claro">Escolha o canal que preferir para falar conosco:</p>
    <div className="contact-cards">
      <div className="contact-card">
        <FaWhatsapp className="contact-icon" />
        <a
          href="https://wa.me/5511941097471?text=Olá! Gostaria de mais informações sobre os serviços."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar mensagem via WhatsApp"
        >
          Fale pelo WhatsApp
        </a>
      </div>
      <div className="contact-card">
        <FaPhoneAlt className="contact-icon" />
        <a href="tel:+5511941097471" aria-label="Ligar para (11) 94109-7471">
          (11) 94109-7471
        </a>
      </div>
      <div className="contact-card">
        <FaEnvelope className="contact-icon" />
        <a href="mailto:contato@zero20garage.com">
          contato@zero20garage.com
        </a>
      </div>
          <div className="contact-card">
        <FaMapMarkerAlt className="contact-icon" />
        <a
          href="https://maps.app.goo.gl/tjceE5stfjGg3YNu7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Endereço da oficina"
        >
          Av. Laura Gomes Hannickel, 153<br />Capoavinha - Mairiporã, SP
        </a>
      </div>
    </div>
  </div>
);

export default ContatoCta;
