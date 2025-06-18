import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import ContatoCta from '../../components/ContatoCta';
import '../../styles/Institucional.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import usinagem1 from '../../assets/images/usinagem1.jpg';
import usinagem2 from '../../assets/images/usinagem2.jpg';
import usinagem3 from '../../assets/images/usinagem3.jpg';

const Usinagem = () => {
  const messages = [
    {
      title: 'Especialistas em Motores',
      subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
    }
  ];

  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setLastUpdated(now.toLocaleDateString('pt-BR', options));
  }, []);

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
        <h3 className="institucional-subtitle">Precisão, Eficiência e Durabilidade</h3>
          <p className="institucional-paragraph">
            A usinagem de motores é um dos pilares fundamentais no processo de retífica, responsável por garantir a integridade estrutural, a funcionalidade e a longevidade dos componentes internos do motor.
          </p>
          <p className="institucional-paragraph">
            Os componentes internos — como blocos, cabeçotes, virabrequins, bielas e camisas de cilindro — sofrem desgastes provocados por atrito e temperatura. Quando perdem suas especificações, comprometem a eficiência e segurança do motor.
          </p>
          <p className="institucional-paragraph">
            A usinagem remove deformações e garante tolerâncias rigorosas, restabelecendo o equilíbrio dos componentes.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Processos Essenciais na Usinagem</h3>
          <p className="institucional-paragraph">
            <strong>Mandrilamento de Cilindros:</strong> Corrige ovalizações e garante paralelismo dos cilindros com rugosidade ideal.
          </p>
          <p className="institucional-paragraph">
            <strong>Plaina de Cabeçotes e Blocos:</strong> Elimina empenamentos, garantindo vedação perfeita da junta.
          </p>
          <p className="institucional-paragraph">
            <strong>Brunimento:</strong> Garante lubrificação ideal e melhor assentamento dos anéis de pistão.
          </p>
          <p className="institucional-paragraph">
            <strong>Retífica de Virabrequim e Comando:</strong> Restaura geometrias e funcionamento dos mancais.
          </p>
          <p className="institucional-paragraph">
            <strong>Usinagem de Sedes e Guias de Válvulas:</strong> Garante vedação e eficiência térmica.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Tecnologia Aplicada</h3>
          <p className="institucional-paragraph">
            Utilizamos máquinas CNC de última geração e equipamentos de medição tridimensional (CMM) para assegurar precisão micrométrica e repetibilidade.
          </p>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Benefícios da Usinagem de Alta Precisão</h3>
          <ul className="institucional-list">
            <li>✅ Redução do consumo de óleo e combustível.</li>
            <li>✅ Aumento da vida útil do motor.</li>
            <li>✅ Melhoria no desempenho.</li>
            <li>✅ Menor emissão de poluentes.</li>
            <li>✅ Redução de ruídos e vibrações.</li>
          </ul>
        </section>

        <section className="institucional-section">
          <h3 className="institucional-subtitle">Excelência Garantida</h3>
          <p className="institucional-paragraph">
            Contamos com equipe técnica especializada, laboratório de metrologia próprio e equipamentos modernos. Seu motor passa por um processo de recuperação com excelência.
          </p>
        </section>

        <section className="institucional-section">
          <ContatoCta />
        </section>

        <div className="institucional-last-updated">
          <p className="institucional-acknowledgment">
            Página atualizada em: {lastUpdated}
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
