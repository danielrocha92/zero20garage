import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const RemocaoMotor = () => {
  const messages = [{ title: 'Remoção do Motor', subtitle: 'Procedimento seguro e técnico' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Helmet>
        <title>Remoção Técnica de Motor | Zero 20 Garage</title>
        <meta name="description" content="Serviço especializado de remoção de motor com segurança para retífica completa. Atendemos veículos nacionais e importados em Mairiporã." />
        <link rel="canonical" href="https://zero20garage.com.br/Home/Remocao-do-Motor" />
      </Helmet>
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">2. Remoção do Motor (Remoção do Veículo)</h2>
          <p className="institucional-paragraph">
            Após receber o veículo na oficina, o mecânico responsável adota como primeiro passo a retirada do motor do compartimento, removendo cabos, conectores de sensores, atuadores e se certificando de que o motor está livre de todas as conexões mecânicas antes de retirá-lo por completo do cofre.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default RemocaoMotor;
