import React from 'react';
import './Servicos.css';
import DynamicHeader from '../components/DynamicHeader';

const Servicos = () => {
    const messages = [
      {
        title: 'Nossos Serviços',
        subtitle: 'Conheça tudo o que podemos fazer por você',
      },
      {
        title: 'Retífica de Motores',
        subtitle: 'Serviços especializados para motores nacionais e importados',
      },
      {
        title: 'Manutenção Preventiva',
        subtitle: 'Cuide do seu carro com nossa equipe experiente',
      },
    ];

  return (
    <div className="services">
      <DynamicHeader messages={messages} />
      <div className="services-list">
        <div className="service-item">
          <h2>Retífica de Motores</h2>
          <p>Serviço completo de retífica de motores para garantir o melhor desempenho do seu veículo.</p>
        </div>
        <div className="service-item">
          <h2>Manutenção Preventiva</h2>
          <p>Manutenção regular para evitar problemas futuros e prolongar a vida útil do motor.</p>
        </div>
        <div className="service-item">
          <h2>Diagnóstico de Problemas</h2>
          <p>Diagnóstico preciso para identificar e resolver problemas no motor do seu veículo.</p>
        </div>
        <div className="service-item">
          <h2>Troca de Peças</h2>
          <p>Substituição de peças desgastadas ou danificadas por componentes de alta qualidade.</p>
        </div>
        <div className="service-item">
          <h2>Teste de Desempenho</h2>
          <p>Testes rigorosos para garantir que o motor esteja funcionando de maneira eficiente.</p>
        </div>
        <div className="service-item">
          <h2>Consultoria Técnica</h2>
          <p>Consultoria especializada para ajudar você a tomar as melhores decisões para o seu veículo.</p>
        </div>
      </div>
    </div>
  );
};
export default Servicos;