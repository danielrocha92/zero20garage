import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import '../../styles/HomeDetails.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import desmontagem1 from '../../assets/images/desmontagem1.jpg';
import desmontagem2 from '../../assets/images/desmontagem2.jpg';
import desmontagem3 from '../../assets/images/desmontagem3.jpg';

function Desmontagem() {
  const messages = [
    {
      title: 'Processo Minucioso',
      subtitle: 'Desmontagem técnica e segura do motor',
    }
  ];

  const images = [desmontagem1, desmontagem2, desmontagem3];

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
    <div className="page modo-escuro">
      <DynamicHeader page="home" messages={messages} />
      <Breadcrumbs />

      <div className="container-black">
        <section className="section">
          <div className='highlight-item'>
            {/* Carrossel de imagens */}
            <div className="carousel-container">
              <Slider {...sliderSettings}>
                {images.map((src, index) => (
                  <div key={index}>
                    <img src={src} alt={`Desmontagem ${index + 1}`} className="carousel-image"/>
                  </div>
                ))}
              </Slider>
            </div>

            <h1 className='titulo-claro'>Desmontagem do Motor</h1>
            <h3 className='subtitulo-claro'>Precisão, Cuidado e Responsabilidade Técnica</h3>

            <p className="paragrafo-claro">
              A desmontagem do motor é uma etapa fundamental para a correta avaliação de todos os seus componentes. Nossos técnicos altamente capacitados realizam esse processo de forma sistemática e cuidadosa, garantindo que cada peça seja retirada sem causar danos estruturais.
            </p>

            <p className='paragrafo-claro'>
              Utilizamos ferramentas específicas e técnicas avançadas para assegurar a integridade dos componentes durante a desmontagem. Todo o processo é documentado e organizado para que seja possível identificar a origem de falhas e determinar as necessidades de reparo, substituição ou recuperação de peças.
            </p>

            <p className='paragrafo-claro'>
              A inspeção minuciosa pós-desmontagem inclui a análise de trincas, desgastes excessivos, deformações e falhas ocultas, com o apoio de instrumentos de medição de alta precisão. Esse rigor técnico assegura um diagnóstico preciso e uma base sólida para a próxima etapa do serviço: a usinagem ou reparação adequada.
            </p>

            <p className='paragrafo-claro'>
              Confie em nossa equipe para realizar uma desmontagem segura, responsável e alinhada com os mais altos padrões de qualidade da engenharia automotiva.
            </p>

            <Link to="/" className='button'>← Voltar para Home</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Desmontagem;
