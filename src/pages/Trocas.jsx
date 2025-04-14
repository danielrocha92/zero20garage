import React, { useState, useEffect } from 'react';
import './Trocas.css'; // Continua utilizando o mesmo arquivo CSS

const Privacidade = () => {

  const [lastUpdated, setLastUpdated] = useState('');

  const updateLastUpdated = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  };

  useEffect(() => {
    updateLastUpdated();
  }, []);

  const handleContentUpdate = () => {
    console.log('Conteúdo da política de privacidade foi atualizado!');
    updateLastUpdated();
  };

  return (
    <div className="trocas-container">
      <h2 className="trocas-title">Política de Privacidade - ZER0 20 GARAGE™</h2>

      <p className="trocas-paragraph">
        Esta Política de Privacidade descreve como a <strong>ZER0 20 GARAGE™</strong> coleta, usa, compartilha e protege as informações pessoais dos usuários do nosso website. Ao acessar ou usar nosso site, você concorda com os termos desta política.
      </p>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">1. Informações que Coletamos:</h3>
        <ul className="trocas-list">
          <li><strong>Informações de contato:</strong> Nome, e-mail, telefone e endereço físico.</li>
          <li><strong>Informações sobre o veículo:</strong> Marca, modelo, ano, número do chassi (VIN) e histórico de serviços.</li>
          <li><strong>Informações de navegação:</strong> IP, navegador, sistema, páginas visitadas e tempo no site.</li>
          <li><strong>Informações de formulários:</strong> Dados fornecidos em consultas, orçamentos, agendamentos e feedback.</li>
          <li><strong>Cookies e tecnologias similares:</strong> Usamos cookies e outras ferramentas para rastrear sua atividade no site.</li>
        </ul>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">2. Como Usamos Suas Informações:</h3>
        <ul className="trocas-list">
          <li><strong>Fornecimento e melhoria de serviços:</strong> Responder consultas, agendar e executar serviços.</li>
          <li><strong>Comunicação:</strong> Informar sobre agendamentos, ofertas e novidades.</li>
          <li><strong>Personalização:</strong> Oferecer conteúdo relevante com base nos seus interesses.</li>
          <li><strong>Marketing:</strong> Enviar comunicações promocionais (com consentimento quando exigido).</li>
          <li><strong>Análise e melhoria:</strong> Avaliar o uso do site para melhorias.</li>
          <li><strong>Conformidade legal:</strong> Atender obrigações legais e regulatórias.</li>
          <li><strong>Segurança:</strong> Proteger o site contra fraudes e abusos.</li>
        </ul>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">3. Compartilhamento de Informações:</h3>
        <ul className="trocas-list">
          <li><strong>Prestadores de serviços:</strong> Terceiros que ajudam na operação do site e serviços.</li>
          <li><strong>Parceiros de marketing:</strong> Com seu consentimento, para promoções e campanhas.</li>
          <li><strong>Exigência legal:</strong> Obrigações legais, ordens judiciais ou processos legais.</li>
          <li><strong>Transferência de negócios:</strong> Em casos de fusões ou aquisições.</li>
          <li><strong>Consentimento:</strong> Quando você autorizar explicitamente o compartilhamento.</li>
        </ul>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">4. Seus Direitos de Privacidade:</h3>
        <ul className="trocas-list">
          <li><strong>Acesso:</strong> Solicitar acesso aos seus dados pessoais.</li>
          <li><strong>Correção:</strong> Solicitar a correção de dados imprecisos ou incompletos.</li>
          <li><strong>Exclusão:</strong> Requerer a exclusão de seus dados, quando aplicável.</li>
          <li><strong>Portabilidade:</strong> Solicitar transferência de dados a outro fornecedor.</li>
          <li><strong>Revogação de consentimento:</strong> Você pode retirar seu consentimento a qualquer momento.</li>
        </ul>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">5. Segurança da Informação:</h3>
        <p className="trocas-paragraph">
          Adotamos medidas técnicas e administrativas adequadas para proteger suas informações contra acessos não autorizados, perdas e usos indevidos.
        </p>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">6. Retenção das Informações:</h3>
        <p className="trocas-paragraph">
          Reteremos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período maior seja exigido por lei.
        </p>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">7. Cookies e Tecnologias Semelhantes:</h3>
        <p className="trocas-paragraph">
          Usamos cookies para melhorar sua experiência no site. Você pode configurar seu navegador para recusar todos ou alguns cookies, mas isso pode afetar a funcionalidade do site.
        </p>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">8. Alterações na Política:</h3>
        <p className="trocas-paragraph">
          Podemos atualizar esta política periodicamente. A versão mais atual estará sempre disponível em nosso site com a data de última atualização.
        </p>
      </section>

      <section className="trocas-section">
        <h3 className="trocas-subtitle">9. Contato:</h3>
        <p className="trocas-paragraph">
          Em caso de dúvidas ou solicitações sobre esta Política de Privacidade, entre em contato conosco:
        </p>
        <address className="trocas-address">
          <strong>ZER0 20 GARAGE™</strong><br />
          <a href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z" target="_blank" rel="noopener noreferrer">Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
          <a href="tel:+5511941097471">(11) 94109-7471</a><br />
          <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
        </address>
      </section>

      <p className="trocas-paragraph acknowledgment">
        Ao utilizar nosso site, você reconhece que leu, entendeu e concorda com esta Política de Privacidade.
      </p>

      <p className="trocas-last-updated">
        Data da última atualização: {lastUpdated}
      </p>

      <button onClick={handleContentUpdate} style={{ display: 'none' }}>Atualizar</button>
    </div>
  );
};

export default Privacidade;
