import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css'; // Importa o arquivo global de estilos
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import {FaCogs, FaTools, FaCheckCircle, FaCreditCard } from 'react-icons/fa';
import { MdEngineering } from 'react-icons/md';
import { TbTruckDelivery, TbSettingsSearch } from 'react-icons/tb';
import { Helmet } from 'react-helmet-async';

// Lazy load heavy components
const TestimonialsCarousel = lazy(() => import('../../components/ui/TestimonialsCarousel'));
const ContatoCta = lazy(() => import('../../components/ui/ContatoCta'));

function Home() {
  const messages = [
    {
      title: '𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™',
      subtitle: 'Oficina Mecânica e Retífica de Motores Nacionais e Importados',
    },
    {
      title: 'Especialistas em Motores',
      subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
    },
    {
      title: 'Confiança e Qualidade',
      subtitle: 'Seu carro em boas mãos com nossa equipe experiente',
    },
  ];

  return (
    <>
    <Helmet>
  <title>ZER0 20 GARAGE™ - Retífica de Motores em Mairiporã</title>
  <meta name="description" content="Oficina mecânica especializada em retífica de motores nacionais e importados. Diagnóstico, desmontagem, usinagem e montagem com qualidade garantida." />
  <meta name="keywords" content="retífica de motor, oficina mecânica, Mairiporã, motor fundido, motores nacionais, motores importados, manutenção automotiva" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph (para Facebook e redes) */}
  <meta property="og:title" content="ZER0 20 GARAGE™ - Retífica de Motores em Mairiporã" />
  <meta property="og:description" content="Especialistas em retífica de motores nacionais e importados com atendimento ágil e pagamento facilitado." />
  <meta property="og:image" content="https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429488/imagem-og_trb3ws.jpg" />
  <meta property="og:url" content="https://www.zero20garage.com/" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ZER0 20 GARAGE™ - Retífica de Motores em Mairiporã" />
  <meta name="twitter:description" content="Oficina mecânica completa para retífica e manutenção de motores." />
  <meta name="twitter:image" content="https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429488/imagem-og_trb3ws.jpg" />
</Helmet>

    <div className="page-escuro">
    <DynamicHeader page="home" messages={messages} />
    <Breadcrumbs />

      <div className='highlight-item home-header home-highlight-item'>
        <h2 className="titulo-claro home-title">Retífica de Motores e Soluções Mecânicas Sob Medida</h2>
        <h3 className="subtitulo-claro">Atendimento especializado para veículos nacionais e importados.</h3>
        <a href="/orcamento" className="button">Solicite um Orçamento</a>
      </div>

    {/* Destaques */}
      <div className='highlight-item home-highlight-item'>
        <h2 className="titulo-claro home-title">Por que a Zero 20 Garage?</h2>
      <div className="timeline">
        <div className="timeline-step">
          <div className="icon-animated">
            <FaCreditCard size={60} color="#ff0015" />
          </div>
          <h3 className="subtitulo-escuro">Pagamento Facilitado</h3>
          <p className="paragrafo-claro">Até 12x ou 5% de desconto à vista.</p>
        </div>

        <div className="timeline-step">
          <div className="icon-animated">
            <TbTruckDelivery size={60} color="#ff0015" />
          </div>
          <h3 className="subtitulo-escuro">Entrega Ágil</h3>
          <p className="paragrafo-claro">Serviço nacional: 4 a 7 dias úteis.</p>
          <p className="paragrafo-claro">Importados: até 15 dias.</p>
        </div>

        <div className="timeline-step">
          <div className="icon-animated">
            <MdEngineering size={60} color="#ff0015" />
          </div>
          <h3 className="subtitulo-escuro">Especialistas em Motores</h3>
          <p className="paragrafo-claro">Equipe qualificada e equipamentos modernos.</p>
        </div>
      </div>
    </div>

    {/* Linha do Tempo do Processo de Retífica */}
      <div className="highlight-item-processo home-highlight-item">
        <h2 className="titulo-claro home-title">Como Funciona o Processo de Retífica</h2>
        <div className="timeline">
          {/* 1. Diagnóstico e Avaliação Técnica */}
          <Link to="/Home/diagnostico" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <TbSettingsSearch size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">1. Diagnóstico e Avaliação</h3>
              <p
                className="paragrafo-claro"
                title="O diagnóstico é o primeiro e um dos mais importantes passos no processo de retífica de motores. Nossa equipe realiza uma avaliação minuciosa utilizando scanners automotivos OBD, estetoscópios mecânicos e ferramentas de medição de alta precisão, capazes de identificar desde falhas eletrônicas até desgastes internos imperceptíveis a olho nu. Durante a análise, inspecionamos cuidadosamente componentes críticos como bloco do motor, cabeçote, virabrequim, bronzinas, pistões, bielas, além dos sistemas de lubrificação e arrefecimento. Essa abordagem detalhada permite detectar fissuras, empenamentos, folgas excessivas e outros problemas. Com base no diagnóstico, elaboramos um laudo técnico que orienta todas as etapas seguintes da retífica, assegurando máxima precisão e durabilidade do motor."
              >
                Avaliação Técnica
              </p>
            </div>
          </Link>

          {/* 2. Remoção do Motor */}
          <Link to="/Home/Remocao-do-Motor" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <FaTools size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">2. Remoção do Motor</h3>
              <p
                className="paragrafo-claro"
                title="Após receber o veículo na oficina, o mecânico responsável adota como primeiro passo a retirada do motor do compartimento, removendo cabos, conectores de sensores, atuadores e se certificando de que o motor está livre de todas as conexões mecânicas antes de retirá-lo por completo do cofre."
              >
                Remoção do Veículo
              </p>
            </div>
          </Link>

          {/* 3. Desmontagem Técnica */}
          <Link to="/Home/Desmontagem-Técnica" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <FaTools size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">3. Desmontagem Técnica</h3>
              <p
                className="paragrafo-claro"
                title="Após a retirada, o mecânico realiza a desmontagem técnica do motor utilizando ferramentas adequadas, conhecimento e experiência para garantir a desmontagem somente do necessário e sem causar danos estruturais. Cada peça é retirada cuidadosamente e o processo é documentado para identificar a origem das falhas e determinar as necessidades de reparo. A inspeção minuciosa pós-desmontagem inclui a análise de trincas, desgastes excessivos, deformações e falhas ocultas, com o apoio de instrumentos de medição de alta precisão, garantindo uma base sólida para a próxima etapa."
              >
                Desmontagem Técnica
              </p>
            </div>
          </Link>

          {/* 4. Limpeza das Peças */}
          <Link to="/Home/Limpeza-das-Peças" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <FaCheckCircle size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">4. Limpeza das Peças</h3>
              <p
                className="paragrafo-claro"
                title="Na fase de limpeza, as partes metálicas do motor são submetidas a um banho químico específico para remover borras de óleo, resíduos de carbono e contaminantes. Isso garante que a limpeza não apenas preserve o motor, mas também evite que qualquer sujeira possa camuflar avarias durante o procedimento de inspeção."
              >
                Banho Químico
              </p>
            </div>
          </Link>

          {/* 5. Inspeção e Medição */}
          <Link to="/Home/Inspeção-e-Medição" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <TbSettingsSearch size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">5. Inspeção e Medição</h3>
              <p
                className="paragrafo-claro"
                title="Após a limpeza, inicia-se a inspeção e medição das peças utilizando instrumentos de metrologia como paquímetro, relógio comparador e calibrador de folga. São realizadas checagens de altura de cabeçote, diâmetro dos cilindros, colos do virabrequim, entre outras. Essas informações são essenciais para a elaboração do orçamento e para identificar quais peças deverão ser substituídas, retificadas ou recuperadas."
              >
                Metrologia e Análise
              </p>
            </div>
          </Link>

          {/* 6. Retífica das Peças */}
          <Link to="/Home/Retífica-das-Peças" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <FaCogs size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">6. Retífica das Peças</h3>
              <p
                className="paragrafo-claro"
                title="A usinagem é o pilar da retífica, removendo deformações e restabelecendo tolerâncias rigorosas para garantir a longevidade dos componentes. Utilizamos máquinas CNC de última geração. Processos essenciais incluem: Mandrilamento de Cilindros (corrige ovalizações), Plaina (elimina empenamentos para vedação perfeita), Brunimento (garante lubrificação ideal) e Retífica de Virabrequim/Comando (restaura geometrias). O retificador corrige as medidas ou aplica novas medidas definidas pela engenharia técnica, como o faceamento do cabeçote e brunimento dos cilindros."
              >
                Usinagem de Precisão
              </p>
            </div>
          </Link>

          {/* 7. Montagem e Sincronismo */}
          <Link to="/Home/Montagem-e-Sincronismo" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <MdEngineering size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">7. Montagem e Sincronismo</h3>
              <p
                className="paragrafo-claro"
                title="A montagem é feita com extrema precisão, seguindo rigorosamente as especificações técnicas do fabricante. Utilizamos torquímetros calibrados e ferramentas específicas. O montador realiza uma nova inspeção das peças e componentes, conferindo as medidas e o sincronismo final do motor. Após a montagem, realizamos testes rigorosos em bancada para validar o funcionamento (pressão de óleo, temperatura, compressão), garantindo confiabilidade e alto desempenho."
              >
                Montagem Técnica
              </p>
            </div>
          </Link>

          {/* 8. Instalação no Veículo */}
          <Link to="/Home/Instalação-no-Veículo" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <FaCheckCircle size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">8. Instalação no Veículo</h3>
              <p
                className="paragrafo-claro"
                title="Durante a instalação, o mecânico verifica as condições de todos os acessórios no cofre do motor — mangueiras de arrefecimento, sensores e atuadores. Essa inspeção garante que a linha eletrônica e os componentes periféricos estejam em plenas condições de operação, prevenindo o motor de uma quebra causada por superaquecimento ou falta de lubrificação por falha de algum componente. Itens que apresentarem rigidez ou desgaste devem ser substituídos."
              >
                Instalação e Testes
              </p>
            </div>
          </Link>

          {/* 9. Teste de Funcionamento */}
          <Link to="/Home/Teste-de-Funcionamento-e-Rodagem-do-Motor-do-Veículo" className="link-timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <TbTruckDelivery size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-escuro">9. Teste de Funcionamento</h3>
              <p
                className="paragrafo-claro"
                title="A fase final envolve testes indispensáveis para componentes que só podem ser verificados em operação, como os sistemas de arrefecimento e lubrificação, que são submetidos a aumento de temperatura e pressão. Os testes de funcionamento e rodagem comprovam a qualidade do serviço prestado, identificam e corrigem possíveis problemas, e garantem a liberação do veículo pronto para o uso seguro."
              >
                Rodagem e Entrega
              </p>
            </div>
          </Link>
        </div>
      </div>

    {/* Depoimentos */}
      <div className='highlight-item home-highlight-item'>
        <h2 className="titulo-claro home-title">O que Nossos Clientes Dizem</h2>
        <Suspense fallback={<div>Carregando depoimentos...</div>}>
          <TestimonialsCarousel />
        </Suspense>
      </div>


    {/* Fale Conosco */}

    {/* Endereço */}
    <section className="institucional-section">
      <Suspense fallback={<div>Carregando contato...</div>}>
        <ContatoCta />
      </Suspense>
    </section>
    </div>
    </>
  );
}

export default Home;
