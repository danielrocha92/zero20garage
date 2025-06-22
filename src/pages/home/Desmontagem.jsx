import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';
import '../../styles/Institucional.css'; // Usa o estilo institucional
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import desmontagem1 from '../../assets/images/desmontagem1.jpg';
import desmontagem2 from '../../assets/images/desmontagem2.jpg';
import desmontagem3 from '../../assets/images/desmontagem3.jpg';

const Desmontagem = () => {
  const messages = [
    {
      title: 'Processo Minucioso',
      subtitle: 'Desmontagem técnica e segura do motor',
    }
  ];

const LAST_UPDATED = '22 de junho de 2025'; // atualizado manualmente quando o conteúdo muda

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
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">Desmontagem do Motor</h2>
        </section>

        <section className="institucional-section">
          <div className="carousel-container">
            <Slider {...sliderSettings}>
              {images.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Etapa de desmontagem do motor ${index + 1}`}
                    className="carousel-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Precisão, Cuidado e Responsabilidade Técnica</h3>
          <p className="institucional-paragraph">
            A desmontagem do motor é uma etapa fundamental para a correta avaliação de todos os seus componentes. Nossos técnicos altamente capacitados realizam esse processo de forma sistemática e cuidadosa, garantindo que cada peça seja retirada sem causar danos estruturais.
          </p>
          <p className="institucional-paragraph">
            Utilizamos ferramentas específicas e técnicas avançadas para assegurar a integridade dos componentes durante a desmontagem. Todo o processo é documentado e organizado para que seja possível identificar a origem de falhas e determinar as necessidades de reparo, substituição ou recuperação de peças.
          </p>
          <p className="institucional-paragraph">
            A inspeção minuciosa pós-desmontagem inclui a análise de trincas, desgastes excessivos, deformações e falhas ocultas, com o apoio de instrumentos de medição de alta precisão. Esse rigor técnico assegura um diagnóstico preciso e uma base sólida para a próxima etapa do serviço: a usinagem ou reparação adequada.
          </p>
          <p className="institucional-paragraph">
            Confie em nossa equipe para realizar uma desmontagem segura, responsável e alinhada com os mais altos padrões de qualidade da engenharia automotiva.
          </p>
        </section>

        <section className="institucional-section">
          <ContatoCta />
        </section>

        <div className="institucional-last-updated">
          <p className="institucional-acknowledgment">
            Página atualizada em: {LAST_UPDATED}
          </p>
        </div>

        <div className="institucional-section">
          <Link to="/" className="home-button-voltar">← Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Desmontagem;
