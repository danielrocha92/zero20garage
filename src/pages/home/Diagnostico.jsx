import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import diagnostico1 from '../../assets/images/diagnostico1.jpg';
import diagnostico2 from '../../assets/images/diagnostico2.jpg';
import diagnostico3 from '../../assets/images/diagnostico3.jpg';

function Diagnostico() {
  const messages = [
    {
      title: 'Diagnóstico de Precisão',
      subtitle: 'Tecnologia de ponta para identificar falhas e garantir a eficiência do motor',
    }
  ];

  const images = [diagnostico1, diagnostico2, diagnostico3];

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
    <div className="page-escuro">
      <DynamicHeader page="home" messages={messages} />
      <Breadcrumbs />

      <div className="container-escuro">
       
          <div className='highlight-item'>
            {/* Carrossel de imagens */}
            <div className="carousel-container">
              <Slider {...sliderSettings}>
                {images.map((src, index) => (
                  <div key={index}>
                    <img src={src} alt={`Diagnóstico ${index + 1}`} className="carousel-image"/>
                  </div>
                ))}
              </Slider>
            </div>

            <h2 className='title'>Diagnóstico e Avaliação Técnica</h2>
            <h3 className='subtitle'>Análise Completa com Equipamentos de Última Geração</h3>

            <p className='paragrafo-claro'>
              O diagnóstico é o primeiro e um dos mais importantes passos no processo de retífica de motores. Nossa equipe realiza uma avaliação minuciosa utilizando scanners automotivos OBD, estetoscópios mecânicos e ferramentas de medição de alta precisão, capazes de identificar desde falhas eletrônicas até desgastes internos imperceptíveis a olho nu.
            </p>

            <p className='paragrafo-claro'>
              Durante a análise, inspecionamos cuidadosamente componentes críticos como bloco do motor, cabeçote, virabrequim, bronzinas, pistões, bielas, além dos sistemas de lubrificação e arrefecimento. Essa abordagem detalhada permite detectar fissuras, empenamentos, folgas excessivas e outros problemas que comprometem a performance e segurança do motor.
            </p>

            <p className='paragrafo-claro'>
              Com base no diagnóstico, elaboramos um laudo técnico que orienta todas as etapas seguintes da retífica. Esse planejamento é fundamental para assegurar que cada intervenção seja realizada com máxima precisão, prevenindo falhas futuras, otimizando o desempenho e garantindo a durabilidade do motor.
            </p>

            <p className='paragrafo-claro'>
              Conte com a nossa expertise e tecnologia avançada para obter um diagnóstico confiável e assertivo, o primeiro passo para devolver ao seu veículo a potência e a eficiência de um motor novo.
            </p>

            <Link to="/" className='button'>← Voltar para Home</Link>
          </div>
          
      </div>
    </div>
  );
}

export default Diagnostico;
