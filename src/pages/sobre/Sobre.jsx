import React from 'react';

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
const fachada = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429481/fachada_jrdazc.jpg';

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
      <Breadcrumbs />

      <div className="container-escuro">
        <section className="sobre-section">
          <div className="highlight-item nossa-historia">
            <h2 className='titulo-claro'>Sobre a Zero 20 Garage</h2>
            {/* Primeira parte: Texto inicial + Imagem */}
            <div className="historia-grid-intro">
              <div className="historia-text-intro">
                <p translate='no' className='titulo-claro'>
                  Paixão, Tradição e Excelência.
                </p>
                <p translate='no' className='sobre-paragrafo'>
                A história da Zero 20 Garage é uma jornada de paixão automotiva que atravessa gerações e se consolida na excelência de serviços em Mairiporã e região.
                </p>
                <p className='sobre-paragrafo'>
                  Tudo começou há muitos anos com Francisco Borges, carinhosamente conhecido como Chico. Desde a infância, Chico nutria uma paixão por carros e esse entusiasmo se transformou em profissão quando ele fundou a TecFran. Com anos de dedicação e experiência, a TecFran se tornou um nome de confiança, conquistando uma clientela fiel em toda a cidade de Mairiporã.
                </p>
              </div>
              <div className="historia-image">
                <img src="https://res.cloudinary.com/dlyeywiwk/image/upload/v1763428214/Equipe_y6nvty.jpg" alt="Equipe Zero20 Garage" />
              </div>
            </div>

            {/* Segunda parte: Restante do texto */}
            <div className="historia-continuacao">
              <p className='titulo-claro'>
                A Evolução de um Sonho
              </p>
              <p className='sobre-paragrafo'>
                Os anos se passaram, e o legado da paixão automotiva encontrou continuidade em seu filho, Rodney Santos. Assim como o pai, Rodney herdou esse amor por motores e decidiu seguir o mesmo caminho, focando em uma área essencial: a retífica de motores. Com foco, estudo e profissionalização, ele adquiriu uma vasta experiência, dominando as técnicas mais avançadas do setor.
              </p>
              <p className='titulo-claro'>
                O Nascimento da Zero 20 Garage
              </p>
              <p className='sobre-paragrafo'>
                Foi em 2020 que a visão de unir toda essa experiência e paixão familiar se concretizou com o nascimento da Zero 20 Garage. Este projeto uniu o melhor de dois mundos: serviços completos de mecânica geral e a especialidade em retífica de motores e cabeçotes, tudo em um único lugar.
              </p>
              <p className='sobre-paragrafo'>
                A Zero 20 Garage é uma empresa familiar que representa a união perfeita entre tradição e modernidade, mantendo o atendimento atencioso e a qualidade técnica de anos, mas sempre com foco na inovação. Contamos com profissionais altamente capacitados, prontos para cuidar do seu veículo com o máximo de rigor e conhecimento.
              </p>
              <p className='titulo-claro'>
                Ampliando Horizontes e Serviços
              </p>
              <p className='sobre-paragrafo'>
                Em 2025, a Zero 20 Garage deu um passo importante em sua expansão, inaugurando a Zero 20 Óleos e Filtros. Essa filial estratégica visa aumentar nosso mix de produtos e serviços, permitindo-nos atender nossos clientes de forma ainda mais completa e conveniente.Hoje, a Zero 20 Garage é mais do que uma oficina; é um centro de serviços automotivos que é referência em qualidade e confiança, tanto dentro quanto fora de Mairiporã.
              </p>
              <p className='sobre-paragrafo'>
                Confie na experiência que vem de longos anos de história e na paixão que move essas duas gerações.
              </p>
            </div>
          </div>
        </section>


        <section className="sobre-section">
          <div className="highlight-item equipe-container">
            <h2 className='titulo-claro' translate='no'>Nossa Equipe</h2>
            <div className="equipe-grid">
              {/* Slider com fotos da equipe */}
              <div className="equipe-slider">
                <Slider {...settings}>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-image-container">
                      <img src={member.image} alt={`${member.name}, ${member.role}`} className="team-image" />
                      <p className="team-caption">{`${member.name}, ${member.role}`}</p>
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Blocos de texto estilo cartões */}
              <div className="equipe-textos">
                <div className="highlight-card-sobre">
                  <h3 className="subtitulo-claro">Profissionais Especializados</h3>
                  <p className="paragrafo-claro">
                    Contamos com uma equipe de profissionais altamente especializados e apaixonados por motores.
                    Nossos técnicos são certificados e possuem vasta experiência em retífica e mecânica automotiva.
                  </p>
                </div>

                <div className="highlight-card-sobre" style={{ marginTop: '1.5rem' }}>
                  <h3 className="subtitulo-claro">Experiência Comprovada</h3>
                  <p className="paragrafo-claro">
                    Nossa equipe possui anos de experiência no mercado automotivo, garantindo serviços de alta qualidade
                    para todos os tipos de veículos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sobre-section">
          <div className="highlight-item equipe-container">
            <h2 className='titulo-claro'translate='no'>Nossos Princípios</h2>
          <div className="principios-grid">

            {/* Missão */}
            <div className="principio-item">
              <FaBullseye className="principio-icon" />
              <div>
                <h3 className="subtitle">Nossa Missão</h3>
                <p className="sobre-paragrafo">
                  Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência,
                  superando as expectativas de nossos clientes.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="principio-item">
              <FaEye className="principio-icon" />
              <div>
                <h3 className="subtitle">Nossa Visão</h3>
                <p className="sobre-paragrafo">
                  Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos
                  serviços, inovação e compromisso com a satisfação dos clientes.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="principio-item">
              <FaStar className="principio-icon" />
              <div>
                <h3 className="subtitle-p">Nossos Valores</h3>
                <p className="sobre-paragrafo">
                    <strong>Qualidade:</strong> Compromisso com a excelência em cada serviço.
                </p>
                <p className="sobre-paragrafo">
                  <strong>Confiança:</strong> Relações transparentes e honestas com nossos clientes.
                </p>
                <p className="sobre-paragrafo">
                  <strong>Compromisso:</strong> Dedicação em atender e superar as expectativas dos clientes.
                </p>
              </div>
            </div>

          </div>
          </div>
      </section>

        {/* Fachada */}
        <section className="sobre-section">
          <div className="highlight-item equipe-container">
            <h2 className='titulo-claro'translate='no'>Nossa Garagem</h2>
            <h3 className="subtitulo-claro">
              Nossa oficina é equipada com tecnologia de ponta e ferramentas especializadas para garantir a precisão e qualidade em todos os serviços realizados. Contamos com um ambiente limpo, organizado e seguro, onde cada veículo recebe o tratamento adequado.
            </h3>
            <div className="equipe-grid">
              <div className="fachada-image-container">
                <img src={fachada} alt="Nossa Garagem" />
              </div>
              <div className="garagem-text">
                <p className='sobre-paragrafo'>
                  A Zero 20 Garage é mais do que uma oficina, é um espaço onde a paixão por motores se encontra com a tecnologia de ponta. Nossa garagem é equipada com ferramentas e máquinas de última geração, garantindo serviços de alta qualidade e precisão.
                </p>
                <p className='sobre-paragrafo'>
                  Cada detalhe da nossa oficina foi pensado para proporcionar um ambiente seguro e eficiente, onde nossos profissionais podem trabalhar com excelência e dedicação.
                </p>
              </div>
          </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="sobre-section">
          <div className="highlight-item equipe-container">
            <h2 className='titulo-claro'translate='no'>Nossos Clientes Dizem</h2>
              <h3 className="subtitulo-claro">
                A satisfação dos nossos clientes é a nossa maior conquista. Trabalhamos com dedicação para garantir que cada veículo que passa por nossa oficina receba o melhor atendimento e serviços de qualidade. Confira abaixo alguns depoimentos de clientes satisfeitos com nosso trabalho.
              </h3>
              <TestimonialsCarousel />
          </div>
          </section>

        {/* Contatos */}
        <ContatoCta />
      </div>
    </div>
  );
}

export default Sobre;