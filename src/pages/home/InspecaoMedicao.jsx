import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const InspecaoMedicao = () => {
  const messages = [{ title: 'Inspeção e Medição', subtitle: 'Metrologia de precisão' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Helmet>
        <title>Inspeção e Metrologia de Motores | Zero 20 Garage</title>
        <meta name="description" content="Inspeção metrológica de precisão para motores. Medição de virabrequins, cilindros e cabeçotes com equipamentos de ponta." />
        <link rel="canonical" href="https://zero20garage.com.br/Home/Inspeção-e-Medição" />
      </Helmet>
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">5. Inspeção e Medição (Metrologia e Análise)</h2>
          <p className="institucional-paragraph">
            Após a limpeza, inicia-se a inspeção e medição das peças utilizando instrumentos de metrologia como paquímetro, relógio comparador e calibrador de folga. São realizadas checagens de altura de cabeçote, diâmetro dos cilindros, colos do virabrequim, entre outras. Essas informações são essenciais para a elaboração do orçamento e para identificar quais peças deverão ser substituídas, retificadas ou recuperadas.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default InspecaoMedicao;
