// Sobre.jsx
import React from 'react';
import './Sobre.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

import NossaHistoria from '../components/NossaHistoria';
import MissaoVisaoValores from '../components/MissaoVisaoValores';
import NossaEquipe from '../components/NossaEquipe';
import PorQueEscolher from '../components/PorQueEscolher';
import DepoimentosClientes from '../components/DepoimentosClientes';
import ContatoCta from '../components/ContatoCta';

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
        <NossaHistoria />
        <MissaoVisaoValores />
        <NossaEquipe />
        <PorQueEscolher />
        <DepoimentosClientes />
        <ContatoCta />
      </div>
    </div>
  );
}

export default Sobre;