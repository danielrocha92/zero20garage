import React from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import WhatsAppButton from '../../components/WhatsAppButton';
import './Contato.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

function Contato() {
  const messages = [
    {
      title: 'Fale Conosco',
      subtitle: 'Estamos prontos para atender você',
    },
    {
      title: 'Entre em Contato',
      subtitle: 'Tire suas dúvidas ou agende um serviço',
    },
    {
      title: 'Estamos Aqui',
      subtitle: 'Visite nossa oficina ou fale conosco pelos canais abaixo',
    },
  ];

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container-escuro">
        {/* Seção de Contato */}
        <section className="section">
          <div className="highlight-item">
            <h2 className="title">Nossos Canais de Atendimento</h2>
            <p>Escolha o canal que preferir para falar conosco:</p>
            <div className="contact-cards">
              <div className="contact-card">
                <FaMapMarkerAlt className="contact-icon" />
                <a
                  href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Endereço da oficina"
                >
                  Av. Laura Gomes Hannickel, 153<br />Capoavinha - Mairiporã, SP
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
            </div>
          </div>
        </section>

        {/* Seção do Mapa */}
        <section className="section">
          <div className="highlight-item">
            <h2 className="title">Onde Estamos</h2>
            <p>Venha nos visitar ou encontre facilmente no Google Maps:</p>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.799744734953!2d-46.5745093!3d-23.3263499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceede375ca12c9%3A0xa22173d27f744745!2sZERO%2020%20GARAGE!5e0!3m2!1spt-BR!2sbr!4v1711478418134!5m2!1spt-BR!2sbr"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Zero20 Garage"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contato;
