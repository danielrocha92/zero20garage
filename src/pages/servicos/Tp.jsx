// TrocaDePecas.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/Institucional.css'; // Aplicando o padrão institucional
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';

const TrocaDePecas = () => {
  const messages = [
    {
      title: 'Troca de Peças com Qualidade',
      subtitle: 'Durabilidade e Desempenho Garantidos para Seu Motor',
    },
    {
      title: 'Precisão na Substituição',
      subtitle: 'Mantenha Seu Veículo em Pleno Funcionamento',
    },
  ];

  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  }, []);

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">
            Troca de Peças com Qualidade e Precisão para o Seu Motor
          </h2>
          <p className="institucional-paragraph">
            Na <strong>ZER0 20 GARAGE™</strong>, entendemos que a substituição correta de componentes é essencial para o bom desempenho e a longevidade do seu motor. Trabalhamos exclusivamente com peças de alta qualidade, aprovadas pelos principais fabricantes.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">1. Por que trocar peças desgastadas ou danificadas?</h3>
          <ul className="institucional-list">
            <li><strong>Preservar o desempenho do motor:</strong> Peças novas garantem funcionamento adequado e potência ideal.</li>
            <li><strong>Evitar falhas mecânicas:</strong> Componentes comprometidos podem causar danos maiores e até fundir o motor.</li>
            <li><strong>Reduzir o consumo de combustível:</strong> Peças em boas condições otimizam a eficiência energética.</li>
            <li><strong>Prolongar a vida útil do veículo:</strong> Substituições preventivas evitam manutenções caras no futuro.</li>
            <li><strong>Mais segurança e confiança:</strong> Dirija tranquilo, sabendo que seu motor está em dia.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">2. Como realizamos a troca de peças?</h3>
          <ul className="institucional-list">
            <li><strong>Diagnóstico completo:</strong> Identificamos com precisão quais peças estão comprometidas.</li>
            <li><strong>Peças homologadas:</strong> Utilizamos somente componentes de marcas confiáveis e com garantia.</li>
            <li><strong>Mão de obra especializada:</strong> Técnicos treinados e atualizados realizam a substituição com precisão milimétrica.</li>
            <li><strong>Testes pós-serviço:</strong> Após a troca, o motor é testado para garantir perfeito funcionamento.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Quais peças costumam ser substituídas com frequência?</h3>
          <ul className="institucional-list">
            <li>Juntas e retentores</li>
            <li>Correias e tensionadores</li>
            <li>Bronzinas e pistões</li>
            <li>Bomba d’água e bomba de óleo</li>
            <li>Velas, cabos e bobinas</li>
            <li>Sensores e válvulas de controle eletrônico</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Agende sua avaliação técnica</h3>
          <p className="institucional-paragraph">
            Evite transtornos e gastos inesperados. Agende agora mesmo uma avaliação técnica com a <strong>ZER0 20 GARAGE™</strong> e garanta a troca de peças com qualidade e precisão.
          </p>
        </section>
        <section className="institucional-section">
        </section>
      </div>
      <ContatoCta />
        <p className="institucional-acknowledgment">
          Última atualização: {lastUpdated}
        </p>
    </div>
  );
};

export default TrocaDePecas;
