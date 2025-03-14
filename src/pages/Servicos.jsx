import React from 'react';
import './Servicos.css';

const Servicos = () => {
  return (
    <div className="services">
      <header className="services-header">
        <h1>Nossos Serviços</h1>
        <p>Oferecemos uma ampla gama de serviços de retífica de motores para atender às suas necessidades.</p>
      </header>
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