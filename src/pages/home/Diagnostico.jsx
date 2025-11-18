import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css'; // estilo institucional padronizado
import '../../styles/HomeDetails.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Importando imagens do diagnóstico
const diagnostico1 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429472/diagnostico1_cufqfl.jpg';
const diagnostico2 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429473/diagnostico2_ee8n9d.jpg';
const diagnostico3 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429476/diagnostico3_nvsddl.jpg';

const Diagnostico = () => {
  const messages = [
    {
      title: 'Diagnóstico de Precisão',
      subtitle: 'Tecnologia de ponta para identificar falhas e garantir a eficiência do motor',
    }
  ];

const LAST_UPDATED = '22 de junho de 2025'; // atualizado manualmente quando o conteúdo muda

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
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">Diagnóstico e Avaliação Técnica</h2>
        </section>

          <div className="carousel-container">
            <Slider {...sliderSettings}>
              {images.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Diagnóstico ${index + 1}`}
                    className="carousel-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Análise Completa com Equipamentos de Última Geração</h3>
          <p className="institucional-paragraph">
            O diagnóstico é o primeiro e um dos mais importantes passos no processo de retífica de motores. Nossa equipe realiza uma avaliação minuciosa utilizando scanners automotivos OBD, estetoscópios mecânicos e ferramentas de medição de alta precisão, capazes de identificar desde falhas eletrônicas até desgastes internos imperceptíveis a olho nu.
          </p>
          <p className="institucional-paragraph">
            Durante a análise, inspecionamos cuidadosamente componentes críticos como bloco do motor, cabeçote, virabrequim, bronzinas, pistões, bielas, além dos sistemas de lubrificação e arrefecimento. Essa abordagem detalhada permite detectar fissuras, empenamentos, folgas excessivas e outros problemas que comprometem a performance e segurança do motor.
          </p>
          <p className="institucional-paragraph">
            Com base no diagnóstico, elaboramos um laudo técnico que orienta todas as etapas seguintes da retífica. Esse planejamento é fundamental para assegurar que cada intervenção seja realizada com máxima precisão, prevenindo falhas futuras, otimizando o desempenho e garantindo a durabilidade do motor.
          </p>
          <p className="institucional-paragraph">
            Conte com a nossa expertise e tecnologia avançada para obter um diagnóstico confiável e assertivo, o primeiro passo para devolver ao seu veículo a potência e a eficiência de um motor novo.
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

export default Diagnostico;
