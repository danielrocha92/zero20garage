// Sobre.jsx
import React from 'react';
import './Sobre.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import Equipe from '../components/sobre/Equipe';
import MissaoVisaoValores from '../components/sobre/MissaoVisaoValores';
import Historia from '../components/sobre/Historia';
import Depoimentos from '../components/sobre/Depoimentos';
import ContatoCTA from '../components/sobre/ContatoCTA';

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
      <WhatsAppButton />
      <div className="container">
        <Historia />
        <MissaoVisaoValores />
        <Equipe />
        <Depoimentos />
        <ContatoCTA />
      </div>
    </div>
  );
}

export default Sobre;
