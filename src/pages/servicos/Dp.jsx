// dpnostico.jsx
import React from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';


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
    <div className="page-claro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <section className="footer-section">
        <h2 className="titulo-escuro">
          Diagnóstico de Problemas no Motor
        </h2>
        <p className="paragrafo-escuro">
          Diagnóstico preciso para identificar e resolver problemas no motor do seu veículo.
        </p>
        
      <section className="section">
        <h3 className="subtitulo-escuro">
          Por que fazer um diagnóstico?
        </h3>
          <p className="paragrafo-escuro">
            Um diagnóstico preciso é essencial para identificar a causa raiz dos problemas do seu veículo e evitar gastos desnecessários. Com o diagnóstico correto, você pode ter certeza de que está resolvendo o problema certo.
          </p>
        </section>
        <section className="section">
          <h3 className="subtitulo-escuro">
            O que inclui o diagnóstico?
          </h3>
          <ul className="lista-escuro">
            <li>Diagnóstico eletrônico</li>
            <li>Teste de compressão</li>
            <li>Análise de gases</li>
            <li>Inspeção visual detalhada</li>
          </ul>
        </section>
        <section className="section">
          <h3 className="subtitulo-escuro">
            Agende seu diagnóstico
          </h3>
          <p className="paragrafo-escuro">
            Não espere que os problemas se agravem. Agende agora mesmo o diagnóstico do seu veículo e garanta a sua segurança e tranquilidade.
          </p>
          <a href="/orcamento" className="button">
            Solicite um Orçamento
          </a>
        </section>
      </section>
    </div>
  );
}

export default Dp;