import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './Td.css'; // Certifique-se de ter um arquivo Td.css com os estilos desejados

function Td() {
  const messages = [
    {
      title: 'Teste de Desempenho do Motor',
      subtitle: 'Garanta Potência e Eficiência para o Seu Veículo',
    },
    {
      title: 'Diagnóstico Avançado',
      subtitle: 'Avaliação Completa com Tecnologia de Ponta',
    },
  ];

  return (
    <div className="page-container">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <section className="content-section">
        <h2 className="section-title">Teste de Desempenho do Seu Motor: Garanta Potência e Eficiência!</h2>
        <p className="section-paragraph">
          Na 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™, sabemos que a performance do seu motor é crucial para o seu veículo e para o seu dia a dia. É por isso que oferecemos um serviço completo e especializado de <strong>Teste de Desempenho do Motor</strong>, utilizando tecnologia de ponta e a expertise de nossos técnicos qualificados.
        </p>

        <h3 className="section-subtitle">Por que realizar um Teste de Desempenho do Motor?</h3>
        <p className="section-paragraph">
          Assim como fazemos check-ups regulares em nossa saúde, o seu motor também precisa de avaliações periódicas para garantir seu bom funcionamento e evitar problemas futuros. O Teste de Desempenho é uma ferramenta essencial para:
        </p>
        <ul className="section-list">
          <li><strong>Diagnosticar problemas:</strong> Identificar falhas em componentes que podem estar comprometendo a potência e a eficiência do motor.</li>
          <li><strong>Avaliar a condição geral:</strong> Verificar o estado de desgaste das peças internas, a compressão dos cilindros e a presença de vazamentos.</li>
          <li><strong>Otimizar o desempenho:</strong> Após a retífica ou qualquer intervenção, o teste garante que o motor esteja entregando a potência e o torque ideais.</li>
          <li><strong>Prevenir danos maiores:</strong> Ao identificar problemas em estágio inicial, você evita que eles se agravem e causem danos mais sérios.</li>
          <li><strong>Aumentar a vida útil do motor:</strong> Um motor com desempenho otimizado tende a ter uma vida útil mais longa.</li>
          <li><strong>Melhorar a eficiência de combustível:</strong> Um motor funcionando corretamente consome menos combustível.</li>
          <li><strong>Garantir a sua segurança:</strong> Um motor com desempenho adequado responde melhor em situações de emergência.</li>
        </ul>

        <h3 className="section-subtitle">O que o nosso Teste de Desempenho Abrange?</h3>
        <p className="section-paragraph">
          Nosso serviço de Teste de Desempenho é abrangente e minucioso, utilizando equipamentos modernos e seguindo rigorosos procedimentos. Geralmente, o teste inclui:
        </p>
        <ul className="section-list">
          <li><strong>Inspeção visual:</strong> Verificação de possíveis vazamentos, ruídos anormais e o estado geral do motor.</li>
          <li><strong>Teste de compressão dos cilindros:</strong> Medição da pressão em cada cilindro.</li>
          <li><strong>Teste de vazamento de cilindro (Leak Down Test):</strong> Identificação precisa de onde ocorre a perda de pressão.</li>
          <li><strong>Análise de gases de escape:</strong> Avaliação da composição dos gases para identificar problemas de combustão.</li>
          <li><strong>Diagnóstico eletrônico (Scanner Automotivo):</strong> Leitura de códigos de falha da central eletrônica.</li>
          <li><strong>Teste de pressão de óleo:</strong> Verificação da pressão do óleo lubrificante.</li>
          <li><strong>Avaliação do sistema de arrefecimento:</strong> Verificação de pressão, vazamentos e eficiência.</li>
          <li><strong>Teste de desempenho em dinamômetro (opcional):</strong> Medição da potência e do torque reais do motor.</li>
        </ul>

        <h3 className="section-subtitle">Para quem é indicado o Teste de Desempenho?</h3>
        <p className="section-paragraph">
          Nosso serviço de Teste de Desempenho é recomendado para:
        </p>
        <ul className="section-list">
          <li>Proprietários de veículos que desejam manter seus motores em perfeitas condições.</li>
          <li>Veículos com histórico de problemas ou sintomas de falha.</li>
          <li>Após serviços de retífica, para garantir o desempenho esperado.</li>
          <li>Antes da compra ou venda de um veículo usado.</li>
          <li>Frotistas que precisam garantir a confiabilidade de seus veículos.</li>
        </ul>

        <h3 className="section-subtitle">Agende agora mesmo o Teste de Desempenho do seu motor!</h3>
        <p className="section-paragraph">
          Nossa equipe está pronta para oferecer um serviço de alta qualidade, com diagnóstico preciso e soluções eficientes para garantir a potência, a eficiência e a durabilidade do seu motor.
        </p>
        <p className="section-paragraph">
          Entre em contato conosco através dos seguintes canais:
        </p>
        <address className="terms-of-use-address">
          <strong>𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™</strong><br />
          <a href='https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D'target='blank'>Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
          <a href="tel:+5511941097471">(11) 94109-7471</a><br />
          <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
        </address>
        <p className="section-paragraph">
          <strong>Invista na saúde do seu motor. Invista em Teste de Desempenho na 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™!</strong>
        </p>
      </section>
    </div>
  );
}

export default Td;