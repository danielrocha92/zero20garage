import React from 'react';
import './Sobre.css';
import DynamicHeader from '../../components/DynamicHeader';
import WhatsAppButton from '../../components/WhatsAppButton';
import ContatoCta from '../../components/ContatoCta';

import Slider from 'react-slick';
import teamImage from '../../assets/images/team.jpg';
import teamImage2 from '../../assets/images/team2.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AnimatedPage from '../../components/AnimatedPage';

const settings = {
  dots: true,                // bolinhas de navegação
  infinite: true,            // loop infinito
  speed: 500,                // velocidade da transição
  slidesToShow: 1,           // mostrar 1 slide por vez
  slidesToScroll: 1,         // rolar 1 slide por vez
  autoplay: true,            // ativar autoplay
  autoplaySpeed: 3000,       // tempo entre slides (ms)
  arrows: true,              // setas de navegação
  pauseOnHover: true,        // pausa autoplay ao passar o mouse
  responsive: [
    {
      breakpoint: 768,       // até 768px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,       // remover setas no mobile
        dots: true
      }
    }
  ]
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
    <div className="page-black">


      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <AnimatedPage />


      <div className="container-black">
        <section className="sobre-section">
          <div className="highlight-item nossa-historia">
            <h1>Nossa História</h1>
            <div className="historia-grid">
              <div className="historia-text">
                <p className='sobre-paragraph'>
                  A Zero20 Garage nasceu da paixão por motores e do desejo de oferecer serviços de retífica e mecânica automotiva de alta qualidade. Fundada em 2020, nossa oficina se destaca pela excelência no atendimento e pela precisão em cada serviço realizado.
                </p>
                <p className='sobre-paragraph'>
                  Desde o início, investimos em equipamentos de última geração e na capacitação de nossa equipe, garantindo que cada motor receba o cuidado e a atenção que merece.
                </p>
              </div>
              <div className="historia-image">
                <img src={teamImage} alt="Equipe Zero20 Garage" />
              </div>
            </div>
          </div>
        </section>


        <section className="sobre-section">
          <div className="highlight-item equipe-container">
            <h2>Nossa Equipe</h2>
            <div className="equipe-grid">
              <div className="equipe-slider">
                <Slider {...settings}>
                  <div className="team-image-container">
                    <img src={teamImage} alt="Carlos, chefe de oficina" className="team-image" />
                    <p className="team-caption">Carlos – Chefe de Oficina</p>
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage2} alt="Fernanda, especialista em retífica" className="team-image" />
                    <p className="team-caption">Fernanda – Especialista em Retífica</p>
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage} alt="Bruno, mecânico sênior" className="team-image" />
                    <p className="team-caption">Bruno – Mecânico Sênior</p>
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage2} alt="Patrícia, atendimento ao cliente" className="team-image" />
                    <p className="team-caption">Patrícia – Atendimento ao Cliente</p>
                  </div>
                </Slider>
              </div>

              <div className="equipe-textos">
                <p className="sobre-paragraph">
                  Contamos com uma equipe de profissionais altamente especializados e apaixonados por motores.
                </p>
                <p className="sobre-paragraph">
                  Nossa equipe possui anos de experiência no mercado automotivo.
                </p>
                <p className="sobre-paragraph">
                  Mais que profissionais, somos apaixonados pelo que fazemos.
                </p>
              </div>
            </div>
          </div>
        </section>



        <section className="section">
          <div className="highlight-item">
            <div className="highlights-grid">
              <div className="highlight-item">
                <h3 className="subtitle">Nossa Missão</h3>
                <p className='sobre-paragraph'>
                  Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência, superando as expectativas de nossos clientes.
                </p>
              </div>
              <div className="highlight-item">
                <h3 className="subtitle">Nossa Visão</h3>
                <p className='sobre-paragraph'>
                  Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos serviços, inovação e compromisso com a satisfação dos clientes.
                </p>
              </div>
              <div className="highlight-item">
                <h3 className="subtitle">Nossos Valores</h3>
                <ul className="section-list">
                  <li className='sobre-paragraph'>Qualidade: Compromisso com a excelência em cada serviço.</li>
                  <li className='sobre-paragraph'>Confiança: Relações transparentes e honestas com nossos clientes.</li>
                  <li className='sobre-paragraph'>Compromisso: Dedicação em atender e superar as expectativas dos clientes.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        <section className="sobre-section">
          <div className="highlight-item">
            <h2>Por que Escolher a Zero20 Garage?</h2>
            <div className="highlights-grid">
              <div className="highlight-item">
                <p className='sobre-paragraph'>Equipamentos de última geração</p>
                <p className='sobre-paragraph'>Profissionais altamente qualificados</p>
              </div>
              <div className="highlight-item">
                <p className='sobre-paragraph'>Compromisso com a qualidade</p>
                <p className='sobre-paragraph'>Atendimento diferenciado</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sobre-section">
          <div className="highlight-item">
            <h2>Depoimentos de Clientes</h2>
            <div className="highlights-grid">
              <div className="testimonial-item">
                <div className="highlight-card">
                  <p className='sobre-paragraph'>
                    "Serviço excelente! Recomendo a Zero20 Garage para todos que precisam de retífica de motores."
                  </p>
                  <span className="review-date">Abril de 2025</span>
                  <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">☆</span>
                  </div>
                  <strong>- João Silva</strong>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="highlight-card">
                  <p className='sobre-paragraph'>
                    "Atendimento nota 10! A equipe é muito profissional e prestativa."
                  </p>
                  <span className="review-date">Abril de 2025</span>
                  <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">☆</span>
                  </div>
                  <strong>- Maria Oliveira</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sobre-section">
          <div className="highlight-item">
            <h2>Visite a Zero20 Garage</h2>
            <p className='sobre-paragraph'>
              Venha nos visitar e conheça nossos serviços de perto! Será um prazer receber você em nossa oficina e apresentar toda a estrutura e equipe que fazem da Zero20 Garage uma referência em qualidade e confiança.
            </p>
          </div>
        </section>

        <ContatoCta />
      </div>
    </div>
  );
}

export default Sobre;
