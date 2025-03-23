import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import DynamicHeader from '../components/DynamicHeader';

function Blog() {

  // Rola para o topo ao montar o componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const messages = [
    {
      title: 'Retífica de Motores',
      subtitle: 'Como Saber Quando Seu Motor Precisa de Reparo?',
    },
    {
      title: 'O Processo de Retífica',
      subtitle: 'Como Funciona e Quais Ferramentas São Usadas?',
    },
    {
      title: 'Manutenção de Motores',
      subtitle: 'Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor',
    },
  ];

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Função para monitorar o scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para rolar até o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container">
      <DynamicHeader messages={messages} />
      <section className="container">
        <h2>Artigos do Blog</h2>
        <ul className="blog-links">
          <li>
            <a href="#retifica-de-motores">
              Retífica de Motores: Como Saber Quando Seu Motor Precisa de Reparo?
            </a>
          </li>
          <li>
            <a href="#processo-de-retifica">
              O Processo de Retífica: Como Funciona e Quais Ferramentas São Usadas?
            </a>
          </li>
          <li>
            <a href="#manutencao-de-motores">
              Manutenção de Motores: Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor
            </a>
          </li>
        </ul>
      </section>

      {/* Seções correspondentes */}
      <section id="retifica-de-motores" className="blog-section">
        <h1>Retífica de Motores</h1>
        <p>
          A retífica de motores é um processo essencial para restaurar o desempenho do motor. Saiba como identificar os sinais de que seu motor precisa de reparo e os benefícios desse serviço.
        </p>

        <h4>Introdução:</h4>
        <p>
          O motor do seu carro é um dos componentes mais importantes para o desempenho e segurança do veículo. Com o tempo e o uso, peças podem se desgastar, o que pode levar à necessidade de um reparo mais profundo, como a retífica. Mas como saber quando é a hora de fazer esse tipo de serviço? Neste artigo, vamos explicar os sinais que indicam que o motor do seu carro precisa de retífica e o que fazer quando isso acontecer.
        </p>

        <h4>1. Sinais de que seu motor precisa de retífica</h4>
        <p>Existem vários sinais que podem indicar que o motor do seu carro precisa de retífica. Alguns dos mais comuns incluem:</p>
        <ul>
          <li>Perda de Potência</li>
          <p>
            Um dos primeiros sinais de que algo não vai bem com o motor é a perda de potência. Se você percebe que o carro não acelera tão rapidamente ou demora mais para atingir velocidades mais altas, isso pode indicar que o motor está com problemas em componentes essenciais, como pistões ou anéis de pistão.
          </p>
          <li>Fumaça no Escape</li>
          <p>
            Fumaça de cor branca ou azul saindo do escapamento é um sinal claro de que há um problema no motor. A fumaça azul pode ser causada por óleo sendo queimado, enquanto a fumaça branca geralmente é um indício de que o motor está com falhas nas vedações ou no sistema de arrefecimento.
          </p>
          <li>Consumo Excessivo de Óleo</li>
          <p>
            Se você precisa adicionar óleo com frequência ou notar que o nível de óleo cai rapidamente, isso pode significar que há um desgaste nas peças internas do motor, o que pode requerer a retífica.
          </p>
          <li>Ruídos Estranhos</li>
          <p>
            Se o motor começa a fazer ruídos incomuns, como batidas metálicas, é um sinal de que algo não está funcionando corretamente. Isso pode ser causado por peças desgastadas, como os pistões ou os cilindros.
          </p>
        </ul>
        <p>
          Esses são apenas alguns dos sinais que podem indicar que o motor do seu carro precisa de retífica. Se você notar qualquer um deles, é importante levar o veículo a um mecânico especializado para uma avaliação mais detalhada.
        </p>

        <h4>2. O que fazer quando perceber esses sinais?</h4>
        <p>
          Se você notar um ou mais desses sintomas, é hora de levar seu carro a um mecânico especializado em retífica de motores. Ele fará uma avaliação detalhada para determinar se a retífica é realmente necessária.
        </p>
        <p>
          Se for o caso, o processo de retífica envolve a desmontagem do motor, a inspeção minuciosa de todas as peças e a substituição ou reparo das que estiverem desgastadas. O objetivo é restaurar o motor às suas condições originais para garantir o melhor desempenho e durabilidade.
        </p>

        <h4>Conclusão:</h4>
        <p>A retífica de motores é um processo essencial para garantir que seu veículo continue funcionando de maneira eficiente. Prestar atenção aos sinais de desgaste e agir rapidamente pode evitar danos maiores e custos mais altos no futuro. Não deixe para depois, cuide bem do seu motor!
        </p>
      </section>

      <section id="processo-de-retifica" className="blog-section">
        <h1>O Processo de Retífica</h1>
        <p>
          Entenda como funciona o processo de retífica de motores, desde a desmontagem até o uso de ferramentas especializadas para garantir a máxima eficiência do motor.
        </p>
        <h4>Introdução:</h4>
        <p>
        A retífica de motores é um processo complexo que visa recuperar o desempenho de motores desgastados, muitas vezes devido ao uso contínuo e ao desgaste natural das peças. Se você já ouviu falar sobre retífica, mas não sabe exatamente como ela funciona, este artigo irá esclarecer o processo e as ferramentas essenciais usadas pelos profissionais para realizar esse serviço.
        </p>

        <h4>1. O que é retífica de motores?</h4>
        <p>A retífica de motores envolve a recuperação de peças desgastadas, como pistões, cilindros e bielas, para restaurar o desempenho do motor. O objetivo é devolver as especificações de fábrica das peças e garantir que o motor funcione de maneira eficiente novamente.
        </p>
        <h4>2. Etapas do Processo de Retífica</h4>
        <p>O processo de retífica de motores é dividido em várias etapas, cada uma com sua importância para garantir a qualidade do serviço. As etapas mais comuns incluem:</p>
        <ul>Desmontagem do Motor:** O primeiro passo é retirar o motor do veículo e desmontá-lo completamente. As peças internas são inspecionadas para avaliar o desgaste e a necessidade de reparos.
        </ul>
        <ul>Limpeza e Inspeção: Após a desmontagem, todas as peças são limpas com equipamentos especializados. Isso inclui a remoção de carbonização, sujeira e outros resíduos acumulados durante o uso.
        </ul>
        <ul>Retificação das Peças: Nesta etapa, as peças como os cilindros, pistões, virabrequim e cabeçotes são retificados. Isso é feito usando ferramentas de precisão que restauram as dimensões originais das peças.
        </ul>
        <ul>Montagem e Testes: Após as peças serem retificadas e reinstaladas, o motor é remontado e testado para garantir que todas as funções estejam operando corretamente.
        </ul>
        <h4>3. Ferramentas Usadas na Retífica de Motores</h4>
        <p>Para realizar a retífica de motores, os profissionais utilizam uma variedade de ferramentas especializadas, incluindo:</p>
        <ul>Máquinas de Retífica de Cilindros:** Essas máquinas são usadas para corrigir o desgaste nos cilindros e restaurar as especificações originais.
        </ul>
        <ul>Mandriladora:** A mandriladora é usada para retificar a superfície do virabrequim e das bielas, garantindo que fiquem perfeitas para o funcionamento adequado do motor.
        </ul>
        <ul>Furadeiras e Brocas de Precisão:** São usadas para ajustar as medidas e os furos das peças, garantindo que todas as tolerâncias sejam atendidas.
        </ul>
        <ul>Equipamento de Medição:** Ferramentas como micrômetros e calibradores são essenciais para medir as peças de maneira precisa e garantir que elas atendam às especificações exigidas.
        </ul>
        <h4>Conclusão:</h4>
        <p>A retífica de motores é um processo altamente técnico que exige precisão e equipamentos especializados. Se o motor do seu veículo apresenta sinais de desgaste, a retífica pode ser a solução ideal para restaurá-lo e prolongar a vida útil do veículo. Certifique-se de buscar um mecânico qualificado para realizar esse serviço.
        </p>
      </section>
      <section id="manutencao-de-motores" className="blog-section">
        <h1>Manutenção de Motores</h1>
        <p>
          Descubra dicas valiosas de profissionais para prolongar a vida útil do seu motor e evitar problemas futuros com manutenção preventiva.
        </p>
        <h4>Introdução:</h4>
        <p>
          A manutenção regular do motor é fundamental para garantir o bom desempenho e a longevidade do seu veículo. Muitos problemas podem ser evitados com cuidados simples, como trocas de óleo e verificações periódicas. Neste artigo, daremos dicas essenciais de profission
          ais para ajudá-lo a manter o motor do seu carro em ótimo estado por mais tempo.
        </p>
        <h4>1. Troque o Óleo Regularmente</h4>
        <p>
          Trocar o óleo do motor é uma das manutenções mais simples e eficazes que você pode fazer. O óleo lubrifica as peças do motor, reduz o atrito e ajuda a dissipar o calor. Com o tempo, o óleo perde suas propriedades e precisa ser substituído. Consulte o manual do seu veículo para saber a frequência ideal para a troca de óleo.
        </p>
        <h4>2. Verifique o Sistema de Arrefecimento</h4>
        <p>
          O sistema de arrefecimento, que inclui o radiador e as mangueiras, é responsável por manter o motor na temperatura ideal. Verifique periodicamente o nível do líquido de arrefecimento e a condição das mangueiras. Se o sistema estiver comprometido, o motor pode superaquecer, o que pode causar danos permanentes.
        </p>
        <h4>3. Fique Atento ao Filtro de Ar</h4>
        <p>
          O filtro de ar impede que sujeira e detritos entrem no motor e afetem seu funcionamento. Se o filtro de ar estiver entupido, o motor pode perder desempenho e consumir mais combustível. Troque o filtro de ar conforme as recomendações do fabricante para garantir a eficiência do motor.
        </p>
        <h4>4. Evite Dirigir de Forma Agressiva</h4>
        <p>
          A maneira como você dirige também pode impactar a vida útil do motor. Evite acelerações bruscas e frenagens repentinas, pois isso pode aumentar o desgaste das peças internas do motor. Dirigir de maneira suave e respeitando os limites de velocidade ajuda a reduzir o esforço no motor.
        </p>
        <h4>5. Faça Inspeções Periódicas</h4>
        <p>
          Realizar inspeções regulares em seu veículo pode ajudar a identificar problemas antes que eles se tornem grandes falhas. Verifique a correia dentada, as velas de ignição e outros componentes que podem afetar o funcionamento do motor.
        </p>
        <h4>Conclusão:</h4>
        <p>
          A manutenção preventiva é a chave para maximizar a vida útil do motor do seu veículo. Com cuidados simples e uma abordagem regular, você pode evitar problemas maiores e garantir que o motor do seu carro continue funcionando de maneira eficiente por muitos anos.
        </p>
      </section>

      {/* Botão "Voltar ao Topo" */}
      {showScrollTop && (
        <button className="arrow-up" onClick={scrollToTop}>
          ☝️
        </button>
      )}
    </div>
  );
}

export default Blog;