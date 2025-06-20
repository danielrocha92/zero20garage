import React, { useState, useEffect } from 'react';
import '../../styles/Institucional.css'; // Padrão institucional aplicado
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';

const ManutencaoPreventiva = () => {
  const messages = [
    {
      title: 'Manutenção Preventiva',
      subtitle: 'Mantenha seu motor em ótimas condições com nossos cuidados especializados.',
    },
    {
      title: 'Evite Surpresas',
      subtitle: 'Dicas para prolongar a vida útil do seu veículo.',
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
            Manutenção Preventiva - A Chave para a Longevidade do Seu Motor
          </h2>
          <p className="institucional-paragraph">
            Você sabia que mais de 60% das falhas graves no motor poderiam ser evitadas com simples manutenções periódicas? A manutenção preventiva é o segredo para manter seu veículo funcionando com segurança, economia e alta performance.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">1. O que é manutenção preventiva?</h3>
          <p className="institucional-paragraph">
            É o conjunto de inspeções e serviços realizados com regularidade, mesmo quando o veículo não apresenta problemas aparentes. O objetivo é prevenir falhas, evitar quebras e prolongar a vida útil de componentes essenciais, como o motor, câmbio, suspensão e freios.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">2. Importância para o motor</h3>
          <p className="institucional-paragraph">
            Rodar com óleo vencido, aditivos contaminados ou superaquecimento pode causar desgaste prematuro de peças, perda de compressão ou até a necessidade de retífica completa. A manutenção preventiva evita esses danos e garante durabilidade ao motor.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Itens verificados com frequência</h3>
          <ul className="institucional-list">
            <li>Troca de óleo e filtros (óleo, ar, combustível, cabine)</li>
            <li>Verificação de correias e correntes (dentada, polivê)</li>
            <li>Inspeção do sistema de arrefecimento (radiador, válvula termostática, ventoinha)</li>
            <li>Fluidos: freio, direção hidráulica e arrefecimento</li>
            <li>Checagem de suspensão, freios, pneus e amortecedores</li>
            <li>Análise de compressão dos cilindros (avaliação anual)</li>
            <li>Verificação do sistema elétrico (bateria, alternador, ignição)</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Sinais de negligência</h3>
          <ul className="institucional-list">
            <li>Perda de potência ou falhas na aceleração</li>
            <li>Consumo elevado de combustível</li>
            <li>Fumaça azul ou branca no escapamento</li>
            <li>Superaquecimento constante</li>
            <li>Ruídos metálicos ou batidas no motor</li>
          </ul>
          <p className="institucional-paragraph">
            Esses sinais indicam que peças internas podem estar comprometidas. Ignorar pode resultar em retífica total.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">5. Benefícios da manutenção preventiva</h3>
          <ul className="institucional-list">
            <li>Economia com reparos emergenciais</li>
            <li>Melhor desempenho e consumo reduzido</li>
            <li>Maior segurança nas estradas</li>
            <li>Maior durabilidade do motor e componentes</li>
            <li>Valorização do veículo na revenda</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">6. Cuide hoje para não gastar amanhã</h3>
          <p className="institucional-paragraph">
            A manutenção preventiva funciona como um seguro silencioso para seu motor. Invista em cuidados simples agora e evite surpresas caras no futuro. E se seu motor já apresenta sinais de desgaste, nossa equipe pode avaliar se é necessário realizar retífica completa ou parcial.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">7. Agende sua avaliação com a ZER0 20 GARAGE™</h3>
          <p className="institucional-paragraph">
            Faça a manutenção preventiva com quem entende de verdade de motores. Nossa retífica é referência em qualidade, precisão e garantia. Solicite agora mesmo um diagnóstico personalizado.
          </p>
          <ContatoCta />
        </section>

        <p className="institucional-acknowledgment">
          Última atualização: {lastUpdated}
        </p>
      </div>
    </div>
    <div className="container-escuro">

        {/* Seção de Contato */}
        <ContatoCta />
    </ div)
  );
};

export default ManutencaoPreventiva;
