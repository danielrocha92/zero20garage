import React from 'react';
import './Sobre.css';
import DynamicHeader from '../components/DynamicHeader';

function Sobre() {
  const messages = [
    {
      title: 'Sobre Nós',
      subtitle: 'Conheça mais sobre a nossa história e missão',
    },
    {
      title: 'Nossa Missão',
      subtitle: 'Oferecer serviços de qualidade com confiança e excelência',
    },
    {
      title: 'Nossa Visão',
      subtitle: 'Ser referência no mercado de retífica e mecânica automotiva',
    },
  ];

  return (
    <div className="sobre">
      <DynamicHeader messages={messages} />
      <section>
        <p>Conteúdo da página Sobre...</p>
      </section>
    </div>
  );
}

export default Sobre;