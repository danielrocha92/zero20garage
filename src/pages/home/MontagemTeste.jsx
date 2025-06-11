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

      <div className="container-escuro">

          <div className='highlight-item'>
            {/* Carrossel de imagens */}
            <div className="carousel-container">
              <Slider {...sliderSettings}>
                {images.map((src, index) => (
                  <div key={index}>
                    <img src={src} alt={`Usinagem ${index + 1}`} className="carousel-image"/>
                  </div>
                ))}
              </Slider>
            </div>

            <h2 className='title'>Usinagem de Motores</h2>
            <h3 className='subtitle'>Precisão, Eficiência e Durabilidade</h3>

            <p className='paragrafo'>
              A usinagem de motores é um dos pilares fundamentais no processo de retífica, responsável por garantir a integridade estrutural, a funcionalidade e a longevidade dos componentes internos do motor. Trata-se de um conjunto de operações que visa restaurar as especificações geométricas e dimensionais originais, ou mesmo adaptá-las a novos padrões técnicos, utilizando tecnologia de ponta e rigorosos controles de qualidade.
            </p>

            <p className='paragrafo'>
              Os componentes internos do motor — como blocos, cabeçotes, virabrequins, bielas e camisas de cilindro — sofrem desgastes naturais provocados por atrito, temperatura e esforço mecânico. Quando esses componentes perdem suas especificações originais, surgem folgas, desalinhamentos e superfícies irregulares que comprometem a eficiência energética, a lubrificação, a compressão e a vedação do sistema.
            </p>

            <p className='paragrafo'>
              A usinagem, nesse contexto, visa remover deformações e desgastes, garantir tolerâncias dimensionais rigorosas, assegurar acabamentos superficiais adequados e restabelecer o equilíbrio dinâmico entre os componentes.
            </p>

            <h3 className='subtitle'>Processos Essenciais na Usinagem</h3>

            <p className='paragrafo'>
              <strong>Mandrilamento de Cilindros:</strong> remove ovalizações e desgastes, garantindo a geometria correta e o paralelismo dos cilindros, com rugosidade controlada para retenção ideal de óleo.
            </p>

            <p className='paragrafo'>
              <strong>Plaina de Cabeçotes e Blocos:</strong> corrige empenamentos e ondulações nas faces de apoio, assegurando vedação perfeita da junta e evitando vazamentos.
            </p>

            <p className='paragrafo'>
              <strong>Brunimento:</strong> cria a textura cruzada necessária na parede dos cilindros, garantindo a correta lubrificação e assentamento dos anéis de pistão.
            </p>

            <p className='paragrafo'>
              <strong>Retífica de Virabrequim e Comando:</strong> restaura os colos do virabrequim e do comando, assegurando concentricidade, paralelismo e o correto funcionamento dos mancais.
            </p>

            <p className='paragrafo'>
              <strong>Usinagem de Sedes e Guias de Válvulas:</strong> garante que as válvulas se assentem adequadamente, promovendo eficiência térmica e vedação precisa.
            </p>

            <h3 className='subtitle'>Tecnologia Aplicada</h3>

            <p className='paragrafo'>
              Nosso processo é executado com o suporte de máquinas CNC de última geração e equipamentos de medição tridimensional (CMM), proporcionando precisão micrométrica, repetibilidade, controle estatístico de qualidade e redução de erros humanos.
            </p>

            <h3 className='subtitle'>Benefícios da Usinagem de Alta Precisão</h3>

            <p className='paragrafo'>
              ✅ Redução do consumo de óleo e combustível. <br/>
              ✅ Aumento da vida útil do motor. <br/>
              ✅ Melhora no desempenho e na resposta do motor. <br/>
              ✅ Menor emissão de poluentes. <br/>
              ✅ Redução de ruídos e vibrações.
            </p>

            <h3 className='subtitle'>Excelência Garantida</h3>

            <p className='paragrafo'>
              Contamos com uma equipe altamente qualificada, laboratório de metrologia próprio e um parque fabril atualizado. Garantimos que cada componente do seu motor seja recuperado com excelência, proporcionando máxima performance, segurança e confiabilidade.
            </p>

            <Link to="/" className='button'>← Voltar para Home</Link>
          </div>

      </div>
    </div>
  );
}

export default MontagemTeste;
