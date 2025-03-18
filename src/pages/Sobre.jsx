import React from 'react';
import './Sobre.css';
import DynamicHeader from '../components/DynamicHeader';
import Layout from '../components/Layout';

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
    <Layout>
    <div className="sobre">
      <DynamicHeader messages={messages} />
      <section>
        <p>Conteúdo da página Sobre...</p>
      </section>
    </div>
    </Layout>
// Compare this snippet from src/pages/Contato.jsx:
  );
}

export default Sobre;