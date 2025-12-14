import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const LimpezaPecas = () => {
  const messages = [{ title: 'Limpeza das Peças', subtitle: 'Banho químico e descontaminação' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Helmet>
        <title>Limpeza Química de Peças de Motor | Zero 20 Garage</title>
        <meta name="description" content="Banho químico especializado para limpeza de motores, removendo borras de óleo e carbonização para uma retífica perfeita." />
        <link rel="canonical" href="https://zero20garage.com.br/Home/Limpeza-das-Peças" />
      </Helmet>
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">4. Limpeza das Peças (Banho Químico)</h2>
          <p className="institucional-paragraph">
            Na fase de limpeza, as partes metálicas do motor são submetidas a um banho químico específico para remover borras de óleo, resíduos de carbono e contaminantes. Isso garante que a limpeza não apenas preserve o motor, mas também evite que qualquer sujeira possa camuflar avarias durante o procedimento de inspeção.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default LimpezaPecas;
