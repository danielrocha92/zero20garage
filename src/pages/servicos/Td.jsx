import React from 'react';
import '../../styles/Institucional.css';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';

const TesteDesempenho = () => {
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

const LAST_UPDATED = '22 de junho de 2025'; // atualizado manualmente quando o conteúdo muda

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">
            Teste de Desempenho do Seu Motor: Garanta Potência e Eficiência!
          </h2>
          <p className="institucional-paragraph">
            Na <strong>ZER0 20 GARAGE™</strong>, sabemos que a performance do seu motor é essencial para o bom funcionamento do veículo. Por isso, oferecemos um serviço completo de Teste de Desempenho, com tecnologia de ponta e diagnósticos precisos.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">1. Por que fazer o Teste de Desempenho?</h3>
          <ul className="institucional-list">
            <li><strong>Diagnóstico preventivo:</strong> Identifica falhas antes que se tornem problemas graves.</li>
            <li><strong>Verificação de eficiência:</strong> Mede o desempenho real do motor em termos de torque e potência.</li>
            <li><strong>Economia de combustível:</strong> Motores otimizados consomem menos.</li>
            <li><strong>Maior segurança:</strong> Garante que o motor está operando com plena confiabilidade.</li>
            <li><strong>Vida útil prolongada:</strong> Um motor avaliado com frequência tende a durar mais.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">2. O que está incluso no nosso Teste de Desempenho?</h3>
          <ul className="institucional-list">
            <li><strong>Inspeção visual detalhada:</strong> Identificamos vazamentos e sinais de desgaste.</li>
            <li><strong>Teste de compressão:</strong> Avaliação da pressão em cada cilindro.</li>
            <li><strong>Leak Down Test:</strong> Localiza onde está ocorrendo perda de pressão.</li>
            <li><strong>Análise de gases:</strong> Avalia a eficiência da queima de combustível.</li>
            <li><strong>Leitura via scanner:</strong> Diagnóstico eletrônico de falhas.</li>
            <li><strong>Teste de pressão de óleo:</strong> Verificação do sistema de lubrificação.</li>
            <li><strong>Checagem do arrefecimento:</strong> Garante que o motor trabalha na temperatura ideal.</li>
            <li><strong>Dinamômetro (opcional):</strong> Mede a potência e torque reais.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Quem deve fazer esse teste?</h3>
          <ul className="institucional-list">
            <li>Veículos com perda de desempenho ou consumo elevado.</li>
            <li>Após serviços de retífica ou troca de peças importantes.</li>
            <li>Antes de viagens longas ou uso intenso do motor.</li>
            <li>Frotas que exigem confiabilidade constante.</li>
            <li>Compradores de veículos usados.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Agende seu teste com a ZER0 20 GARAGE™</h3>
          <p className="institucional-paragraph">
            Conte com nossa equipe técnica altamente qualificada e equipamentos modernos para diagnosticar com precisão a real condição do seu motor.
          </p>
        </section>

        <section className="institucional-section">
        </section>
        <p className="institucional-acknowledgment">
          Data da última atualização: {LAST_UPDATED}
        </p>
      </div>
      <ContatoCta />
        <p className="institucional-acknowledgment">
          Última atualização: {LAST_UPDATED}
        </p>
    </div>
  );
};

export default TesteDesempenho;
