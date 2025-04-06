// Sobre.jsx
import React from 'react';
import './Sobre.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import teamImage from '../assets/images/team.jpg'; // Importe a imagem da sua equipe
import teamImage2 from '../assets/images/team2.jpg'; // Importe a imagem da sua equipe
import Slider from 'react-slick'; // Importa o Slider do react-slick

// Configuração do carrossel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Habilita o autoplay
  autoplaySpeed: 3000, // Tempo entre cada slide
};

function Sobre() {
  const messages = [
    {
      title: 'Sobre Nós',
      subtitle: 'Conheça mais sobre a nossa história e missão',
    },
    {
      title: 'Nossa Missão',
      subtitle: 'Oferecer serviços de qualidade com confiança e excelência',
    },
    {
      title: 'Nossa Visão',
      subtitle: 'Ser referência no mercado de retífica e mecânica automotiva',
    },
  ];

  return (
    <div className="sobre">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <div className="container">
        <section className="sobre-section">
          <div className='sobre-section'>
            <div className='highlight-item'>
              <h1>Nossa História</h1>
              <p>A Zero20 Garage nasceu da paixão por motores e do desejo de oferecer serviços de retífica e mecânica automotiva de alta qualidade. Fundada em 2020, nossa oficina se destaca pela excelência no atendimento e pela precisão em cada serviço realizado.</p>
              <p>Desde o início, investimos em equipamentos de última geração e na capacitação de nossa equipe, garantindo que cada motor receba o cuidado e a atenção que merece.</p>
            </div>
          </div>

          <div className="highlights-grid">
            <div className="highlight-item">
              <h3>Nossa Missão</h3>
                <p>
                  Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência, superando as expectativas de nossos clientes.
                </p>
            </div>

            <div className="highlight-item">
              <h3>Nossa Visão</h3>
              <p>
                Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos serviços, inovação e compromisso com a satisfação dos clientes.
              </p>
            </div>

            <div className="highlight-item">
              <h3>Nossos Valores</h3>
                <ul>
                  <p>Qualidade: Compromisso com a excelência em cada serviço.</p>
                  <p>Confiança: Relações transparentes e honestas com nossos clientes.</p>
                  <p>Inovação: Busca constante por novas tecnologias e soluções.</p>
                  <p>Compromisso: Dedicação em atender e superar as expectativas dos clientes.</p>
                </ul>
            </div>
          </div>
        </section>

        <section className="sobre-section">
          <div className='sobre-section'>
            <section className="highlights-item">
              <div className="highlight-item">
                <h2>Nossa Equipe</h2>
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <p>Contamos com uma equipe de profissionais altamente qualificados e apaixonados por motores. Nossos técnicos são certificados e possuem vasta experiência em retífica e mecânica automotiva.</p>
                  </div>
                  <div className="highlight-item">
                    <p>Estamos sempre atualizados com as últimas tendências e tecnologias do mercado, garantindo que nossos clientes recebam o melhor serviço possível.</p>
                  </div>
                </div>

                {/* Carrossel de imagens */}
                <Slider {...settings}>
                  <div className="team-image-container">
                    <img src={teamImage} alt="Nossa Equipe" className="team-image" />
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage2} alt="Nossa Equipe" className="team-image" />
                  </div>
                  {/* Adicione mais imagens conforme necessário */}
                </Slider>
              </div>
            </section>
          </div>
        </section>

        {/* O restante da seção */}
        <section className="sobre-section">
          <div className='sobre-section'>
            <section className="highlights-item">
              <div className="highlight-item">
                <h2>Por que Escolher a Zero20 Garage?</h2>
                  <div className="highlights-grid">
                    <div className="highlight-item">
                      <p>Equipamentos de última geração</p>
                      <p>Profissionais altamente qualificados</p>
                    </div>
                    <div className="highlight-item">
                      <p>Compromisso com a qualidade</p>
                      <p>Atendimento diferenciado</p>
                    </div>
                  </div>
              </div>
            </section>
          </div>
        </section>

        {/* Seção de Depoimentos */}
        <section className="sobre-section">
          <div className='sobre-section'>
            <section className="highlights-item">
              <div className="highlight-item">
                <h2>Depoimentos de Clientes</h2>
                  <div className="highlights-grid">
                    <div className="highlight-item">
                      <p>Veja o que nossos clientes dizem sobre nós:</p>
                        <div className="highlights-grid">
                          <div className="testimonial-item">
                            <p>"Serviço excelente! Recomendo a Zero20 Garage para todos que precisam de retífica de motores."</p>
                            <strong>- João Silva</strong>
                          </div>
                        </div>

                        <div className="highlights-grid">
                          <div className="testimonial-item">
                            <p>"Atendimento nota 10! A equipe é muito profissional e prestativa."</p>
                            <strong>- Maria Oliveira</strong>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </section>
        </div>
      </section>

      <section className="sobre-section">
        <div className='sobre-section'>
          <div className='highlight-item'>
            <h2>Entre em Contato</h2>
            <p>Estamos prontos para atender você! Entre em contato conosco para agendar um serviço ou tirar dúvidas.</p>
            <a href="/contato" className="cta-button">Fale Conosco</a>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}

export default Sobre;
