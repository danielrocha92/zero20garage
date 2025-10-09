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
            Teste de Desempenho do Motor: Garanta Potência e Eficiência
          </h2>
          <p className="institucional-paragraph">
            Na <strong>ZER0 20 GARAGE™</strong>, sabemos que a performance do seu motor é essencial para o bom funcionamento do veículo. Por isso, oferecemos um <strong>teste completo de desempenho</strong> com tecnologia de ponta e técnicos altamente capacitados.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">1. Por que realizar um Teste de Desempenho?</h3>
          <ul className="institucional-list">
            <li><strong>Diagnosticar falhas:</strong> Identificar problemas que afetam potência, eficiência e segurança.</li>
            <li><strong>Verificar o estado geral do motor:</strong> Avaliação de compressão, vazamentos e desgaste.</li>
            <li><strong>Otimizar a performance:</strong> Após retífica ou manutenção, é essencial validar o desempenho ideal.</li>
            <li><strong>Evitar danos futuros:</strong> A detecção precoce de anomalias evita prejuízos maiores.</li>
            <li><strong>Melhorar o consumo de combustível:</strong> Motores ajustados consomem menos.</li>
            <li><strong>Garantir maior vida útil:</strong> Performance correta prolonga a durabilidade do motor.</li>
            <li><strong>Mais segurança:</strong> Motores saudáveis respondem melhor em situações de risco.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">2. O que é avaliado no Teste de Desempenho?</h3>
          <ul className="institucional-list">
            <li><strong>Inspeção visual:</strong> Identificação de vazamentos, ruídos e componentes fora de padrão.</li>
            <li><strong>Teste de compressão:</strong> Medição da pressão interna dos cilindros.</li>
            <li><strong>Teste de vazamento (Leak Down Test):</strong> Verifica onde há perda de compressão.</li>
            <li><strong>Análise dos gases de escape:</strong> Avalia a eficiência da queima de combustível.</li>
            <li><strong>Leitura via scanner automotivo:</strong> Diagnóstico eletrônico e códigos de falha.</li>
            <li><strong>Verificação da pressão do óleo:</strong> Indica a saúde do sistema de lubrificação.</li>
            <li><strong>Avaliação do sistema de arrefecimento:</strong> Confere pressão e eficiência de refrigeração.</li>
            <li><strong>Dinamômetro (opcional):</strong> Mede torque e potência real do motor.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Para quem é indicado?</h3>
          <ul className="institucional-list">
            <li>Proprietários que desejam manter o motor em alta performance.</li>
            <li>Carros com histórico de falhas ou sintomas de desempenho reduzido.</li>
            <li>Após retífica ou manutenção completa do motor.</li>
            <li>Antes da compra ou venda de veículos usados.</li>
            <li>Frotas que dependem de confiabilidade operacional.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Agende seu Teste de Desempenho</h3>
          <p className="institucional-paragraph">
            Nossa equipe está pronta para oferecer diagnóstico preciso e soluções eficientes. Faça agora seu agendamento com a <strong>ZER0 20 GARAGE™</strong>.
          </p>
        </section>
      </div>
      <ContatoCta />
        <p className="institucional-acknowledgment">
          Última atualização: {LAST_UPDATED}
        </p>
    </div>
  );
};

export default TesteDesempenho;
