import React from 'react';
import { Helmet } from 'react-helmet-async';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OleosFiltros.css';
import ContatoCta from '../../components/ui/ContatoCta';

// Importe sua logo aqui se necessário, ou use a URL direta
const logoGarage = "https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429492/logo_mqvkvh.png";

// Vídeos de fundo do banner
const bannerVideoDesktop = "https://res.cloudinary.com/dlyeywiwk/video/upload/v1764821682/wl0kcac1fvfhm2rgdeja.mp4";
const bannerVideoMobile = "https://res.cloudinary.com/dlyeywiwk/video/upload/v1764822609/fokcyaolucoogjmhusx1.mp4";

// Placeholder para a foto da oficina
const workshopPhoto = "https://images.unsplash.com/photo-1632823471565-1ec2a1ad4015?q=80&w=1920&auto=format&fit=crop";

const OleosFiltros = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const brands = [
    { name: "Castrol", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Castrol_logo_2023.svg/2560px-Castrol_logo_2023.svg.png" },
    { name: "Ipiranga", logo: "https://logospng.org/wp-content/uploads/ipiranga.png" },
    { name: "ACDelco", logo: "https://w7.pngwing.com/pngs/399/786/png-transparent-acdelco-hd-logo.png" },
    { name: "Petronas", logo: "https://cdn.pli-petronas.com/s3fs-public/img_PETRONAS_Lubricants_International.png?VersionId=h0CkkEGuHmnHR9aH4K4fx84vg.s4obep" },
    { name: "Havoline Texaco", logo: "https://i.pinimg.com/736x/f9/b6/6a/f9b66a6cdd65446078ab5cb0bdafd299.jpg" },
    { name: "Mobil", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnES36d0cO19LxN57TLh3P08KY9A-87AaJSQ&s" },
    { name: "Shell", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEbNHNiFm8s0Qdcq1oBo1ywO6Wqmz6_Tm0XA&s" },
    { name: "Tecfil", logo: "https://www.tecfil.com.br/wp-content/themes/tecfill_theme/img/logo.svg" }, // Tecfil not found on Wikimedia, keeping original but monitoring
    { name: "Wega", logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFNIJ1fJtjUbQ/company-logo_200_200/company-logo_200_200/0/1630537603350/wega_motors_brasil_logo?e=2147483647&v=beta&t=oGWAad_qQwmmSnt5pOcc0ZoDSmSNu63SKs6aDP1YSXQ" },
    { name: "Bardahl", logo: "https://bardahl.com.br/wp-content/uploads/2022/03/logoRodape.png" },
    { name: "Mopar", logo: "https://www.moparoficial.com.br/content/dam/mopar/home/banner/logo-mopar.svg" },
    { name: "Motorcraft", logo: "https://www.reparadorford.com.br/img/motorcraft/logo-motorcraft.png" },
    { name: "Radnaq", logo: "https://www.radnaq.com.br/assets/img/logo.png" },
    { name: "Mahle", logo: "https://logospng.org/wp-content/uploads/mahle-metal-leve.png" },
    { name: "Mann Filter", logo: "https://www.liblogo.com/img-logo/ma5559oef9-mann-filter-logo-oil-filter-hu726-2x-by-mann-filter-on-partsavatar-ca.png" },
    { name: "Motul", logo: "https://e7.pngegg.com/pngimages/80/219/png-clipart-car-motul-formula-4-uae-championship-motorcycle-logo-car-text-logo-thumbnail.png" }
  ];

  return (
    <div className="page-verde">
      <Helmet>
        <title>Óleos e Filtros | Zero 20 Garage</title>
        <meta name="description" content="Troca completa de óleo e filtros. Trabalhamos com todas as viscosidades e marcas renomadas para veículos nacionais e importados." />
      </Helmet>

      {/* 1. Banner Principal */}
      <section className="of-banner">
        <video autoPlay loop muted playsInline className="of-video-bg desktop-only">
            <source src={bannerVideoDesktop} type="video/mp4" />
        </video>
        <video autoPlay loop muted playsInline className="of-video-bg mobile-only">
            <source src={bannerVideoMobile} type="video/mp4" />
        </video>
      </section>

      <div className="container-claro" style={{marginTop: '2rem', textAlign: 'center'}}>
          <h1 className="titulo-claro">Troca Completa de Óleo e Filtros</h1>
          <p className="subtitulo-claro">A Saúde do Seu Veículo Começa Aqui!</p>
          <a href="/orcamento" className="button" style={{marginBottom: '2rem', display: 'inline-block'}}>Solicite já sua troca.</a>

          <table className="of-comparison-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Garagem Comum</th>
                <th>Zero 20 Garage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Óleo e Filtros</strong></td>
                <td>Apenas troca simples</td>
                <td><strong>Troca Completa</strong> de <strong>TODOS</strong> os Filtros (Óleo, Ar, Combustível, Cabine) e Fluídos</td>
              </tr>
              <tr>
                <td><strong>Linhas de Produtos</strong></td>
                <td>Opções limitadas</td>
                <td>Econômica, Intermediária e Genuína/Original</td>
              </tr>
              <tr>
                <td><strong>Atendimento</strong></td>
                <td>Geral/Padrão</td>
                <td>Especializado em <strong>todas as viscosidades</strong> para <strong>todos os veículos de linha leve</strong></td>
              </tr>
            </tbody>
          </table>
      </div>

      <div className="container-claro" style={{textAlign: 'center'}}>
        {/* 2. Quem Somos e Logos */}
        <section className="of-logos-section" style={{justifyContent: 'center', marginBottom: '2rem'}}>
          <img src={logoGarage} alt="Zero 20 Garage" className="of-logo-img" style={{height: '100px'}} />
          <h2 style={{color: '#fff', margin: '0 1rem', fontSize: '2rem'}}>+</h2>
          <div style={{textAlign: 'center'}}>
            <img src={logoGarage} alt="Zero 20 Óleos" className="of-logo-img" style={{filter: 'hue-rotate(90deg)', height: '100px'}} />
            <p style={{fontSize: '1rem', color: '#4CAF50', marginTop: '0.5rem'}}>Zero 20 Óleos</p>
          </div>
        </section>

        <section className="of-intro-section">
          <h2 className="titulo-claro" style={{fontSize: '2.5rem', marginBottom: '2rem'}}>A Zero 20 Garage também é <br /> <span style={{color: '#4CAF50'}}>Zero 20 Óleos e Filtros.</span></h2>
          <div className="of-intro-text" style={{textAlign: 'center', maxWidth: '900px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8'}}>
            <p style={{marginBottom: '1.5rem'}}>
              Somos uma empresa especializada em <strong style={{color: '#4CAF50'}}>serviços automotivos</strong> com <strong style={{color: '#4CAF50'}}>foco total na troca completa de óleos e filtros</strong>.
              Entendemos que a manutenção preventiva é o coração da longevidade do seu veículo.
            </p>
            <p>
              <strong style={{color: '#4CAF50', fontSize: '1.2rem'}}>O que fazemos:</strong> A execução do nosso serviço vai além da simples substituição. Realizamos a troca do óleo lubrificante e de
              <strong style={{color: '#4CAF50'}}> TODOS os filtros</strong> (óleo, ar, combustível e cabine), garantindo que seu motor respire melhor, consuma menos e mantenha a cabine limpa.
              Trabalhamos com todas as <strong style={{color: '#4CAF50'}}>viscosidades</strong> necessárias, atendendo a <strong style={{color: '#4CAF50'}}>100% dos veículos de linha leve</strong> presentes no mercado.
            </p>
          </div>

          {/* 3. Linhas de Produtos */}
          <div className="of-product-lines">
            <div className="of-product-card">
              <h3 className="of-card-title">Linha Econômica</h3>
              <p>Ideal para quem busca a melhor relação custo-benefício sem abrir mão da qualidade mínima.</p>
            </div>
            <div className="of-product-card">
              <h3 className="of-card-title">Linha Intermediária</h3>
              <p>Óleos de alta performance e maior durabilidade para o uso diário e exigente.</p>
            </div>
            <div className="of-product-card">
              <h3 className="of-card-title">Linha Genuína/Original</h3>
              <p>Produtos homologados e originais de montadora. Para clientes exigentes que valorizam a máxima performance.</p>
            </div>
          </div>
        </section>

        {/* 4. Carrossel de Marcas */}
        <section className="of-carousel-section">
          <h2 className="titulo-claro">Trabalhamos Apenas com Marcas de Confiança</h2>
          <Slider {...carouselSettings}>
            {brands.map((brand, index) => (
              <div key={index} className="of-brand-card">
                <div className="of-brand-logo-wrapper">
                  <img src={brand.logo} alt={brand.name} className="of-brand-logo" />
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* 5. Contato e Oficina */}
        <section id="contato" className="of-workshop-section">
          <img src={workshopPhoto} alt="Nossa Oficina" className="of-workshop-img" />
          <div className="of-workshop-overlay">
            <h2 className="titulo-claro" style={{textAlign: 'left'}}>Nossa Estrutura</h2>
            <p>Conheça o local onde cuidamos do seu carro com a máxima atenção e tecnologia.</p>
          </div>
        </section>

        <div style={{marginTop: '3rem'}}>
            <ContatoCta />
        </div>
      </div>
    </div>
  );
};

export default OleosFiltros;
