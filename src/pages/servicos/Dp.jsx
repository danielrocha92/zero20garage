// Diagnostico.jsx
import React, { useState, useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import '../../styles/Blog.css';

function Diagnostico() {
  const messages = [
    {
      title: 'Diagnóstico de Problemas',
      subtitle: 'Identifique e resolva falhas no motor com precisão.',
    },
    {
      title: 'Tecnologia e Experiência',
      subtitle: 'Soluções rápidas e confiáveis para seu veículo.',
    },
  ];

  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  }, []);

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-claro">
        <section className="section">
          <h2 className="titulo-escuro">Diagnóstico de Problemas no Motor</h2>
          <p className="paragrafo-escuro">
            O diagnóstico de problemas é o primeiro passo para garantir que seu veículo continue funcionando de forma segura, eficiente e econômica. Na <strong>ZER0 20 GARAGE™</strong>, utilizamos tecnologia de ponta e conhecimento técnico avançado para identificar falhas com precisão.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">Por que o diagnóstico é tão importante?</h3>
          <p className="paragrafo-escuro">
            Um problema não identificado corretamente pode levar a reparos desnecessários, perda de desempenho e, em casos extremos, à quebra total do motor. Com um diagnóstico bem feito, você economiza tempo, dinheiro e evita dores de cabeça futuras.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">Sinais de que seu veículo precisa de um diagnóstico:</h3>
          <ul className="lista-escuro">
            <li>Luz de injeção acesa no painel</li>
            <li>Perda de potência ou consumo excessivo</li>
            <li>Barulhos anormais no motor</li>
            <li>Marcha lenta irregular</li>
            <li>Dificuldade para dar partida</li>
            <li>Fumaça excessiva ou colorida no escapamento</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">O que está incluído no nosso diagnóstico:</h3>
          <ul className="lista-escuro">
            <li>Leitura de falhas com scanner automotivo profissional</li>
            <li>Teste de compressão nos cilindros</li>
            <li>Análise dos gases de escapamento</li>
            <li>Verificação do sistema de ignição e alimentação</li>
            <li>Inspeção visual detalhada do motor e periféricos</li>
            <li>Relatório técnico com orientação sobre o reparo necessário</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">Confiança e transparência no diagnóstico</h3>
          <p className="paragrafo-escuro">
            Nosso compromisso é com a honestidade e a precisão. Você recebe um laudo claro e objetivo, com total transparência sobre o que precisa ser feito — sem surpresas ou gastos desnecessários.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">Agende agora seu diagnóstico</h3>
          <p className="paragrafo-escuro">
            Se você notou qualquer anormalidade no funcionamento do seu veículo, não espere. Agende seu diagnóstico com a <strong>ZER0 20 GARAGE™</strong> e tenha a tranquilidade de contar com especialistas preparados para cuidar do seu motor.
          </p>
          <a href="/orcamento" className="button">
            Solicite um Orçamento
          </a>
        </section>
          <p className="data-atualizacao">Última atualização: {lastUpdated}</p>
      </div>
    </div>
  );
}

export default Diagnostico;
