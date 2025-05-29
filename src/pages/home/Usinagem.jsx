import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/DynamicHeader';
import AnimatedPage from '../../components/AnimatedPage';
import '../../styles/HomeDetails.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import usinagem1 from '../../assets/images/usinagem1.jpg';
import usinagem2 from '../../assets/images/usinagem2.jpg';
import usinagem3 from '../../assets/images/usinagem3.jpg';

function Usinagem() {
  const messages = [
    {
      title: 'Especialistas em Motores',
      subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
    }
  ];

  const images = [usinagem1, usinagem2, usinagem3];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    adaptiveHeight: true
  };

  return (
    <div className="page-black">
      <DynamicHeader page="home" messages={messages} />
      <AnimatedPage />

      {/* Carrossel de imagens */}
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Usinagem ${index + 1}`} className="carousel-image"/>
            </div>
          ))}
        </Slider>
      </div>

      <div className="container-black">
        <section className="section">
          <div className='highlight-item'>
            <h1 className='title'>Usinagem de Motores</h1>
            <h3 className='subtitle'>Precisão, Qualidade e Tecnologia Avançada</h3>
            <p className='paragraph'>
              A usinagem é uma etapa essencial na retífica de motores, focada na correção e recuperação de componentes desgastados. Utilizamos máquinas CNC e equipamentos de alta precisão para restaurar as dimensões originais das peças, garantindo máxima eficiência e desempenho.
            </p>
            <p className='paragraph'>
              Este processo assegura o perfeito alinhamento e acabamento, promovendo a harmonia entre os componentes do motor. Com isso, proporcionamos maior durabilidade, potência e segurança para o funcionamento do veículo.
            </p>
            <p className='paragraph'>
              Confie na nossa equipe especializada e na tecnologia de ponta para obter resultados superiores na retífica e usinagem do seu motor.
            </p>

            <Link to="/" className='button'>← Voltar para Home</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Usinagem;
