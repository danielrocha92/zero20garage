import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css'; // Usa o estilo institucional
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const desmontagem1 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429467/desmontagem1_ps1gb3.jpg';
const desmontagem2 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429468/desmontagem2_m74ekd.jpg';
const desmontagem3 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429470/desmontagem3_uumkin.jpg';

const Desmontagem = () => {
  const messages = [
    {
      title: 'Processo Minucioso',
      subtitle: 'Desmontagem técnica e segura do motor',
    }
  ];

const LAST_UPDATED = '02 de dezembro de 2025'; // atualizado manualmente quando o conteúdo muda

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
          <h3 className="institucional-subtitle">2. Remoção do Motor (Remoção do Veículo)</h3>
          <p className="institucional-paragraph">
            Após receber o veículo na oficina, o mecânico responsável adota como primeiro passo a retirada do motor do compartimento, removendo cabos, conectores de sensores, atuadores e se certificando de que o motor está livre de todas as conexões mecânicas antes de retirá-lo por completo do cofre.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">3. Desmontagem Técnica</h3>
          <p className="institucional-paragraph">
            Após a retirada, o mecânico realiza a desmontagem técnica do motor utilizando ferramentas adequadas, conhecimento e experiência para garantir a desmontagem somente do necessário e sem causar danos estruturais. Cada peça é retirada cuidadosamente e o processo é documentado para identificar a origem das falhas e determinar as necessidades de reparo. A inspeção minuciosa pós-desmontagem inclui a análise de trincas, desgastes excessivos, deformações e falhas ocultas, com o apoio de instrumentos de medição de alta precisão, garantindo uma base sólida para a próxima etapa.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">4. Limpeza das Peças (Banho Químico)</h3>
          <p className="institucional-paragraph">
            Na fase de limpeza, as partes metálicas do motor são submetidas a um banho químico específico para remover borras de óleo, resíduos de carbono e contaminantes. Isso garante que a limpeza não apenas preserve o motor, mas também evite que qualquer sujeira possa camuflar avarias durante o procedimento de inspeção.
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
