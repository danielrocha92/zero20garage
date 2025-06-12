import React, { useState, useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

import './Trocas.css'; // Continua utilizando o mesmo arquivo CSS
import ContatoCta from '../../components/ContatoCta';

const Trocas = () => {

  const messages = [
    {
      title: 'Política de Trocas e Garantia',
      subtitle: 'Oferecemos garantia de 90 dias para todos os produtos e serviços, conforme previsto pelo Código de Defesa do Consumidor.',
    },
    {
      title: 'Condições para Troca ou Garantia',
      subtitle: 'Para solicitar a troca ou acionar a garantia, o produto ou serviço deve apresentar defeito de fabricação ou problemas decorrentes de execução, sem sinais de mau uso.',
    },
    {
      title: 'Procedimento para Solicitação',
      subtitle: 'Entre em contato com nosso suporte através dos canais de atendimento disponíveis no site, informando o número do pedido, data da compra e descrição detalhada do problema.',
    },
    {
      title: 'Análise e Prazos',
      subtitle: 'Após o recebimento da solicitação, realizaremos a análise técnica em até 7 dias úteis. Sendo constatado o defeito, procederemos com a troca, reparo ou reembolso conforme o caso.',
    },
    {
      title: 'Exclusões de Garantia',
      subtitle: 'A garantia não cobre danos causados por mau uso, instalação incorreta, desgaste natural, acidentes ou modificações não autorizadas no produto ou serviço.',
    },
  ];

  const [lastUpdated, setLastUpdated] = useState('');

  const updateLastUpdated = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  };

  useEffect(() => {
    updateLastUpdated();
  }, []);

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

        <div className="container-claro">
        <h2
          translate="no"
          className="titulo-escuro">
            Trocas e Garantia - ZER0 20 GARAGE™
        </h2>
        <p
          translate="no"
          className="paragrafo-escuro">
          Na <strong>ZER0 20 GARAGE™</strong>, prezamos pela sua satisfação e pela qualidade dos nossos serviços e produtos. Por isso, oferecemos a você a tranquilidade de uma <strong>garantia de 90 dias</strong>, conforme estabelecido pelo Código de Defesa do Consumidor.
        </p>

        <section className="section">
          <h3 className="subtitulo-escuro">1. Política de Trocas e Garantia:</h3>
          <p className="paragrafo-escuro">
            Oferecemos <strong>garantia de 90 dias</strong> para todos os produtos e serviços prestados pela <strong>ZER0 20 GARAGE™</strong>, respeitando as normas de proteção ao consumidor.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">2. Condições para Troca ou Garantia:</h3>
          <p className="paragrafo-escuro">
            A troca ou acionamento da garantia poderá ser solicitado sempre que for identificado <strong>defeito de fabricação</strong> ou <strong>problemas decorrentes da execução do serviço</strong>.
            É necessário que o produto ou serviço não apresente <strong>sinais de mau uso</strong>, instalação incorreta, acidentes ou modificações não autorizadas.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">3. Procedimento para Solicitação:</h3>
          <p className="paragrafo-escuro">
            Para solicitar a troca ou acionar a garantia, entre em contato com nosso suporte pelos canais disponíveis no site. Será necessário informar:
          </p>
          <ul className="lista-escuro">
            <li>Número do pedido;</li>
            <li>Data da compra;</li>
            <li>Descrição detalhada do problema encontrado.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">4. Análise e Prazos:</h3>
          <p className="paragrafo-escuro">
            Após o recebimento da solicitação, nossa equipe técnica realizará uma análise detalhada em até <strong>7 dias úteis</strong>. Sendo constatado o defeito ou falha, realizaremos a <strong>troca</strong>, o <strong>reparo</strong> ou o <strong>reembolso</strong> correspondente.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">5. Exclusões de Garantia:</h3>
          <p className="paragrafo-escuro">
            A garantia não cobre danos decorrentes de:
          </p>
          <ul className="lista-escuro">
            <li><strong>Mau uso</strong> ou <strong>instalação incorreta</strong> dos produtos;</li>
            <li><strong>Desgaste natural</strong> de componentes;</li>
            <li><strong>Acidentes</strong> ou <strong>modificações não autorizadas</strong>.</li>
          </ul>
        </section>

          {/* Seção de Contato */}
          <section className="section">
            <h3 className="subtitulo-escuro">6. Contato</h3>
            <p className="paragrafo-escuro">
              Se você tiver alguma dúvida ou preocupação sobre nossa Política Trocas e Garantia, entre em contato conosco através dos seguintes canais:
            </p>
            <ContatoCta />
          </section>

        <div className="privacy-policy-last-updated">
          <p className="paragrafo acknowledgment">
            Data da última atualização: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trocas;
