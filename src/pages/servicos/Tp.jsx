// TrocaDePecas.jsx
import React, { useState, useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

import '../../styles/Blog.css';

const Tp = () => {
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

  const updateLastUpdated = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  };

  useEffect(() => {
    updateLastUpdated();
  }, []);

  const handleContentUpdate = () => {
    console.log('Conteúdo atualizado!');
    updateLastUpdated();
  };

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="container-claro">

        <section className="section">
          <h2 className="titulo-escuro">
            Troca de Peças com Qualidade e Precisão para o Seu Motor
          </h2>
          <p className="paragrafo-escuro">
            Na <strong>ZER0 20 GARAGE™</strong>, entendemos que a substituição correta de componentes é essencial para o bom desempenho e a longevidade do seu motor. Trabalhamos exclusivamente com peças de alta qualidade, aprovadas pelos principais fabricantes.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">1. Por que trocar peças desgastadas ou danificadas?</h3>
          <ul className="lista-escuro">
            <li><strong>Preservar o desempenho do motor:</strong> Peças novas garantem funcionamento adequado e potência ideal.</li>
            <li><strong>Evitar falhas mecânicas:</strong> Componentes comprometidos podem causar danos maiores e até fundir o motor.</li>
            <li><strong>Reduzir o consumo de combustível:</strong> Peças em boas condições otimizam a eficiência energética.</li>
            <li><strong>Prolongar a vida útil do veículo:</strong> Substituições preventivas evitam manutenções caras no futuro.</li>
            <li><strong>Mais segurança e confiança:</strong> Dirija tranquilo, sabendo que seu motor está em dia.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">2. Como realizamos a troca de peças?</h3>
          <ul className="lista-escuro">
            <li><strong>Diagnóstico completo:</strong> Identificamos com precisão quais peças estão comprometidas.</li>
            <li><strong>Peças homologadas:</strong> Utilizamos somente componentes de marcas confiáveis e com garantia.</li>
            <li><strong>Mão de obra especializada:</strong> Técnicos treinados e atualizados realizam a substituição com precisão milimétrica.</li>
            <li><strong>Testes pós-serviço:</strong> Após a troca, o motor é testado para garantir perfeito funcionamento.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">3. Quais peças costumam ser substituídas com frequência?</h3>
          <ul className="lista-escuro">
            <li>Juntas e retentores</li>
            <li>Correias e tensionadores</li>
            <li>Bronzinas e pistões</li>
            <li>Bomba d’água e bomba de óleo</li>
            <li>Velas, cabos e bobinas</li>
            <li>Sensores e válvulas de controle eletrônico</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">4. Agende sua avaliação técnica</h3>
          <p className="paragrafo-escuro">
            Evite transtornos e gastos inesperados. Agende agora mesmo uma avaliação técnica com a <strong>ZER0 20 GARAGE™</strong> e garanta a troca de peças com qualidade e precisão.
          </p>
          <p className="paragrafo-escuro">
            📍 <a href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu" target="_blank" rel="noopener noreferrer">
              Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP
            </a><br />
            📞 <a href="tel:+5511941097471">(11) 94109-7471</a><br />
            📧 <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
          </p>
        </section>

        <p className="paragrafo acknowledgment">
          Com a <strong>ZER0 20 GARAGE™</strong>, seu motor recebe os cuidados que merece, com peças confiáveis e instalação precisa.
        </p>

        <div className="terms-of-use-last-updated">
          <p className="paragrafo acknowledgment">
            Data da última atualização: {lastUpdated}
          </p>
          <button onClick={handleContentUpdate}></button>
        </div>

      </div>
    </div>
  );
};

export default Tp;
