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
    <div className="page modo-claro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-claro">
        <h2 className="title">
          Diagnóstico de Problemas no Motor
        </h2>
        <p className="paragraph">
          Diagnóstico preciso para identificar e resolver problemas no motor do seu veículo.
        </p>

        <h3 className="subtitle">
          Por que fazer um diagnóstico?
        </h3>
          <p className="paragraph">
            Um diagnóstico preciso é essencial para identificar a causa raiz dos problemas do seu veículo e evitar gastos desnecessários. Com o diagnóstico correto, você pode ter certeza de que está resolvendo o problema certo.
          </p>

          <h3 className="subtitle">
            O que inclui o diagnóstico?
          </h3>
          <ul className="section-list">
            <li>Diagnóstico eletrônico</li>
            <li>Teste de compressão</li>
            <li>Análise de gases</li>
            <li>Inspeção visual detalhada</li>
          </ul>

          <h3 className="subtitle">
            Agende seu diagnóstico
          </h3>
          <p className="paragraph">
            Não espere que os problemas se agravem. Agende agora mesmo o diagnóstico do seu veículo e garanta a sua segurança e tranquilidade.
          </p>
          <a href="/orcamento" className="button">
            Solicite um Orçamento
          </a>
        </div>
      </div>
  );
}

export default Dp;