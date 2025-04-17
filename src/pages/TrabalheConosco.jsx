// dpnostico.jsx
import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './TrabalheConosco.css'; // Importe o CSS para estilização

function TrabalheConosco() {
  const messages = [
    {
      title: 'Junte-se à Nossa Equipe',
      subtitle: 'Se você é motivado, criativo e busca um ambiente de trabalho colaborativo, queremos conhecer você!',
    },
    {
      title: 'Como Se Candidatar',
      subtitle: 'Para se candidatar a uma de nossas vagas, envie seu currículo!',
    },
  ];

  return (
    <div className="container">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <div className="content-section">
        <h2 className="section-title">Trabalhe Conosco</h2>
        <h3>Envie seu currículo e faça parte da nossa equipe.</h3>
      </div>
    </div>
  );
}

export default TrabalheConosco;