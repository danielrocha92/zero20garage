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

const LAST_UPDATED = '22 de junho de 2025'; // atualizado manualmente quando o conteúdo muda

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
          <h3 className="institucional-subtitle">Precisão, Confiança e Rigor Técnico</h3>
          <p className="institucional-paragraph">
            Após a retífica e usinagem, a montagem do motor é feita com extrema precisão. Cada componente é montado seguindo rigorosamente as especificações técnicas do fabricante.
          </p>
          <p className="institucional-paragraph">
            Utilizamos torquímetros calibrados, ferramentas específicas e um ambiente controlado para evitar contaminações e garantir a integridade de cada peça.
          </p>
          <p className="institucional-paragraph">
            Nossa equipe é altamente qualificada e experiente na montagem de motores nacionais e importados, entregando confiabilidade e alto desempenho.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Etapas da Montagem</h3>
          <ul className="institucional-list">
            <li>✅ Inspeção final das peças antes da montagem.</li>
            <li>✅ Instalação de bronzinas, pistões, anéis, virabrequim e comando de válvulas.</li>
            <li>✅ Ajuste de folgas conforme manuais técnicos.</li>
            <li>✅ Aplicação de torque correto em todos os parafusos.</li>
            <li>✅ Lubrificação e limpeza durante o processo.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Teste de Motores</h3>
          <p className="institucional-paragraph">
            Após a montagem, realizamos testes rigorosos em bancada para validar o funcionamento do motor antes da entrega.
          </p>
          <p className="institucional-paragraph">
            Monitoramos pressão de óleo, temperatura, compressão e vazamentos. Garantimos que o motor está pronto para rodar com segurança e alto desempenho.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Vantagens da Montagem Profissional</h3>
          <ul className="institucional-list">
            <li>✅ Redução de falhas prematuras.</li>
            <li>✅ Garantia de montagem técnica e segura.</li>
            <li>✅ Testes comprovando o funcionamento antes da instalação no veículo.</li>
            <li>✅ Confiabilidade e tranquilidade para o cliente.</li>
          </ul>
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
