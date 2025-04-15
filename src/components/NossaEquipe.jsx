// src/components/NossaEquipe.jsx
import React from 'react';
import Slider from 'react-slick';
import teamImage from '../assets/images/team.jpg';
import teamImage2 from '../assets/images/team2.jpg';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const NossaEquipe = () => (
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
          <img src={teamImage} alt="Nossa Equipe" className="team-image" />
        </div>
        <div className="team-image-container">
          <img src={teamImage2} alt="Nossa Equipe" className="team-image" />
        </div>
      </Slider>
    </div>
  </section>
);

export default NossaEquipe;
