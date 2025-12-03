import React from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const DesmontagemTecnica = () => {
  const messages = [{ title: 'Desmontagem Técnica', subtitle: 'Análise detalhada dos componentes' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">3. Desmontagem Técnica</h2>
          <p className="institucional-paragraph">
            Após a retirada, o mecânico realiza a desmontagem técnica do motor utilizando ferramentas adequadas, conhecimento e experiência para garantir a desmontagem somente do necessário e sem causar danos estruturais. Cada peça é retirada cuidadosamente e o processo é documentado para identificar a origem das falhas e determinar as necessidades de reparo. A inspeção minuciosa pós-desmontagem inclui a análise de trincas, desgastes excessivos, deformações e falhas ocultas, com o apoio de instrumentos de medição de alta precisão, garantindo uma base sólida para a próxima etapa.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default DesmontagemTecnica;
