import React from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';
import '../../styles/Institucional.css'; // Estilos compartilhados

const Trocas = () => {
  const messages = [
    {
      title: 'Política de Trocas e Garantia',
      subtitle: 'Nossos serviços contam com garantia conforme o Código de Defesa do Consumidor, com compromisso e transparência.',
    },
    {
      title: 'Solicitação de Garantia',
      subtitle: 'Defeitos de fabricação ou falhas na execução dos serviços podem ser avaliados para troca ou reparo sem custos.',
    },
    {
      title: 'Prazos e Procedimentos',
      subtitle: 'Análise técnica em até 7 dias úteis após abertura da solicitação via nossos canais de atendimento.',
    },
  ];

const LAST_UPDATED = '22 de junho de 2025'; // atualizado manualmente quando o conteúdo muda

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 translate="no" className="institucional-title">
            Política de Trocas e Garantia – ZER0 20 GARAGE™
          </h2>
        </section>

        <section className="institucional-section">
          <p translate="no" className="institucional-paragraph">
            A <strong>ZER0 20 GARAGE™</strong> reafirma seu compromisso com a qualidade dos serviços prestados e a satisfação de seus clientes, oferecendo garantia e respaldo técnico conforme estabelece o Código de Defesa do Consumidor.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">1. Cobertura da Garantia</h3>
          <p className="institucional-paragraph">
            Todos os serviços executados pela ZER0 20 GARAGE™ contam com uma <strong>garantia de 90 (noventa) dias</strong>, limitada a defeitos de fabricação ou falhas de execução, respeitando a legislação vigente.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">2. Condições de Elegibilidade</h3>
          <p className="institucional-paragraph">A solicitação de garantia será aceita quando:</p>
          <ul className="institucional-list">
            <li>Houver identificação de defeito originado exclusivamente da execução do serviço ou peça fornecida pela oficina;</li>
            <li>O item ou serviço não apresentar indícios de mau uso, alteração ou intervenção por terceiros;</li>
            <li>A instalação e o uso tenham seguido as recomendações técnicas repassadas pela equipe responsável.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Procedimento de Solicitação</h3>
          <p className="institucional-paragraph">O cliente deverá entrar em contato com nossa equipe de suporte, informando:</p>
          <ul className="institucional-list">
            <li>Número do pedido ou nota fiscal;</li>
            <li>Data da realização do serviço;</li>
            <li>Descrição técnica detalhada da falha observada.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Análise Técnica e Prazos</h3>
          <p className="institucional-paragraph">
            Após o recebimento da solicitação, será realizada uma análise técnica interna no prazo de até <strong>7 (sete) dias úteis</strong>. Sendo confirmado o defeito de origem coberta, a ZER0 20 GARAGE™ providenciará a solução adequada, que poderá incluir:
          </p>
          <ul className="institucional-list">
            <li>Troca da peça defeituosa;</li>
            <li>Reexecução do serviço;</li>
            <li>Reembolso proporcional, conforme análise do caso.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">5. Exclusões da Garantia</h3>
          <p className="institucional-paragraph">Estão excluídos da cobertura:</p>
          <ul className="institucional-list">
            <li>Danos causados por uso indevido, negligência ou intervenção de terceiros;</li>
            <li>Desgaste natural ou decorrente de tempo de uso;</li>
            <li>Instalações ou modificações não autorizadas pela ZER0 20 GARAGE™;</li>
            <li>Problemas decorrentes de combustível adulterado, superaquecimento ou falta de manutenção periódica.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">6. Suporte e Contato</h3>
          <p className="institucional-paragraph">
            Em caso de dúvidas ou solicitações relacionadas à nossa Política de Trocas e Garantia, entre em contato pelos nossos canais oficiais:
          </p>
          <ContatoCta />
        </section>

        <footer className="footer-legal">
          <p className="institucional-acknowledgment">
            Data da última atualização: {LAST_UPDATED}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Trocas;
