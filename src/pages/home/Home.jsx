import { Link } from 'react-router-dom';
import '../../styles/Home.css'; // Importa o arquivo global de estilos
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import TestimonialsCarousel from '../../components/TestimonialsCarousel';
import { MdEngineering, FaCogs, FaWrench, FaCheckCircle, FaCreditCard, FaEnvelope, FaWhatsapp, TbTruckDelivery } from 'react-icons/fa';
import FAQSection from '../../components/FAQSection';
import { Helmet } from 'react-helmet';



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
  <meta property="og:image" content="https://www.zero20garage.com/imagens/og-home.jpg" />
  <meta property="og:url" content="https://www.zero20garage.com/" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="ZER0 20 GARAGE™ - Retífica de Motores em Mairiporã" />
  <meta name="twitter:description" content="Oficina mecânica completa para retífica e manutenção de motores." />
  <meta name="twitter:image" content="https://www.zero20garage.com/imagens/og-home.jpg" />
</Helmet>

    <div className="page-escuro">
    <DynamicHeader page="home" messages={messages} />
    <Breadcrumbs />

      <div className="container-escuro">

          <div className='highlight-item home-header'>
            <h2 className="titulo-claro">Retífica de Motores e Soluções Mecânicas Sob Medida</h2>
            <h3 className="subtitulo-claro">Atendimento especializado para veículos nacionais e importados.</h3>
            <a href="/orcamento" className="button">Solicite um Orçamento</a>
          </div>

        {/* Destaques */}
          <div className='highlight-item'>
            <h2 className="titulo-claro">Por que a Zero 20 Garage?</h2>
          <div className="timeline">
            <div className="timeline-step">
              <div className="icon-animated">
                <FaCreditCard size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-claro">Pagamento Facilitado</h3>
              <p className="paragrafo-claro">Até 12x ou 5% de desconto à vista.</p>
            </div>

            <div className="timeline-step">
              <div className="icon-animated">
                <TbTruckDelivery size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-claro">Entrega Ágil</h3>
              <p className="paragrafo-claro">Serviço nacional: 4 a 7 dias úteis.</p>
              <p className="paragrafo-claro">Importados: até 15 dias.</p>
            </div>

            <div className="timeline-step">
              <div className="icon-animated">
                <MdEngineering size={60} color="#ff0015" />
              </div>
              <h3 className="subtitulo-claro">Especialistas em Motores</h3>
              <p className="paragrafo-claro">Equipe qualificada e equipamentos modernos.</p>
            </div>
          </div>
        </div>

        {/* Linha do Tempo do Processo de Retífica */}
          <div className="highlight-item">
            <h2 className="titulo-claro">Como Funciona o Processo de Retífica</h2>
            <div className="timeline">
              <Link to="/home/diagnostico" className="link-timeline">
                <div className="timeline-step">
                  <div className="icon-animated">
                    <FaTools size={60} color="#ff0015" />
                  </div>
                  <h3 className="subtitulo-claro">1. Diagnóstico</h3>
                  <p
                    className="paragrafo-claro"
                    title="Na Zero 20 Garage™ iniciamos o processo de retífica com uma análise minuciosa do motor, utilizando equipamentos de última geração. Esse diagnóstico completo identifica falhas ocultas e desgastes em componentes como: bloco do motor, cabeçote, virabrequim, sistema de lubrificação e arrefecimento, garantindo um plano de retífica preciso e seguro."
                  >
                    Diagnóstico e Avaliação Técnica
                  </p>
                </div>
              </Link>

              <Link to="/home/desmontagem" className="link-timeline">
                <div className="timeline-step">
                  <div className="icon-animated">
                    <FaWrench size={60} color="#ff0015" />
                  </div>
                  <h3 className="subtitulo-claro">2. Desmontagem</h3>
                  <p
                    className="paragrafo-claro"
                    title="A desmontagem é realizada de forma criteriosa, garantindo a integridade das peças e evitando danos adicionais. Cada componente é separado e classificado para uma avaliação individualizada, permitindo uma análise detalhada de desgastes, trincas ou deformações."
                  >
                    Desmontagem do Motor
                  </p>
                </div>
              </Link>

              <Link to="/home/usinagem" className="link-timeline">
                <div className="timeline-step">
                  <div className="icon-animated">
                    <FaCogs size={60} color="#ff0015" />
                  </div>
                  <h3 className="subtitulo-claro">3. Usinagem</h3>
                  <p
                    className="paragrafo-claro"
                    title="A Zero 20 Garage™ executa processos de usinagem com precisão milimétrica para corrigir imperfeições no bloco, cabeçote e outras partes fundamentais do motor. Garantimos o alinhamento perfeito e o correto funcionamento, respeitando todas as especificações técnicas."
                  >
                    Usinagem e Correção
                  </p>
                </div>
              </Link>

              <Link to="/home/montagemteste" className="link-timeline">
                <div className="timeline-step">
                  <div className="icon-animated">
                    <FaCheckCircle size={60} color="#ff0015" />
                  </div>
                  <h3 className="subtitulo-claro">4. Montagem e Teste</h3>
                  <p
                    className="paragrafo-claro"
                    title="Após a preparação das peças, realizamos a montagem técnica do motor, utilizando ferramentas calibradas e peças de alta qualidade. Todo o processo segue rigorosos padrões de torque e ajuste para garantir durabilidade e performance."
                  >
                    Montagem Técnica
                  </p>
                </div>
              </Link>
            </div>
          </div>

        {/* Depoimentos */}
          <div className='highlight-item'>
            <h2 className="titulo-claro">O que Nossos Clientes Dizem</h2>
              <TestimonialsCarousel />
          </div>

        <FAQSection />
        {/* Fale Conosco */}

        {/* Endereço */}
          <div className="highlight-item">
            <h2 className="titulo-claro">Nossos Canais de Atendimento</h2>
            <p className="paragrafo-claro">Escolha o canal que preferir para falar conosco:</p>
            <div className="contact-cards">
              <div className="contact-card">
                <FaMapMarkerAlt className="contact-icon" />
                <a
                  href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Endereço da oficina"
                >
                  Av. Laura Gomes Hannickel, 153<br />Capoavinha - Mairiporã, SP
                </a>
              </div>
              <div className="contact-card">
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+5511941097471" aria-label="Ligar para (11) 94109-7471">
                  (11) 94109-7471
                </a>
              </div>
              <div className="contact-card">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:contato@zero20garage.com">
                  contato@zero20garage.com
                </a>
              </div>
              <div className="contact-card">
                <FaWhatsapp className="contact-icon" />
                <a
                  href="https://wa.me/5511941097471?text=Olá! Gostaria de mais informações sobre os serviços."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enviar mensagem via WhatsApp"
                >
                  Fale pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  );
}

export default Home;
