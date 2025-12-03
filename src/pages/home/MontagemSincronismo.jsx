import React from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const MontagemSincronismo = () => {
  const messages = [{ title: 'Montagem e Sincronismo', subtitle: 'Montagem técnica e precisa' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">7. Montagem e Sincronismo (Montagem Técnica)</h2>
          <p className="institucional-paragraph">
            A montagem é feita com extrema precisão, seguindo rigorosamente as especificações técnicas do fabricante. Utilizamos torquímetros calibrados e ferramentas específicas. O montador realiza uma nova inspeção das peças e componentes, conferindo as medidas e o sincronismo final do motor. Após a montagem, realizamos testes rigorosos em bancada para validar o funcionamento (pressão de óleo, temperatura, compressão), garantindo confiabilidade e alto desempenho.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default MontagemSincronismo;
