import React, { useState, useEffect } from 'react';
import './Politica.css'; // Importe o arquivo CSS para estilos específicos

const Privacidade = () => {

  const [lastUpdated, setLastUpdated] = useState('');

  // Função para atualizar a data
  const updateLastUpdated = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  };

  // UseEffect para definir a data inicial ao montar o componente
  useEffect(() => {
    updateLastUpdated();
  }, []);

  // Função simulada para quando o conteúdo da página é atualizado
  const handleContentUpdate = () => {
    console.log('Conteúdo da página foi atualizado!');
    updateLastUpdated();
  };

  return (
    <div className="privacy-policy-container">
      <h2 
        translate="no"
        className="privacy-policy-title">
        Política de Privacidade - ZER0 20 GARAGE™
        </h2>
      <p 
      translate="no"
      className="privacy-policy-paragraph">
        Esta Política de Privacidade descreve como a <strong>ZERO 20 GARAGE™</strong> coleta, usa, compartilha e protege as informações pessoais dos usuários do nosso website. Ao acessar ou usar nosso website, você concorda com os termos desta Política de Privacidade.
      </p>

      <section className="privacy-policy-section">
        <h3 className="privacy-policy-subtitle">1. Informações que Coletamos:</h3>
        <p className="privacy-policy-paragraph">Podemos coletar os seguintes tipos de informações pessoais:</p>
        <ul className="privacy-policy-list">
          <li><strong>Informações de contato:</strong> Nome, endereço de e-mail, número de telefone e endereço físico.</li>
          <li><strong>Informações sobre o veículo:</strong> Marca, modelo, ano, número do chassi (VIN) e histórico de serviços (se fornecido).</li>
          <li><strong>Informações de navegação:</strong> Endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo gasto no site e outros dados de uso.</li>
          <li><strong>Informações fornecidas em formulários:</strong> Detalhes sobre consultas, solicitações de orçamento, agendamentos de serviços e feedback.</li>
          <li><strong>Cookies e tecnologias similares:</strong> Podemos usar cookies e outras tecnologias de rastreamento para coletar informações sobre sua atividade de navegação.</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h3 className="privacy-policy-subtitle">2. Como Usamos Suas Informações:</h3>
        <p className="privacy-policy-paragraph">Utilizamos suas informações pessoais para os seguintes propósitos:</p>
        <ul className="privacy-policy-list">
          <li><strong>Fornecer e melhorar nossos serviços:</strong> Responder a suas consultas, agendar serviços, fornecer orçamentos, realizar reparos e manutenções em veículos.</li>
          <li><strong>Comunicação:</strong> Entrar em contato com você sobre agendamentos, atualizações de serviços, ofertas promocionais e outras informações relevantes.</li>
          <li><strong>Personalização:</strong> Personalizar sua experiência no nosso website e fornecer conteúdo relevante para seus interesses.</li>
          <li><strong>Marketing:</strong> Enviar e-mails promocionais e outras comunicações de marketing sobre nossos serviços e ofertas (com seu consentimento, quando exigido por lei).</li>
          <li><strong>Análise e melhoria do website:</strong> Analisar o uso do nosso website para melhorar seu desempenho, design e conteúdo.</li>
          <li><strong>Cumprimento de obrigações legais:</strong> Cumprir leis, regulamentos e processos legais aplicáveis.</li>
          <li><strong>Segurança:</strong> Proteger nosso website e nossos usuários contra fraudes, abusos e outras atividades ilegais.</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h3 className="privacy-policy-subtitle">3. Compartilhamento de Suas Informações:</h3>
        <p className="privacy-policy-paragraph">Podemos compartilhar suas informações pessoais com terceiros nas seguintes circunstâncias:</p>
        <ul className="privacy-policy-list">
          <li><strong>Prestadores de serviços:</strong> Podemos compartilhar informações com empresas terceirizadas que nos auxiliam na operação do nosso website, processamento de pagamentos, envio de e-mails, análise de dados e outros serviços.</li>
          <li><strong>Parceiros de marketing:</strong> Com seu consentimento, podemos compartilhar informações com parceiros de marketing para enviar comunicações promocionais sobre produtos e serviços que possam ser de seu interesse.</li>
          <li><strong>Obrigações legais:</strong> Podemos divulgar suas informações pessoais se formos obrigados a fazê-lo por lei, ordem judicial ou outra obrigação legal.</li>
          <li><strong>Transferência de negócios:</strong> No caso de uma fusão, aquisição ou venda de todos ou parte dos nossos ativos, suas informações pessoais podem ser transferidas para a entidade adquirente.</li>
          <li><strong>Com seu consentimento:</strong> Podemos compartilhar suas informações com terceiros para outros fins com seu consentimento explícito.</li>
        </ul>
      </section>

      <p className="privacy-policy-paragraph acknowledgment">
        Data da última atualização: {lastUpdated}
      </p>

      <button onClick={handleContentUpdate}>.</button>
    </div>
  );
};

export default Privacidade;