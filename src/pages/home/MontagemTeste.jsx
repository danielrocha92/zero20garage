import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';
import '../../styles/Institucional.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MontagemTeste1 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429495/montagem-teste1_dh7vmo.jpg';
const MontagemTeste2 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429496/montagem-teste2_qhoy0f.jpg';
const MontagemTeste3 = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429499/montagem-teste3_gq27mv.jpg';

const MontagemTeste = () => {
  const messages = [
    {
      title: 'Especialistas em Motores',
      subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
    }
  ];

const LAST_UPDATED = '02 de dezembro de 2025'; // atualizado manualmente quando o conteúdo muda

  const images = [MontagemTeste1, MontagemTeste2, MontagemTeste3];

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
          <h2 className="institucional-title">Montagem e Teste de Motores</h2>
        </section>

        <section className="institucional-section">
          <div className="carousel-container">
            <Slider {...sliderSettings}>
              {images.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Montagem e Teste ${index + 1}`}
                    className="carousel-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">7. Montagem e Sincronismo (Montagem Técnica)</h3>
          <p className="institucional-paragraph">
            A montagem é feita com extrema precisão, seguindo rigorosamente as especificações técnicas do fabricante. Utilizamos torquímetros calibrados e ferramentas específicas. O montador realiza uma nova inspeção das peças e componentes, conferindo as medidas e o sincronismo final do motor. Após a montagem, realizamos testes rigorosos em bancada para validar o funcionamento (pressão de óleo, temperatura, compressão), garantindo confiabilidade e alto desempenho.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">8. Instalação no Veículo (Instalação e Testes)</h3>
          <p className="institucional-paragraph">
            Durante a instalação, o mecânico verifica as condições de todos os acessórios no cofre do motor — mangueiras de arrefecimento, sensores e atuadores. Essa inspeção garante que a linha eletrônica e os componentes periféricos estejam em plenas condições de operação, prevenindo o motor de uma quebra causada por superaquecimento ou falta de lubrificação por falha de algum componente. Itens que apresentarem rigidez ou desgaste devem ser substituídos.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">9. Teste de Funcionamento e Rodagem (Rodagem e Entrega)</h3>
          <p className="institucional-paragraph">
            A fase final envolve testes indispensáveis para componentes que só podem ser verificados em operação, como os sistemas de arrefecimento e lubrificação, que são submetidos a aumento de temperatura e pressão. Os testes de funcionamento e rodagem comprovam a qualidade do serviço prestado, identificam e corrigem possíveis problemas, e garantem a liberação do veículo pronto para o uso seguro.
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

export default MontagemTeste;
