import React from 'react';
import './Sobre.css';
import DynamicHeader from '../../components/DynamicHeader';

import ContatoCta from '../../components/ContatoCta';

import Slider from 'react-slick';
import teamImage from '../../assets/images/team.jpg';
import teamImage2 from '../../assets/images/team2.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumbs from '../../components/Breadcrumbs';
import TestimonialsCarousel from '../../components/TestimonialsCarousel';

import { FaBullseye, FaEye, FaStar } from 'react-icons/fa';

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
    <div className="page-escuro">

      <DynamicHeader page="sobre" messages={messages} />
      <Breadcrumbs />

      <div className="container-escuro">
        <section className="sobre-section">
          <div className="highlight-item nossa-historia">
            <h1 className='titulo-claro'>Nossa História</h1>
            <div className="historia-grid">
              <div className="historia-text">
                <p className='sobre-paragrafo'>
                  a Zero 20 Garage nasceu da paixão por motores e do desejo de oferecer serviços de retífica e mecânica automotiva de alta qualidade. Fundada em 2020, nossa oficina se destaca pela excelência no atendimento e pela precisão em cada serviço realizado.
                </p>
                <p className='sobre-paragrafo'>
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
            <h2 className='subtitulo-claro' translate='no'>Nossa Equipe</h2>
            <div className="equipe-grid">
              {/* Slider com fotos da equipe */}
              <div className="equipe-slider">
                <Slider {...settings}>
                  <div className="team-image-container">
                    <img src={teamImage} alt="Francisco Borges, Chefe de Oficina" className="team-image" />
                    <p className="team-caption">Francisco Borges, Chefe de Oficina</p>
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage2} alt="Rodney Santos, Especialista em Retífica" className="team-image" />
                    <p className="team-caption">Rodney Santos, Especialista em Retífica</p>
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage} alt="Reginaldo Pia, mecânico sênior" className="team-image" />
                    <p className="team-caption">Reginaldo Pia, mecânico Sênior</p>
                  </div>
                  <div className="team-image-container">
                    <img src={teamImage2} alt="Enzo Gabriel, Jovem Aprendiz" className="team-image" />
                    <p className="team-caption">Enzo Gabriel, Jovem Aprendiz</p>
                  </div>
                </Slider>
              </div>

              {/* Blocos de texto estilo cartões */}
              <div className="equipe-textos">
                <div className="highlight-card">
                  <h3 className="subtitle">Profissionais Especializados</h3>
                  <p className="sobre-paragrafo">
                    Contamos com uma equipe de profissionais altamente especializados e apaixonados por motores.
                    Nossos técnicos são certificados e possuem vasta experiência em retífica e mecânica automotiva.
                  </p>
                </div>

                <div className="highlight-card" style={{ marginTop: '1.5rem' }}>
                  <h3 className="subtitle">Experiência Comprovada</h3>
                  <p className="sobre-paragrafo">
                    Nossa equipe possui anos de experiência no mercado automotivo, garantindo serviços de alta qualidade
                    para todos os tipos de veículos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      <section className="sobre-section">
        <div className="highlight-item nossa-historia">
         <h2 className='subtitulo-claro' translate='no'>Nossos Princípios</h2>
          <div className="principios-grid">

            {/* Missão */}
            <div className="principio-item">
              <FaBullseye className="principio-icon" />
              <div>
                <h3 className="subtitle">Nossa Missão</h3>
                <p className="sobre-paragrafo">
                  Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência,
                  superando as expectativas de nossos clientes.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="principio-item">
              <FaEye className="principio-icon" />
              <div>
                <h3 className="subtitle">Nossa Visão</h3>
                <p className="sobre-paragrafo">
                  Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos
                  serviços, inovação e compromisso com a satisfação dos clientes.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="principio-item">
              <FaStar className="principio-icon" />
              <div>
                <h3 className="subtitle-p">Nossos Valores</h3>
                <p className="sobre-paragrafo">
                    <strong>Qualidade:</strong> Compromisso com a excelência em cada serviço.
                </p>
                <p className="sobre-paragrafo">
                  <strong>Confiança:</strong> Relações transparentes e honestas com nossos clientes.
                </p>
                <p className="sobre-paragrafo">
                  <strong>Compromisso:</strong> Dedicação em atender e superar as expectativas dos clientes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

        {/* Depoimentos */}
          <div className='highlight-item'>
            <h2 className='subtitulo-claro' translate='no'>O que Nossos Clientes Dizem</h2>
              <TestimonialsCarousel />
          </div>

        {/* Contatos */}
        <ContatoCta />
      </div>
    </div>
  );
}

export default Sobre;
