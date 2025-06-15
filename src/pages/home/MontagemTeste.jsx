import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import '../../styles/HomeDetails.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MontagemTeste1 from '../../assets/images/montagem-teste1.jpg';
import MontagemTeste2 from '../../assets/images/montagem-teste2.jpg';
import MontagemTeste3 from '../../assets/images/montagem-teste3.jpg';

function MontagemTeste() {
  const messages = [
    {
      title: 'Especialistas em Motores',
      subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
    }
  ];

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
    <div className="page-escuro">
      <DynamicHeader page="home" messages={messages} />
      <Breadcrumbs />

      <div className="container-escuro home-montagem-content">
        {/* Carrossel de imagens */}
        <div className="home-carousel-wrapper">
          <Slider {...sliderSettings}>
            {images.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Montagem e Teste ${index + 1}`}
                  className="home-carousel-image"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>

        <h2 className="titulo-claro">Usinagem de Motores</h2>
        <h3 className="subtitulo-claro">Precisão, Eficiência e Durabilidade</h3>

        <p className="paragrafo-claro">
          A usinagem de motores é um dos pilares fundamentais no processo de retífica, responsável por garantir a integridade estrutural, a funcionalidade e a longevidade dos componentes internos do motor.
        </p>

        <p className="paragrafo-claro">
          Os componentes internos — como blocos, cabeçotes, virabrequins, bielas e camisas de cilindro — sofrem desgastes provocados por atrito e temperatura. Quando perdem suas especificações, comprometem a eficiência e segurança do motor.
        </p>

        <p className="paragrafo-claro">
          A usinagem remove deformações e garante tolerâncias rigorosas, restabelecendo o equilíbrio dos componentes.
        </p>

        <h3 className="subtitulo-claro">Processos Essenciais na Usinagem</h3>

        <p className="paragrafo-claro">
          <strong>Mandrilamento de Cilindros:</strong> Corrige ovalizações e garante paralelismo dos cilindros com rugosidade ideal.
        </p>

        <p className="paragrafo-claro">
          <strong>Plaina de Cabeçotes e Blocos:</strong> Elimina empenamentos, garantindo vedação perfeita da junta.
        </p>

        <p className="paragrafo-claro">
          <strong>Brunimento:</strong> Garante lubrificação ideal e melhor assentamento dos anéis de pistão.
        </p>

        <p className="paragrafo-claro">
          <strong>Retífica de Virabrequim e Comando:</strong> Restaura geometrias e funcionamento dos mancais.
        </p>

        <p className="paragrafo-claro">
          <strong>Usinagem de Sedes e Guias de Válvulas:</strong> Garante vedação e eficiência térmica.
        </p>

        <h3 className="subtitulo-claro">Tecnologia Aplicada</h3>

        <p className="paragrafo-claro">
          Utilizamos máquinas CNC de última geração e equipamentos de medição tridimensional (CMM) para assegurar precisão micrométrica e repetibilidade.
        </p>

        <h3 className="subtitulo-claro">Benefícios da Usinagem de Alta Precisão</h3>

        <p className="paragrafo-claro">
          ✅ Redução do consumo de óleo e combustível. <br/>
          ✅ Aumento da vida útil do motor. <br/>
          ✅ Melhoria no desempenho. <br/>
          ✅ Menor emissão de poluentes. <br/>
          ✅ Redução de ruídos e vibrações.
        </p>

        <h3 className="subtitulo-claro">Excelência Garantida</h3>

        <p className="paragrafo-claro">
          Contamos com equipe técnica especializada, laboratório de metrologia próprio e equipamentos modernos. Seu motor passa por um processo de recuperação com excelência.
        </p>

        <Link to="/" className="home-button-voltar">← Voltar para Home</Link>
      </div>
    </div>
  );
}

export default MontagemTeste;