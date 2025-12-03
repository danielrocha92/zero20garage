import React from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';

const RetificaPecas = () => {
  const messages = [{ title: 'Retífica das Peças', subtitle: 'Usinagem de alta precisão' }];
  const LAST_UPDATED = '02 de dezembro de 2025';

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">6. Retífica das Peças (Usinagem de Precisão)</h2>
          <p className="institucional-paragraph">
            A usinagem é o pilar da retífica, removendo deformações e restabelecendo tolerâncias rigorosas para garantir a longevidade dos componentes. Utilizamos máquinas CNC de última geração. Processos essenciais incluem: Mandrilamento de Cilindros (corrige ovalizações), Plaina (elimina empenamentos para vedação perfeita), Brunimento (garante lubrificação ideal) e Retífica de Virabrequim/Comando (restaura geometrias). O retificador corrige as medidas ou aplica novas medidas definidas pela engenharia técnica, como o faceamento do cabeçote e brunimento dos cilindros.
          </p>
        </section>
        <section className="institucional-section"><ContatoCta /></section>
        <div className="institucional-last-updated"><p className="institucional-acknowledgment">Página atualizada em: {LAST_UPDATED}</p></div>
        <div className="institucional-section"><Link to="/" className="home-button-voltar">← Voltar para Home</Link></div>
      </div>
    </div>
  );
};

export default RetificaPecas;
