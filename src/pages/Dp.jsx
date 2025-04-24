// dpnostico.jsx
import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './Dp.css'; // Importe o CSS para estilização

function Dp() {
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
    <div className="page-container">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <section className="content-section">
        <h2 className="section-title">
          Diagnóstico de Problemas no Motor
        </h2>
        <p className="section-paragraph">
          Diagnóstico preciso para identificar e resolver problemas no motor do seu veículo.
        </p>

        <h3 className="subPage-section-subtitle">
          Por que fazer um diagnóstico?
        </h3>
          <p className="section-paragraph">
            Um diagnóstico preciso é essencial para identificar a causa raiz dos problemas do seu veículo e evitar gastos desnecessários. Com o diagnóstico correto, você pode ter certeza de que está resolvendo o problema certo.
          </p>

          <h3 className="subPage-section-subtitle">
            O que inclui o diagnóstico?
          </h3>
          <ul className="section-list">
            <li>Diagnóstico eletrônico</li>
            <li>Teste de compressão</li>
            <li>Análise de gases</li>
            <li>Inspeção visual detalhada</li>
          </ul>

          <h3 className="subPage-section-subtitle">
            Agende seu diagnóstico
          </h3>
          <p className="section-paragraph">
            Não espere que os problemas se agravem. Agende agora mesmo o diagnóstico do seu veículo e garanta a sua segurança e tranquilidade.
          </p>
          <a href="/orcamento" className="button">
            Solicite um Orçamento
          </a>
        </section>
      </div>
  );
}

export default Dp;