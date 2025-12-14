import React from 'react';
import { Helmet } from 'react-helmet-async';

import './Sobre.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DynamicHeader from '../../components/ui/DynamicHeader';

import ContatoCta from '../../components/ui/ContatoCta';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import TestimonialsCarousel from '../../components/ui/TestimonialsCarousel';
import Slider from 'react-slick';
import { FaBullseye, FaEye, FaStar } from 'react-icons/fa';

// Importando imagens
const fachada = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1765506349/Gemini_Generated_Image_2pi18x2pi18x2pi1_iqwmam.png';

const settings = {
  dots: true,                // bolinhas de navegação
  infinite: true,            // loop infinito
  speed: 500,                // velocidade da transição
  slidesToShow: 1,           // mostrar 1 slide por vez
  slidesToScroll: 1,         // rolar 1 slide por vez
  autoplay: true,            // ativar autoplay
  autoplaySpeed: 3000,       // tempo entre slides (ms)
  arrows: true,              // setas de navegação
  pauseOnHover: true,        // pausa autoplay ao passar o mouse
  responsive: [
    {
      breakpoint: 768,       // até 768px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,       // remover setas no mobile
        dots: true
      }
    }
  ]
};


function Sobre() {
  const messages = [
    {
      title: 'Sobre Nós',
      subtitle: 'Conheça mais sobre a nossa história e missão',
    },
    {
      title: 'Nossa Missão',
      subtitle: 'Oferecer serviços de qualidade com confiança e excelência',
    },
    {
      title: 'Nossa Visão',
      subtitle: 'Ser referência no mercado de retífica e mecânica automotiva',
    },
  ];

  const teamMembers = [
    {
      name: "Francisco Borges",
      role: "Chefe de Oficina",
      image: "https://res.cloudinary.com/dlyeywiwk/image/upload/v1763428213/FranciscoBorges_cnuafi.jpg"
    },
    {
      name: "Rodney Santos",
      role: "Especialista em Retífica",
      image: "https://res.cloudinary.com/dlyeywiwk/image/upload/v1763428214/RodneySantos_azdeqw.jpg"
    }
  ];

  return (
    <div className="page-escuro">

      <DynamicHeader page="sobre" messages={messages} />
      <Helmet>
        <title>Sobre Nós | Zero 20 Garage - Retífica em Mairiporã</title>
        <meta name="description" content="Conheça a história da Zero 20 Garage, oficina líder em retífica de motores em Mairiporã. Tradição familiar e tecnologia de ponta com Francisco Borges e Rodney Santos." />
        <link rel="canonical" href="https://zero20garage.com.br/sobre" />
      </Helmet>
      <Breadcrumbs />



        {/* Seção: História */}
        <section className="sobre-section">
          <div className="sobre-card nossa-historia">
            <h2 className='titulo-claro'>Sobre a Zero 20 Garage</h2>

            <div className="historia-content">
              <div className="historia-intro">
                <div className="historia-text">
                  <h3 className='subtitulo-claro' translate='no'>Paixão, Tradição e Excelência.</h3>
                  <p translate='no' className='paragrafo-claro'>
                    A história da Zero 20 Garage é uma jornada de paixão automotiva que atravessa gerações e se consolida na excelência de serviços em Mairiporã e região.
                  </p>
                  <p className='paragrafo-claro'>
                    Tudo começou há muitos anos com Francisco Borges, carinhosamente conhecido como Chico. Desde a infância, Chico nutria uma paixão por carros e esse entusiasmo se transformou em profissão quando ele fundou a TecFran. Com anos de dedicação e experiência, a TecFran se tornou um nome de confiança, conquistando uma clientela fiel em toda a cidade de Mairiporã.
                  </p>
                </div>
                <div className="historia-image-wrapper">
                  <img src="https://res.cloudinary.com/dlyeywiwk/image/upload/v1763428214/Equipe_y6nvty.jpg" alt="Equipe Zero20 Garage" className="historia-img" />
                </div>
              </div>

              <div className="historia-details">
                <h3 className='subtitulo-claro'>A Evolução de um Sonho</h3>
                <p className='paragrafo-claro'>
                  Os anos se passaram, e o legado da paixão automotiva encontrou continuidade em seu filho, Rodney Santos. Assim como o pai, Rodney herdou esse amor por motores e decidiu seguir o mesmo caminho, focando em uma área essencial: a retífica de motores. Com foco, estudo e profissionalização, ele adquiriu uma vasta experiência, dominando as técnicas mais avançadas do setor.
                </p>

                <h3 className='subtitulo-claro'>O Nascimento da Zero 20 Garage</h3>
                <p className='paragrafo-claro'>
                  Foi em 2020 que a visão de unir toda essa experiência e paixão familiar se concretizou com o nascimento da Zero 20 Garage. Este projeto uniu o melhor de dois mundos: serviços completos de mecânica geral e a especialidade em retífica de motores e cabeçotes, tudo em um único lugar.
                </p>
                <p className='paragrafo-claro'>
                  A Zero 20 Garage é uma empresa familiar que representa a união perfeita entre tradição e modernidade, mantendo o atendimento atencioso e a qualidade técnica de anos, mas sempre com foco na inovação. Contamos com profissionais altamente capacitados, prontos para cuidar do seu veículo com o máximo de rigor e conhecimento.
                </p>

                <h3 className='subtitulo-claro'>Ampliando Horizontes e Serviços</h3>
                <p className='paragrafo-claro'>
                  Em 2025, a Zero 20 Garage deu um passo importante em sua expansão, inaugurando a Zero 20 Óleos e Filtros. Essa filial estratégica visa aumentar nosso mix de produtos e serviços, permitindo-nos atender nossos clientes de forma ainda mais completa e conveniente. Hoje, a Zero 20 Garage é mais do que uma oficina; é um centro de serviços automotivos que é referência em qualidade e confiança, tanto dentro quanto fora de Mairiporã.
                </p>
                <p className='paragrafo-claro destaque-texto'>
                  Confie na experiência que vem de longos anos de história e na paixão que move essas duas gerações.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção: Equipe */}
        <section className="sobre-section">
          <div className="sobre-card equipe-container">
            <h2 className='titulo-claro' translate='no'>Nossa Equipe</h2>
            <div className="equipe-content">
              <div className="equipe-slider-wrapper">
                <Slider {...settings}>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-member-slide">
                      <img src={member.image} alt={`${member.name}, ${member.role}`} className="team-photo" />
                      <div className="team-info">
                        <h4 className="team-name">{member.name}</h4>
                        <p className="team-role">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="equipe-info-cards">
                <div className="info-card">
                  <h3 className="card-title">Profissionais Especializados</h3>
                  <p className="card-text">
                    Contamos com uma equipe de profissionais altamente especializados e apaixonados por motores.
                    Nossos técnicos são certificados e possuem vasta experiência em retífica e mecânica automotiva.
                  </p>
                </div>

                <div className="info-card">
                  <h3 className="card-title">Experiência Comprovada</h3>
                  <p className="card-text">
                    Nossa equipe possui anos de experiência no mercado automotivo, garantindo serviços de alta qualidade
                    para todos os tipos de veículos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção: Princípios */}
        <section className="sobre-section">
          <div className="sobre-card equipe-container">
            <h2 className='titulo-claro' translate='no'>Nossos Princípios</h2>
            <div className="principios-grid">

              <div className="principio-card">
                <div className="principio-icon-wrapper">
                <FaBullseye className="principio-icon" />
              </div>
              <h3 className="principio-title">Nossa Missão</h3>
              <p className="principio-text">
                Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência,
                superando as expectativas de nossos clientes.
              </p>
            </div>

            <div className="principio-card">
              <div className="principio-icon-wrapper">
                <FaEye className="principio-icon" />
              </div>
              <h3 className="principio-title">Nossa Visão</h3>
              <p className="principio-text">
                Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos
                serviços, inovação e compromisso com a satisfação dos clientes.
              </p>
            </div>

            <div className="principio-card">
              <div className="principio-icon-wrapper">
                <FaStar className="principio-icon" />
              </div>
              <h3 className="principio-title">Nossos Valores</h3>
              <ul className="valores-list">
                <li><strong>Qualidade:</strong> Compromisso com a excelência.</li>
                <li><strong>Confiança:</strong> Transparência e honestidade.</li>
                <li><strong>Compromisso:</strong> Dedicação total ao cliente.</li>
              </ul>
            </div>

          </div>
        </div>
        </section>

        {/* Seção: Garagem */}
        <section className="sobre-section">
          <div className="sobre-card garagem-container">
            <h2 className='titulo-claro' translate='no'>Nossa Garagem</h2>
            <p className="paragrafo-claro intro-garagem">
              Nossa oficina é equipada com tecnologia de ponta e ferramentas especializadas para garantir a precisão e qualidade em todos os serviços realizados.
            </p>

            <div className="garagem-content">
              <div className="garagem-image-wrapper">
                <img src={fachada} alt="Nossa Garagem" className="garagem-img" />
              </div>
              <div className="garagem-text-block">
                <p className='paragrafo-claro'>
                  A Zero 20 Garage é mais do que uma oficina, é um espaço onde a paixão por motores se encontra com a tecnologia de ponta. Nossa garagem é equipada com ferramentas e máquinas de última geração, garantindo serviços de alta qualidade e precisão.
                </p>
                <p className='paragrafo-claro'>
                  Cada detalhe da nossa oficina foi pensado para proporcionar um ambiente seguro e eficiente, onde nossos profissionais podem trabalhar com excelência e dedicação.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção: Depoimentos */}
        <section className="sobre-section">
          <div className="sobre-card depoimentos-container">
            <h2 className='titulo-claro' translate='no'>O que Nossos Clientes Dizem</h2>
            <p className="paragrafo-claro intro-depoimentos">
              A satisfação dos nossos clientes é a nossa maior conquista. Confira alguns depoimentos.
            </p>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Contatos */}
        <ContatoCta />

    </div>
  );
}

export default Sobre;