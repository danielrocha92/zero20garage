import React, { useState, useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';
import './Trocas.css';

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

  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  }, []);

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-light">
        <section className="section-legal">
          <h2 translate="no" className="titulo-claro">
            Política de Trocas e Garantia – ZER0 20 GARAGE™
          </h2>
          <p translate="no" className="text-legal">
            A <strong>ZER0 20 GARAGE™</strong> reafirma seu compromisso com a qualidade dos serviços prestados e a satisfação de seus clientes, oferecendo garantia e respaldo técnico conforme estabelece o Código de Defesa do Consumidor.
          </p>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">1. Cobertura da Garantia</h3>
          <p className="text-legal">
            Todos os serviços executados pela ZER0 20 GARAGE™ contam com uma <strong>garantia de 90 (noventa) dias</strong>, limitada a defeitos de fabricação ou falhas de execução, respeitando a legislação vigente.
          </p>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">2. Condições de Elegibilidade</h3>
          <p className="text-legal">A solicitação de garantia será aceita quando:</p>
          <ul className="list-legal">
            <li>Houver identificação de defeito originado exclusivamente da execução do serviço ou peça fornecida pela oficina;</li>
            <li>O item ou serviço não apresentar indícios de mau uso, alteração ou intervenção por terceiros;</li>
            <li>A instalação e o uso tenham seguido as recomendações técnicas repassadas pela equipe responsável.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">3. Procedimento de Solicitação</h3>
          <p className="text-legal">O cliente deverá entrar em contato com nossa equipe de suporte, informando:</p>
          <ul className="list-legal">
            <li>Número do pedido ou nota fiscal;</li>
            <li>Data da realização do serviço;</li>
            <li>Descrição técnica detalhada da falha observada.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">4. Análise Técnica e Prazos</h3>
          <p className="text-legal">
            Após o recebimento da solicitação, será realizada uma análise técnica interna no prazo de até <strong>7 (sete) dias úteis</strong>. Sendo confirmado o defeito de origem coberta, a ZER0 20 GARAGE™ providenciará a solução adequada, que poderá incluir:
          </p>
          <ul className="list-legal">
            <li>Troca da peça defeituosa;</li>
            <li>Reexecução do serviço;</li>
            <li>Reembolso proporcional, conforme análise do caso.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">5. Exclusões da Garantia</h3>
          <p className="text-legal">Estão excluídos da cobertura:</p>
          <ul className="list-legal">
            <li>Danos causados por uso indevido, negligência ou intervenção de terceiros;</li>
            <li>Desgaste natural ou decorrente de tempo de uso;</li>
            <li>Instalações ou modificações não autorizadas pela ZER0 20 GARAGE™;</li>
            <li>Problemas decorrentes de combustível adulterado, superaquecimento ou falta de manutenção periódica.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">6. Suporte e Contato</h3>
          <p className="text-legal">
            Em caso de dúvidas ou solicitações relacionadas à nossa Política de Trocas e Garantia, entre em contato pelos nossos canais oficiais:
          </p>
          <ContatoCta />
        </section>

        <footer className="footer-legal">
          <p className="text-legal small">
            Última atualização: {lastUpdated}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Trocas;
