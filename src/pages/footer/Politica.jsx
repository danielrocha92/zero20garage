import React, { useState, useEffect } from 'react';
import './Politica.css'; // Estilos compartilhados
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';

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

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  }, []);

  return (
    <div className="page-dark">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-light">
        <section className="section-legal">
          <h2 translate="no" className="heading-legal">
            Política de Privacidade - ZER0 20 GARAGE™
          </h2>
          <p translate="no" className="text-legal">
            Esta Política de Privacidade descreve como a <strong>ZER0 20 GARAGE™</strong> coleta, usa, compartilha e protege as informações pessoais dos usuários do nosso website. Ao acessar ou utilizar nossos serviços, você concorda com os termos aqui estabelecidos.
          </p>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">1. Informações que Coletamos</h3>
          <p className="text-legal">Podemos coletar os seguintes tipos de dados pessoais:</p>
          <ul className="list-legal">
            <li><strong>Contato:</strong> Nome, e-mail, telefone, endereço.</li>
            <li><strong>Veículo:</strong> Marca, modelo, ano, chassi (VIN), histórico de serviços.</li>
            <li><strong>Navegação:</strong> IP, navegador, sistema, páginas visitadas, tempo de acesso.</li>
            <li><strong>Formulários:</strong> Consultas, orçamentos, agendamentos, feedbacks.</li>
            <li><strong>Cookies:</strong> Dados de navegação e comportamento para melhorar a experiência.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">2. Como Usamos Suas Informações</h3>
          <p className="text-legal">Utilizamos os dados pessoais para os seguintes fins:</p>
          <ul className="list-legal">
            <li><strong>Serviços:</strong> Atendimento, orçamento, manutenção, suporte técnico.</li>
            <li><strong>Comunicação:</strong> Informações sobre serviços, promoções e atualizações.</li>
            <li><strong>Personalização:</strong> Conteúdo e navegação ajustados ao seu perfil.</li>
            <li><strong>Marketing:</strong> Campanhas com seu consentimento, quando exigido.</li>
            <li><strong>Melhoria contínua:</strong> Análise do uso do site para otimização da experiência.</li>
            <li><strong>Obrigação legal:</strong> Cumprimento de exigências legais e normativas.</li>
            <li><strong>Segurança:</strong> Prevenção de fraudes e acesso indevido ao sistema.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">3. Compartilhamento de Informações</h3>
          <p className="text-legal">Seus dados podem ser compartilhados com:</p>
          <ul className="list-legal">
            <li><strong>Fornecedores:</strong> Empresas de tecnologia, pagamentos, e-mail, análise.</li>
            <li><strong>Parceiros:</strong> Com seu consentimento, para comunicações promocionais.</li>
            <li><strong>Requisição legal:</strong> Autoridades judiciais ou administrativas.</li>
            <li><strong>Fusão ou aquisição:</strong> Em transações societárias, com aviso prévio.</li>
            <li><strong>Consentimento:</strong> Outros casos mediante sua autorização explícita.</li>
          </ul>
        </section>

        <section className="section-legal">
          <h3 className="subheading-legal">4. Contato</h3>
          <p className="text-legal">
            Caso tenha dúvidas sobre esta Política de Privacidade, entre em contato por meio dos canais abaixo:
          </p>
          <ContatoCta />
        </section>

        <div className="footer-legal">
          <p className="text-legal small">
            Data da última atualização: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
