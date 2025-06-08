import React, { useState, useEffect } from 'react';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

import '../../styles/Blog.css';

const Td = () => {
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
    console.log('Conteúdo da página foi atualizado!');
    updateLastUpdated();
  };

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="container-claro">

        <section className="section">
          <h2 className="titulo-escuro">
            Teste de Desempenho do Motor: Garanta Potência e Eficiência
          </h2>
          <p className="paragrafo-escuro">
            Na <strong>ZER0 20 GARAGE™</strong>, sabemos que a performance do seu motor é essencial para o bom funcionamento do veículo. Por isso, oferecemos um <strong>teste completo de desempenho</strong> com tecnologia de ponta e técnicos altamente capacitados.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">1. Por que realizar um Teste de Desempenho?</h3>
          <ul className="lista-escuro">
            <li><strong>Diagnosticar falhas:</strong> Identificar problemas que afetam potência, eficiência e segurança.</li>
            <li><strong>Verificar o estado geral do motor:</strong> Avaliação de compressão, vazamentos e desgaste.</li>
            <li><strong>Otimizar a performance:</strong> Após retífica ou manutenção, é essencial validar o desempenho ideal.</li>
            <li><strong>Evitar danos futuros:</strong> A detecção precoce de anomalias evita prejuízos maiores.</li>
            <li><strong>Melhorar o consumo de combustível:</strong> Motores ajustados consomem menos.</li>
            <li><strong>Garantir maior vida útil:</strong> Performance correta prolonga a durabilidade do motor.</li>
            <li><strong>Mais segurança:</strong> Motores saudáveis respondem melhor em situações de risco.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">2. O que é avaliado no Teste de Desempenho?</h3>
          <ul className="lista-escuro">
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

        <section className="section">
          <h3 className="subtitulo-escuro">3. Para quem é indicado?</h3>
          <ul className="lista-escuro">
            <li>Proprietários que desejam manter o motor em alta performance.</li>
            <li>Carros com histórico de falhas ou sintomas de desempenho reduzido.</li>
            <li>Após retífica ou manutenção completa do motor.</li>
            <li>Antes da compra ou venda de veículos usados.</li>
            <li>Frotas que dependem de confiabilidade operacional.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">4. Agende seu Teste de Desempenho</h3>
          <p className="paragrafo-escuro">
            Nossa equipe está pronta para oferecer diagnóstico preciso e soluções eficientes. Faça agora seu agendamento com a <strong>ZER0 20 GARAGE™</strong>.
          </p>
          <p className="paragrafo-escuro">
            📍 <a href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
              Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP
            </a><br />
            📞 <a href="tel:+5511941097471">(11) 94109-7471</a><br />
            📧 <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
          </p>
        </section>

        <p className="paragrafo acknowledgment">
          Invista na saúde do seu motor. Conte com a <strong>ZER0 20 GARAGE™</strong> para testes precisos e confiáveis.
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

export default Td;
