import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const usinagem1 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429522/usinagem1_onovgv.jpg';
const usinagem2 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429523/usinagem2_woplze.jpg';
const usinagem3 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429529/usinagem3_jg8bsu.jpg';

const Usinagem = () => {
  const messages = [
    {
      title: 'Especialistas em Motores',
      subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
    }
  ];

const LAST_UPDATED = '02 de dezembro de 2025'; // atualizado manualmente quando o conteúdo muda

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
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">Usinagem de Motores</h2>

        </section>

        <div className="carousel-container">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`Usinagem ${index + 1}`} className="carousel-image"/>
            </div>
          ))}
        </Slider>
      </div>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">6. Retífica das Peças (Usinagem de Precisão)</h3>
          <p className="institucional-paragraph">
            A usinagem é o pilar da retífica, removendo deformações e restabelecendo tolerâncias rigorosas para garantir a longevidade dos componentes. Utilizamos máquinas CNC de última geração. Processos essenciais incluem: Mandrilamento de Cilindros (corrige ovalizações), Plaina (elimina empenamentos para vedação perfeita), Brunimento (garante lubrificação ideal) e Retífica de Virabrequim/Comando (restaura geometrias). O retificador corrige as medidas ou aplica novas medidas definidas pela engenharia técnica, como o faceamento do cabeçote e brunimento dos cilindros.
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

export default Usinagem;
