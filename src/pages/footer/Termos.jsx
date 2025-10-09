import React from 'react';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import '../../styles/Institucional.css'; // Estilos compartilhados
import ContatoCta from '../../components/ui/ContatoCta';

const Termos = () => {
  const messages = [
    {
      title: 'Aceitação dos Termos',
      subtitle: 'Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado a estes Termos de Uso.',
    },
    {
      title: 'Contato',
      subtitle: 'Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através das informações de contato fornecidas no site.',
    },
  ];

const LAST_UPDATED = '22 de junho de 2025'; // atualizado manualmente quando o conteúdo muda

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">Termos de Uso – ZER0 20 GARAGE™</h2>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">1. Aceitação dos Termos</h3>
          <p className="institucional-paragraph">
            Ao acessar este website, o usuário declara ter lido, compreendido e aceitado integralmente os presentes Termos de Uso, bem como a Política de Privacidade. O uso contínuo deste site, após eventuais modificações destes termos, será interpretado como aceitação tácita das novas condições. É responsabilidade do usuário revisá-los periodicamente.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">2. Descrição dos Serviços</h3>
          <p className="institucional-paragraph">
            A <strong>ZER0 20 GARAGE™</strong> é uma empresa especializada em serviços de retífica de motores automotivos, disponibilizando por meio deste site informações institucionais, conteúdo técnico, canais de atendimento e funcionalidades voltadas à solicitação de orçamentos. O conteúdo disponibilizado tem caráter exclusivamente informativo, não constituindo vínculo contratual.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Condições de Uso</h3>
          <p className="institucional-paragraph">
            O usuário compromete-se a utilizar este site de maneira ética, responsável e em conformidade com a legislação vigente. É terminantemente vedado:
          </p>
          <ul className="institucional-list">
            <li>Utilizar o site com propósitos ilícitos ou lesivos à imagem da ZER0 20 GARAGE™;</li>
            <li>Inserir ou disseminar vírus, malware ou códigos que comprometam a segurança do sistema;</li>
            <li>Violar a integridade da estrutura do site, bem como de seus servidores;</li>
            <li>Capturar informações ou dados pessoais sem consentimento;</li>
            <li>Reproduzir, distribuir ou modificar qualquer conteúdo do site sem autorização expressa da empresa.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Propriedade Intelectual</h3>
          <p className="institucional-paragraph">
            Todos os elementos do site – textos, logotipos, imagens, vídeos, ilustrações, layout, códigos e demais materiais – são protegidos por direitos autorais, marcas registradas e outras legislações aplicáveis à propriedade intelectual. Qualquer uso não autorizado constitui infração e poderá resultar em medidas judiciais cabíveis.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">5. Links para Terceiros</h3>
          <p className="institucional-paragraph">
            Este site pode conter links que direcionam o usuário para websites de terceiros, os quais não estão sob o controle da ZER0 20 GARAGE™. A inclusão desses links visa apenas à conveniência do usuário, não representando, em hipótese alguma, endosso ou responsabilidade sobre seus conteúdos ou práticas de privacidade.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">6. Limitação de Responsabilidade</h3>
          <p className="institucional-paragraph">
            A ZER0 20 GARAGE™ empenha-se em manter as informações do site precisas e atualizadas. No entanto, não garante a ausência de erros, interrupções ou falhas técnicas. O uso das informações disponibilizadas é de inteira responsabilidade do usuário. A empresa não se responsabiliza por quaisquer danos, diretos ou indiretos, decorrentes do uso ou da incapacidade de uso do site.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">7. Indenização</h3>
          <p className="institucional-paragraph">
            O usuário concorda em isentar a ZER0 20 GARAGE™, seus diretores, colaboradores e parceiros de qualquer responsabilidade oriunda de ações decorrentes da violação destes Termos de Uso, comprometendo-se a arcar com todas as perdas, danos, despesas e honorários advocatícios eventualmente incorridos.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">8. Política de Privacidade</h3>
          <p className="institucional-paragraph">
            O tratamento de dados pessoais dos usuários será realizado em conformidade com a <a href="/politica" className="institucional-link">Política de Privacidade</a> da ZER0 20 GARAGE™, que integra e complementa os presentes Termos de Uso.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">9. Legislação Aplicável e Foro</h3>
          <p className="institucional-paragraph">
            Os presentes Termos de Uso serão regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo/SP como o único competente para dirimir eventuais controvérsias, renunciando-se a qualquer outro, por mais privilegiado que seja.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">10. Disposições Finais</h3>
          <ul className="institucional-list">
            <li><strong>Acordo Integral:</strong> Estes Termos constituem o acordo integral entre as partes no tocante ao uso do site.</li>
            <li><strong>Separabilidade:</strong> A eventual nulidade de alguma cláusula não afetará a validade das demais.</li>
            <li><strong>Renúncia:</strong> O não exercício de quaisquer direitos previstos nestes Termos não importará em renúncia, novação ou alteração contratual.</li>
            <li><strong>Cessão:</strong> O usuário não poderá ceder os direitos e obrigações decorrentes destes Termos sem o consentimento prévio e por escrito da ZER0 20 GARAGE™. A empresa poderá ceder livremente seus direitos.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">11. Contato</h3>
          <p className="institucional-paragraph">
            Para esclarecimentos, dúvidas ou solicitações relativas a estes Termos de Uso, disponibilizamos os seguintes canais de atendimento:
          </p>
          <ContatoCta />
        </section>

        <p className="institucional-acknowledgment">
          Ao utilizar nosso site, você reconhece que leu, entendeu e concorda com todos os termos e condições apresentados neste documento.
        </p>

        <div className="institucional-last-updated">
          <p className="institucional-acknowledgment">
            Data da última atualização: {LAST_UPDATED}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Termos;
