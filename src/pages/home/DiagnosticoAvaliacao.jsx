import React from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const DiagnosticoAvaliacao = () => {
  const messages = [{ title: 'Diagnóstico Preciso', subtitle: 'Avaliação técnica detalhada' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">1. Diagnóstico e Avaliação Técnica</h2>
          <p className="institucional-paragraph">
            O diagnóstico é o primeiro e um dos mais importantes passos no processo de retífica de motores. Nossa equipe realiza uma avaliação minuciosa utilizando scanners automotivos OBD, estetoscópios mecânicos e ferramentas de medição de alta precisão, capazes de identificar desde falhas eletrônicas até desgastes internos imperceptíveis a olho nu. Durante a análise, inspecionamos cuidadosamente componentes críticos como bloco do motor, cabeçote, virabrequim, bronzinas, pistões, bielas, além dos sistemas de lubrificação e arrefecimento. Essa abordagem detalhada permite detectar fissuras, empenamentos, folgas excessivas e outros problemas. Com base no diagnóstico, elaboramos um laudo técnico que orienta todas as etapas seguintes da retífica, assegurando máxima precisão e durabilidade do motor.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default DiagnosticoAvaliacao;
