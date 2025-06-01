import React, { useState, useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

import './Termos.css';

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
    <div className="page-claro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-claro">
      <h2 translate='no' className="title">Termos de Uso - ZER0 20 GARAGE™</h2>
      <p className="paragraph">
        Bem-vindo ao site da <strong>ZER0 20 GARAGE™</strong>! Ao acessar ou utilizar nosso site, você concorda com os presentes Termos de Uso. Leia atentamente este documento. Se você não concordar com algum dos termos aqui apresentados, por favor, não utilize nosso site.
      </p>

      <section className="section">
        <h3 className="subtitle">1. Aceitação dos Termos</h3>
        <p className="paragraph">
          Ao acessar e navegar neste site, você declara ter lido, compreendido e aceitado integralmente estes Termos de Uso, bem como nossa <a href="/politica" className="terms-of-use-link">Política de Privacidade</a>. Estes termos podem ser atualizados periodicamente sem aviso prévio, sendo sua responsabilidade verificar esta página regularmente para estar ciente de quaisquer modificações. O uso continuado do site após a publicação de alterações constitui sua aceitação dessas modificações.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">2. Descrição dos Serviços</h3>
        <p className="paragraph">
          A <strong>ZER0 20 GARAGE™</strong> é uma oficina especializada em retífica de motores automotivos. Nosso site tem como objetivo fornecer informações sobre nossos serviços, expertise, contato e outras informações relevantes sobre nossa empresa. Através do site, você poderá:
        </p>
        <ul className="section-list">
          <li>Conhecer nossos serviços de retífica de motores.</li>
          <li>Visualizar informações sobre nossa empresa e equipe.</li>
          <li>Entrar em contato conosco para solicitar orçamentos ou informações.</li>
          <li>Acessar conteúdo informativo relacionado ao universo automotivo e à retífica de motores (como dicas e notícias).</li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitle">3. Uso do Site</h3>
        <p className="paragraph">
          Você concorda em utilizar o site da <strong>ZER0 20 GARAGE™</strong> de forma responsável e em conformidade com todas as leis e regulamentos aplicáveis. É proibido:
        </p>
        <ul className="terms-of-use-list prohibited-list">
          <li>Utilizar o site para quaisquer fins ilegais ou não autorizados.</li>
          <li>Transmitir ou distribuir vírus, worms, ou qualquer outro código malicioso.</li>
          <li>Tentar obter acesso não autorizado a qualquer parte do site, servidores ou redes conectadas ao site.</li>
          <li>Interferir ou interromper o funcionamento normal do site.</li>
          <li>Coletar ou armazenar dados pessoais de outros usuários sem seu consentimento.</li>
          <li>Utilizar qualquer dispositivo, software ou rotina para interferir ou tentar interferir no bom funcionamento do site.</li>
          <li>Reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do site para fins comerciais sem a nossa expressa autorização por escrito.</li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitle">4. Propriedade Intelectual</h3>
        <p className="paragraph">
          Todo o conteúdo presente neste site, incluindo, mas não se limitando a textos, imagens, logotipos, vídeos, gráficos, ícones, softwares e outros materiais, são de propriedade exclusiva da <strong>ZER0 20 GARAGE™</strong> ou de terceiros que nos concederam licença para utilizá-los, e estão protegidos por leis de direitos autorais e outras leis de propriedade intelectual.
        </p>
        <p className="paragraph prohibited-paragraph">
          É estritamente proibida a reprodução, distribuição, modificação, exibição ou qualquer outra forma de utilização não autorizada do conteúdo deste site, total ou parcialmente, sem a prévia e expressa autorização por escrito da <strong>ZER0 20 GARAGE™</strong>.
        </p>
        <p className="paragraph">
          A marca <strong>ZER0 20 GARAGE™</strong> e seu logotipo são marcas registradas de nossa propriedade. É proibida a utilização dessas marcas sem nossa expressa autorização por escrito.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">5. Links para Outros Sites</h3>
        <p className="paragraph">
          Nosso site pode conter links para sites de terceiros. Esses links são fornecidos apenas para sua conveniência e não implicam que a <strong>ZER0 20 GARAGE™</strong> endosse, aprove ou se responsabilize pelo conteúdo desses sites. Ao acessar sites de terceiros através de links em nosso site, você o faz por sua própria conta e risco, e estará sujeito aos termos de uso e políticas de privacidade desses sites.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">6. Limitação de Responsabilidade</h3>
        <p className="paragraph">
          A <strong>ZER0 20 GARAGE™</strong> empenha-se para garantir que as informações apresentadas em seu site sejam precisas e atualizadas. No entanto, não garantimos a exatidão, integridade ou atualidade de todo o conteúdo. O site e seu conteúdo são fornecidos "como estão" e "conforme disponíveis", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a garantias de comercialização, adequação a um propósito específico e não violação.
        </p>
        <p className="paragraph">
          Em nenhuma hipótese a <strong>ZER0 20 GARAGE™</strong>, seus diretores, funcionários, parceiros ou fornecedores serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos (incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis) resultantes do seu acesso ou uso do site, da sua incapacidade de acessar ou usar o site, de qualquer conduta ou conteúdo de terceiros no site, ou de qualquer conteúdo obtido através do site.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">7. Indenização</h3>
        <p className="paragraph">
          Você concorda em indenizar, defender e isentar a <strong>ZER0 20 GARAGE™</strong>, seus diretores, funcionários, parceiros e fornecedores de quaisquer reclamações, responsabilidades, danos, perdas, custos e despesas (incluindo honorários advocatícios razoáveis) decorrentes de qualquer violação destes Termos de Uso por você ou por qualquer pessoa que utilize sua conta.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">8. Privacidade</h3>
        <p className="paragraph">
          A coleta e o uso de suas informações pessoais são regidos por nossa <a href="/politica" className="terms-of-use-link">Política de Privacidade</a>, que é parte integrante destes Termos de Uso. Ao utilizar nosso site, você concorda com os termos de nossa Política de Privacidade.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">9. Lei Aplicável e Jurisdição</h3>
        <p className="paragraph">
          Estes Termos de Uso serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. Qualquer disputa decorrente ou relacionada a estes Termos de Uso será submetida à jurisdição exclusiva dos tribunais da Comarca de São Paulo, Estado de São Paulo, Brasil, renunciando as partes a qualquer outro foro, por mais privilegiado que seja.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitle">10. Disposições Gerais</h3>
        <ul className="section-list">
          <li>
            <strong>Integralidade do Acordo:</strong> Estes Termos de Uso constituem o acordo integral entre você e a <strong>ZER0 20 GARAGE™</strong> em relação ao uso do site e substituem todos os acordos e entendimentos anteriores ou contemporâneos, sejam eles verbais ou escritos.
          </li>
          <li>
            <strong>Nulidade Parcial:</strong> Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível por um tribunal competente, as demais disposições permanecerão em pleno vigor e efeito. A disposição inválida ou inexequível será substituída por uma disposição válida e exequível que reflita a intenção original da disposição inválida ou inexequível, na medida do possível.
          </li>
          <li>
            <strong>Renúncia:</strong> A falha da <strong>ZER0 20 GARAGE™</strong> em exercer ou fazer cumprir qualquer direito ou disposição destes Termos de Uso não constituirá uma renúncia a tal direito ou disposição.
          </li>
          <li>
            <strong>Cessão:</strong> Você não poderá ceder ou transferir seus direitos ou obrigações sob estes Termos de Uso sem o consentimento prévio e por escrito da <strong>ZER0 20 GARAGE™</strong>. A <strong>ZER0 20 GARAGE™</strong> poderá ceder ou transferir seus direitos e obrigações sob estes Termos de Uso a terceiros sem o seu consentimento.
          </li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitle">11. Contato</h3>
        <p className="paragraph">
          Se você tiver alguma dúvida ou preocupação sobre estes Termos de Uso, entre em contato conosco através das seguintes informações:
        </p>
        <address className="terms-of-use-address">
          <strong>ZER0 20 GARAGE™</strong><br />
          <a href='https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D'target='blank'>Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
          <a href="tel:+5511941097471">(11) 94109-7471</a><br />
          <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
        </address>
      </section>

      <p className="paragraph acknowledgment">
        Ao utilizar nosso site, você reconhece que leu, entendeu e concorda com todos os termos e condições apresentados neste documento.
      </p>
      {/* Botão simulado para acionar a atualização do conteúdo */}
      <div className="terms-of-use-last-updated">
        <p className="paragraph acknowledgment">
          Data da última atualização: {lastUpdated}
        </p>
        <button onClick={handleContentUpdate}></button>
      </div>
    </div>
    </div>
  );
};

export default Termos;