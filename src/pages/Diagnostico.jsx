// Diagnostico.jsx
import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './Diagnostico.css'; // Importe o CSS para estilização

function Diagnostico() {
  const messages = [
    {
      title: 'Diagnóstico de Problemas',
      subtitle: 'Identifique e resolva problemas no motor do seu veículo',
    },
    {
      title: 'Equipamentos de Última Geração',
      subtitle: 'Diagnóstico preciso e rápido',
    },
  ];

  return (
    <div className="diagnostico-page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container">
      <section className="diag-info-section">
          <div className='diag-info-section'>
          <div className='diag-item'>
          <h2>Diagnóstico de Problemas</h2>
          <p>Diagnóstico preciso para identificar e resolver problemas no motor do seu veículo.</p>

          <h3>Por que fazer um diagnóstico?</h3>
          <p>Um diagnóstico preciso é essencial para identificar a causa raiz dos problemas do seu veículo e evitar gastos desnecessários. Com o diagnóstico correto, você pode ter certeza de que está resolvendo o problema certo.</p>

          <h3>O que inclui o diagnóstico?</h3>
          <ul>
            <li>Diagnóstico eletrônico</li>
            <li>Teste de compressão</li>
            <li>Análise de gases</li>
            <li>Inspeção visual detalhada</li>
          </ul>

          <h3>Agende seu diagnóstico</h3>
          <p>Não espere que os problemas se agravem. Agende agora mesmo o diagnóstico do seu veículo e garanta a sua segurança e tranquilidade.</p>
          <a href="/orcamento" className="cta-button">Solicite um Orçamento</a>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Diagnostico;