import { Link } from 'react-router-dom';
import '../../styles/Home.css'; // Importa o arquivo global de estilos
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import TestimonialsCarousel from '../../components/TestimonialsCarousel';
import { FaTools, FaCogs, FaWrench, FaCheckCircle } from 'react-icons/fa';
import FAQSection from '../../components/FAQSection';



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
    <div className="page modo-escuro">
    <DynamicHeader page="home" messages={messages} />
    <Breadcrumbs />
      {/* Card padrão Section */}
      <div className="container-black">
        <section className="section">
          <div className='highlight-item'>
            <h2>Retífica de Motores e Soluções Mecânicas Sob Medida</h2>
            <h3>Atendimento especializado para veículos nacionais e importados.</h3>
            <a href="/orcamento" className="button">Solicite um Orçamento</a>
          </div>
        </section>

        {/* Destaques */}
        <section className="section">
          <div className='highlight-item'>
            <h2>Por que a Zero 20 Garage?</h2>
            <div className="highlights-grid">
              <div className="highlight-card">
                <h3>Pagamento Facilitado</h3>
                <p className="paragrafo-claro">Até 12x ou 5% de desconto à vista.</p>
              </div>
              <div className="highlight-card">
                <h3>Entrega Ágil</h3>
                <p className="paragrafo-claro">Serviço nacional: 4 a 7 dias úteis.<br />Importados: até 15 dias.</p>
              </div>
              <div className="highlight-card">
                <h3>Especialistas em Motores</h3>
                <p className="paragrafo-claro">Equipe qualificada e equipamentos modernos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Linha do Tempo do Processo de Retífica */}
        <section className="section">
          <div className="highlight-item">
            <h2>Como Funciona o Processo de Retífica</h2>
            <div className="timeline">
              <div className="timeline-step">
                <div className="icon-animated">
                  <FaTools size={60} color="#ff0015" />
                </div>
                <h3>
                  <Link to="/home/diagnostico" className="link-timeline">1. Diagnóstico</Link>
                </h3>
                <p className="paragrafo-claro" className="paragrafo-claro" title="Na Zero 20 Garage™ iniciamos o processo de retífica com uma análise minuciosa do motor, utilizando equipamentos de última geração. Esse diagnóstico completo identifica falhas ocultas e desgastes em componentes como: bloco do motor, cabeçote, virabrequim, sistema de lubrificação e arrefecimento, garantindo um plano de retífica preciso e seguro.">
                  Diagnóstico e Avaliação Técnica
                </p>
              </div>

              <div className="timeline-step">
                <div className="icon-animated">
                  <FaCogs size={60} color="#ff0015" />
                </div>
                <h3>
                  <Link to="/home/desmontagem" className="link-timeline">2. Desmontagem</Link>
                </h3>
                <p className="paragrafo-claro" title="A desmontagem é realizada de forma criteriosa, garantindo a integridade das peças e evitando danos adicionais. Cada componente é separado e classificado para uma avaliação individualizada, permitindo uma análise detalhada de desgastes, trincas ou deformações.">
                  Desmontagem do Motor
                </p>
              </div>

              <div className="timeline-step">
                <div className="icon-animated">
                  <FaWrench size={60} color="#ff0015" />
                </div>
                <h3>
                  <Link to="/home/usinagem" className="link-timeline">3. Usinagem</Link>
                </h3>
                <p className="paragrafo-claro" title="A Zero 20 Garage™ executa processos de usinagem com precisão milimétrica para corrigir imperfeições no bloco, cabeçote e outras partes fundamentais do motor. Garantimos o alinhamento perfeito e o correto funcionamento, respeitando todas as especificações técnicas.">
                  Usinagem e Correção
                </p>
              </div>

              <div className="timeline-step">
                <div className="icon-animated">
                  <FaCheckCircle size={60} color="#ff0015" />
                </div>
                <h3>
                  <Link to="/home/montagemteste" className="link-timeline">4. Montagem e Teste</Link>
                </h3>
                <p className="paragrafo-claro" title="Após a preparação das peças, realizamos a montagem técnica do motor, utilizando ferramentas calibradas e peças de alta qualidade. Todo o processo segue rigorosos padrões de torque e ajuste para garantir durabilidade e performance.">
                  Montagem Técnica
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Serviços */}

        {/* Depoimentos */}
        <section className="section">
          <div className='highlight-item'>
            <h2>O que Nossos Clientes Dizem</h2>
              <TestimonialsCarousel />
          </div>
        </section>

        <FAQSection />
        {/* Fale Conosco */}


        {/* Endereço */}
        <div className="highlight-item">
          <address className="address">
            <strong>ZER0 20 GARAGE™</strong><br />
            <a href='https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu' target="_blank" rel="noopener noreferrer">Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
            <a href="tel:+5511941097471">(11) 94109-7471</a><br />
            <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a><br />
            <a href="https://www.instagram.com/zero20garage/" target="_blank" rel="noopener noreferrer">Instagram</a><br />
          </address>
        </div>
      </div>
    </div>
  );
}

export default Home;
