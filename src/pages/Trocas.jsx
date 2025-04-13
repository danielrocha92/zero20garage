import React, { useState, useEffect } from 'react';
import './Trocas.css'; // Importa o arquivo CSS

const Trocas = () => {

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
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez na montagem

  // Função simulada para quando o conteúdo da página é atualizado
  const handleContentUpdate = () => {
    // Aqui você teria a lógica real para verificar se o conteúdo mudou
    // Por exemplo, comparar o conteúdo atual com uma versão anterior
    console.log('Conteúdo da página foi atualizado!');
    updateLastUpdated();
    // Você pode adicionar aqui qualquer outra lógica necessária após a atualização
  };


  return (
    <div className="refund-policy-container">
      <h2 className="refund-policy-title">Política de Trocas e Devoluções - ZER0 20 GARAGE™</h2>
      <p className="refund-policy-paragraph">
        Na <strong>ZER0 20 GARAGE™</strong>, nosso compromisso é com a qualidade dos serviços de retífica de motores e a satisfação dos nossos clientes. Entendemos que, em algumas situações específicas, pode ser necessário solicitar uma análise para troca ou devolução. Por isso, apresentamos nossa Política de Trocas e Devoluções, alinhada com o Código de Defesa do Consumidor.
      </p>

      <section className="refund-policy-section">
        <h3 className="refund-policy-subtitle">Considerações Importantes:</h3>
        <ul className="refund-policy-list">
          <li>
            <strong>Natureza dos Serviços:</strong> Nossos serviços de retífica de motores são altamente especializados e personalizados para cada veículo. A avaliação e execução do serviço envolvem expertise técnica e peças específicas.
          </li>
          <li>
            <strong>Garantia:</strong> Todos os serviços de retífica realizados pela <strong>ZER0 20 GARAGE™</strong> possuem um período de garantia, conforme especificado no orçamento e termo de serviço. Esta garantia cobre vícios de execução e materiais utilizados, dentro das condições normais de uso e manutenção do veículo.
          </li>
          <li>
            <strong>Análise Técnica:</strong> Qualquer solicitação de troca ou devolução será submetida a uma análise técnica detalhada por nossa equipe especializada para identificar a causa do problema.
          </li>
        </ul>
      </section>

      <section className="refund-policy-section">
        <h3 className="refund-policy-subtitle">Condições para Análise de Troca ou Devolução:</h3>
        <p className="refund-policy-paragraph">
          A análise para troca ou devolução poderá ser considerada nas seguintes situações:
        </p>
        <ul className="refund-policy-list">
          <li>
            <strong>Vício de Qualidade (Defeito no Serviço):</strong> Caso seja constatado, dentro do período de garantia, um vício de qualidade na execução do serviço de retífica que o torne impróprio ou inadequado ao uso, ou que lhe diminua o valor.
          </li>
          <li>
            <strong>Não Conformidade com o Orçamento:</strong> Se o serviço executado apresentar divergências significativas em relação ao orçamento previamente aprovado, sem o consentimento prévio do cliente.
          </li>
          <li>
            <strong>Erro na Execução do Serviço:</strong> Em casos de erro comprovado na identificação ou execução do serviço solicitado.
          </li>
        </ul>
      </section>

      <section className="refund-policy-section">
        <h3 className="refund-policy-subtitle">Procedimento para Solicitar Análise de Troca ou Devolução:</h3>
        <p className="refund-policy-paragraph">
          Para solicitar a análise de troca ou devolução, o cliente deverá seguir os seguintes passos:
        </p>
        <ol className="refund-policy-ordered-list">
          <li>
            <strong>Contato Inicial:</strong> Entrar em contato com a <strong>ZER0 20 GARAGE™</strong> o mais breve possível, através dos nossos canais de atendimento (telefone, e-mail ou presencialmente), informando o ocorrido e fornecendo os seguintes dados:
            <ul className="refund-policy-list inner-list">
              <li>Nome completo do cliente.</li>
              <li>Número da ordem de serviço ou nota fiscal.</li>
              <li>Data da realização do serviço.</li>
              <li>Descrição detalhada do problema ou da não conformidade.</li>
              <li>Fotos ou vídeos que possam auxiliar na identificação do problema (se aplicável).</li>
            </ul>
          </li>
          <li>
            <strong>Avaliação Preliminar:</strong> Nossa equipe fará uma avaliação preliminar das informações fornecidas e poderá solicitar dados adicionais ou agendar uma inspeção inicial do veículo.
          </li>
          <li>
            <strong>Análise Técnica:</strong> O veículo será submetido a uma análise técnica completa em nossa oficina para identificar a causa do problema. Esta análise poderá envolver testes, desmontagem e avaliação de peças.
          </li>
          <li>
            <strong>Laudo Técnico:</strong> Após a análise, será emitido um laudo técnico com o diagnóstico da situação.
          </li>
          <li>
            <strong>Soluções:</strong> Com base no laudo técnico e nas condições desta política, as seguintes soluções poderão ser oferecidas:
            <ul className="refund-policy-list inner-list">
              <li>
                <strong>Reexecução do Serviço:</strong> Caso seja constatado vício de qualidade na execução, a <strong>ZER0 20 GARAGE™</strong> se responsabilizará pela reexecução do serviço, sem custos adicionais para o cliente, dentro de um prazo razoável.
              </li>
              <li>
                <strong>Substituição de Peças:</strong> Se o problema estiver relacionado a peças defeituosas cobertas pela garantia, estas serão substituídas sem custos adicionais.
              </li>
              <li>
                <strong>Devolução do Valor Pago:</strong> Em casos excepcionais, após análise e mediante acordo entre as partes, poderá ser considerada a devolução integral ou parcial do valor pago pelo serviço.
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="refund-policy-section">
        <h3 className="refund-policy-subtitle">Exclusões da Política de Trocas e Devoluções:</h3>
        <p className="refund-policy-paragraph">
          Não serão aceitas solicitações de troca ou devolução nas seguintes situações:
        </p>
        <ul className="refund-policy-list prohibited-list">
          <li>Desgaste natural das peças ou do serviço decorrente do uso normal do veículo.</li>
          <li>Danos causados por mau uso, negligência, acidentes, sobrecarga ou utilização inadequada do veículo.</li>
          <li>Intervenção ou reparo realizado por terceiros não autorizados pela <strong>ZER0 20 GARAGE™</strong>.</li>
          <li>Problemas decorrentes de outras peças ou sistemas do veículo que não foram objeto do serviço de retífica.</li>
          <li>Serviços que foram realizados com aprovação prévia do cliente, mesmo que posteriormente ele se arrependa da decisão (ressalvado o direito de arrependimento em compras online, se aplicável a alguma etapa do serviço).</li>
          <li>Divergências mínimas ou toleráveis dentro dos padrões técnicos da retífica.</li>
        </ul>
      </section>

      <section className="refund-policy-section">
        <h3 className="refund-policy-subtitle">Prazos:</h3>
        <ul className="refund-policy-list">
          <li>
            <strong>Garantia:</strong> O prazo de garantia dos serviços será especificado no orçamento e termo de serviço.
          </li>
          <li>
            <strong>Solicitação:</strong> A solicitação de análise de troca ou devolução deve ser feita o mais breve possível após a identificação do problema, dentro do período de garantia.
          </li>
        </ul>
      </section>

      <section className="refund-policy-section">
        <h3 className="refund-policy-subtitle">Disposições Gerais:</h3>
        <ul className="refund-policy-list">
          <li>A <strong>ZER0 20 GARAGE™</strong> reserva-se o direito de alterar esta Política de Trocas e Devoluções a qualquer momento, mediante publicação no site.</li>
          <li>Em caso de dúvidas ou necessidade de esclarecimentos, entre em contato com nossa equipe de atendimento.</li>
          <li>Esta política é complementar aos seus direitos como consumidor, garantidos pelo Código de Defesa do Consumidor.</li>
        </ul>
      </section>

      <p className="refund-policy-paragraph acknowledgment">
        Agradecemos a sua confiança na <strong>ZER0 20 GARAGE™</strong>. Estamos à disposição para oferecer serviços de retífica de motores com qualidade e transparência.
      </p>

      <section className="terms-of-use-section">
        <h3 className="terms-of-use-subtitle">11. Contato</h3>
        <p className="terms-of-use-paragraph">
          Se você tiver alguma dúvida ou preocupação com nossa Política, entre em contato conosco através das seguintes informações:
        </p>
        <address className="terms-of-use-address">
          <strong>ZER0 20 GARAGE™</strong><br />
          <a href='https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D'target='blank'>Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
          <a href="tel:+5511941097471">(11) 94109-7471</a><br />
          <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
        </address>
      </section>

      <p className="terms-of-use-paragraph acknowledgment">
        Ao utilizar nosso site, você reconhece que leu, entendeu e concorda com todos os termos e condições apresentados neste documento.
      </p>
      {/* Botão simulado para acionar a atualização do conteúdo */}
      <p className="terms-of-use-last-updated">
        Data da última atualização: {lastUpdated}
      </p>

      {/* Botão simulado para acionar a atualização do conteúdo */}
      <button onClick={handleContentUpdate}>.</button>
    </div>
  );
};

export default Trocas;