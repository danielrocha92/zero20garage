import React from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const InstalacaoVeiculo = () => {
  const messages = [{ title: 'Instalação no Veículo', subtitle: 'Integração e verificação final' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">8. Instalação no Veículo (Instalação e Testes)</h2>
          <p className="institucional-paragraph">
            Durante a instalação, o mecânico verifica as condições de todos os acessórios no cofre do motor — mangueiras de arrefecimento, sensores e atuadores. Essa inspeção garante que a linha eletrônica e os componentes periféricos estejam em plenas condições de operação, prevenindo o motor de uma quebra causada por superaquecimento ou falta de lubrificação por falha de algum componente. Itens que apresentarem rigidez ou desgaste devem ser substituídos.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default InstalacaoVeiculo;
