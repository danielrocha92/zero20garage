import React, { useState, useEffect } from 'react';
import './Politica.css'; // Estilos específicos
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

const Privacidade = () => {
  const messages = [
    {
title: 'Privacidade e Proteção de Dados',
  subtitle: 'Entenda como suas informações são coletadas, usadas e protegidas por nós.',
    },
    {
  title: 'Sua Privacidade Importa',
  subtitle: 'Transparência no uso dos seus dados, com segurança e respeito.',
    },
  ];

  const [lastUpdated, setLastUpdated] = useState('');

  // Atualiza a data com a data atual
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

        <section className="section">
          <h2 translate="no" className="titulo-escuro">
            Política de Privacidade - ZER0 20 GARAGE™
          </h2>

          <p translate="no" className="paragrafo-escuro">
            Esta Política de Privacidade descreve como a <strong>ZERO 20 GARAGE™</strong> coleta, usa, compartilha e protege as informações pessoais dos usuários do nosso website. Ao acessar ou usar nosso website, você concorda com os termos desta Política de Privacidade.
          </p>
        </section>

          <section className="section">
            <h3 className="subtitulo-escuro">1. Informações que Coletamos:</h3>
            <p className="paragrafo-escuro">Podemos coletar os seguintes tipos de informações pessoais:</p>
            <ul className="lista-escuro">
              <li><strong>Informações de contato:</strong> Nome, endereço de e-mail, número de telefone e endereço físico.</li>
              <li><strong>Informações sobre o veículo:</strong> Marca, modelo, ano, número do chassi (VIN) e histórico de serviços (se fornecido).</li>
              <li><strong>Informações de navegação:</strong> Endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo gasto no site e outros dados de uso.</li>
              <li><strong>Informações fornecidas em formulários:</strong> Detalhes sobre consultas, solicitações de orçamento, agendamentos de serviços e feedback.</li>
              <li><strong>Cookies e tecnologias similares:</strong> Podemos usar cookies e outras tecnologias de rastreamento para coletar informações sobre sua atividade de navegação.</li>
            </ul>
          </section>

          <section className="section">
            <h3 className="subtitulo-escuro">2. Como Usamos Suas Informações:</h3>
            <p className="paragrafo-escuro">Utilizamos suas informações pessoais para os seguintes propósitos:</p>
            <ul className="lista-escuro">
              <li><strong>Fornecer e melhorar nossos serviços:</strong> Responder a suas consultas, agendar serviços, fornecer orçamentos, realizar reparos e manutenções em veículos.</li>
              <li><strong>Comunicação:</strong> Entrar em contato com você sobre agendamentos, atualizações de serviços, ofertas promocionais e outras informações relevantes.</li>
              <li><strong>Personalização:</strong> Personalizar sua experiência no nosso website e fornecer conteúdo relevante para seus interesses.</li>
              <li><strong>Marketing:</strong> Enviar e-mails promocionais e outras comunicações de marketing sobre nossos serviços e ofertas (com seu consentimento, quando exigido por lei).</li>
              <li><strong>Análise e melhoria do website:</strong> Analisar o uso do nosso website para melhorar seu desempenho, design e conteúdo.</li>
              <li><strong>Cumprimento de obrigações legais:</strong> Cumprir leis, regulamentos e processos legais aplicáveis.</li>
              <li><strong>Segurança:</strong> Proteger nosso website e nossos usuários contra fraudes, abusos e outras atividades ilegais.</li>
            </ul>
          </section>

          <section className="section">
            <h3 className="subtitulo-escuro">3. Compartilhamento de Suas Informações:</h3>
            <p className="paragrafo-escuro">Podemos compartilhar suas informações pessoais com terceiros nas seguintes circunstâncias:</p>
            <ul className="lista-escuro">
              <li><strong>Prestadores de serviços:</strong> Podemos compartilhar informações com empresas terceirizadas que nos auxiliam na operação do nosso website, processamento de pagamentos, envio de e-mails, análise de dados e outros serviços.</li>
              <li><strong>Parceiros de marketing:</strong> Com seu consentimento, podemos compartilhar informações com parceiros de marketing para enviar comunicações promocionais sobre produtos e serviços que possam ser de seu interesse.</li>
              <li><strong>Obrigações legais:</strong> Podemos divulgar suas informações pessoais se formos obrigados a fazê-lo por lei, ordem judicial ou outra obrigação legal.</li>
              <li><strong>Transferência de negócios:</strong> No caso de uma fusão, aquisição ou venda de todos ou parte dos nossos ativos, suas informações pessoais podem ser transferidas para a entidade adquirente.</li>
              <li><strong>Com seu consentimento:</strong> Podemos compartilhar suas informações com terceiros para outros fins com seu consentimento explícito.</li>
            </ul>
          </section>

          <address translate="no" className="terms-of-use-address">
            <strong>ZER0 20 GARAGE™</strong><br />
            <a
              href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP
            </a><br />
            <a href="tel:+5511941097471">(11) 94109-7471</a><br />
            <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
          </address>

          <div className="privacy-policy-last-updated">
            <p className="paragrafo acknowledgment">
              Data da última atualização: {lastUpdated}
            </p>

          </div>

      </div>
    </div>
  );
};

export default Privacidade;
