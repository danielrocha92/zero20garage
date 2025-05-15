// Sobre.jsx
import React from 'react';
import './Sobre.css';
import DynamicHeader from '../../components/DynamicHeader';
import WhatsAppButton from '../../components/WhatsAppButton';
import ContatoCta from '../../components/ContatoCta';

import Slider from 'react-slick';
import teamImage from '../../assets/images/team.jpg';
import teamImage2 from '../../assets/images/team2.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'font-awesome/css/font-awesome.min.css';

import AnimatedPage from '../../components/AnimatedPage';


const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  fade: true,
  cssEase: 'ease-in-out',
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
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
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <AnimatedPage />
      <div className="container-escuro">
      <section className="sobre-section">
        <div className="highlight-item">
          <h1>Nossa História</h1>
          <div className="highlights-grid">
            <div className="highlight-item">
          <p>A Zero20 Garage nasceu da paixão por motores e do desejo de oferecer serviços de retífica e mecânica automotiva de alta qualidade. Fundada em 2020, nossa oficina se destaca pela excelência no atendimento e pela precisão em cada serviço realizado.</p>
          <p>Desde o início, investimos em equipamentos de última geração e na capacitação de nossa equipe, garantindo que cada motor receba o cuidado e a atenção que merece.</p>
          </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="highlight-item">

        <div className="highlights-grid">
        <div className="highlight-item">
          <h3 className="subtitle">Nossa Missão</h3>
          <p>Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência, superando as expectativas de nossos clientes.</p>
        </div>
        <div className="highlight-item">
          <h3 className="subtitle">Nossa Visão</h3>
          <p>Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos serviços, inovação e compromisso com a satisfação dos clientes.</p>
        </div>
        <div className="highlight-item">
          <h3 className="subtitle">Nossos Valores</h3>
          <ul className="section-list">
            <p>Qualidade: Compromisso com a excelência em cada serviço.</p>
            <p>Confiança: Relações transparentes e honestas com nossos clientes.</p>
            <p>Compromisso: Dedicação em atender e superar as expectativas dos clientes.</p>
          </ul>
        </div>


        </div>
        </div>
      </section>

      <section className="sobre-section">
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
            <Slider {...settings}>
              <div className="team-image-container">
                <div>
                  <img src={teamImage} alt="Carlos, chefe de oficina" className="team-image" />
                  <p className="team-caption">Carlos – Chefe de Oficina</p>
                </div>
              </div>
              <div className="team-image-container">
                <div>
                  <img src={teamImage2} alt="Fernanda, especialista em retífica" className="team-image" />
                  <p className="team-caption">Fernanda – Especialista em Retífica</p>
                </div>
              </div>
              <div className="team-image-container">
                <div>
                  <img src={teamImage} alt="Bruno, mecânico sênior" className="team-image" />
                  <p className="team-caption">Bruno – Mecânico Sênior</p>
                </div>
              </div>
              <div className="team-image-container">
                <div>
                  <img src={teamImage2} alt="Patrícia, atendimento ao cliente" className="team-image" />
                  <p className="team-caption">Patrícia – Atendimento ao Cliente</p>
                </div>
              </div>
            </Slider>
        </div>
      </section>
      <section className="sobre-section">
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

      <section className="sobre-section">
        <div className="highlight-item">
          <h2>Depoimentos de Clientes</h2>
          <div className="highlights-grid">
            <div className="testimonial-item">
              <p>"Serviço excelente! Recomendo a Zero20 Garage para todos que precisam de retífica de motores."</p>
              <strong>- João Silva</strong>
            </div>
            <div className="testimonial-item">
              <p>"Atendimento nota 10! A equipe é muito profissional e prestativa."</p>
              <strong>- Maria Oliveira</strong>
            </div>
          </div>
        </div>
      </section>
      <ContatoCta />
      </div>
    </div>
  );
}

export default Sobre;