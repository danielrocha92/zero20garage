// ManutencaoPreventiva.jsx
import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

import './ManutencaoPreventiva.css';

function ManutencaoPreventiva() {
  const messages = [
    {
      title: 'Manutenção Preventiva',
      subtitle: 'Mantenha seu motor em ótimas condições',
    },
    {
      title: 'Dicas e Truques',
      subtitle: 'Aprenda a evitar problemas futuros',
    },
  ];

  return (
    <div className="manutencao-preventiva-page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container">
        <section className="highlights">
          <h2>Manutenção Preventiva</h2>
          <p>Manutenção regular para evitar problemas futuros e prolongar a vida útil do motor.</p>

          <h3>Por que fazer manutenção preventiva?</h3>
          <p>A manutenção preventiva é essencial para garantir o bom funcionamento do seu veículo e evitar surpresas desagradáveis. Com a manutenção regular, você pode identificar e corrigir problemas antes que eles se tornem grandes e caros.</p>

          <h3>O que inclui a manutenção preventiva?</h3>
          <ul>
            <li>Troca de óleo e filtros</li>
            <li>Verificação e substituição de fluidos</li>
            <li>Inspeção de freios</li>
            <li>Verificação de pneus</li>
            <li>Inspeção de suspensão</li>
            <li>Verificação de sistema de arrefecimento</li>
          </ul>

          <h3>Agende sua manutenção preventiva</h3>
          <p>Não espere que os problemas apareçam. Agende agora mesmo a manutenção preventiva do seu veículo e garanta a sua segurança e tranquilidade.</p>
          <a href="/orcamento" className="cta-button">Solicite um Orçamento</a>
        </section>
      </div>
    </div>
  );
}

export default ManutencaoPreventiva;