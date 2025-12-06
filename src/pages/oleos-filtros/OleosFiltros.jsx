import React from 'react';
import { Helmet } from 'react-helmet-async';
import './OleosFiltros.css';
import ContatoCta from '../../components/ui/ContatoCta';
import BrandCarousel from '../../components/ui/BrandCarousel';
import { oilBrands } from '../../data/brands';

// Importe sua logo aqui se necessário, ou use a URL direta
const logoGarage = "https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429492/logo_mqvkvh.png";

// Vídeos de fundo do banner
const bannerVideoDesktop = "https://res.cloudinary.com/dlyeywiwk/video/upload/v1764821682/wl0kcac1fvfhm2rgdeja.mp4";
const bannerVideoMobile = "https://res.cloudinary.com/dlyeywiwk/video/upload/v1764822609/fokcyaolucoogjmhusx1.mp4";

// Placeholder para a foto da oficina
const workshopPhoto = "https://images.unsplash.com/photo-1632823471565-1ec2a1ad4015?q=80&w=1200&auto=format&fit=crop";

const OleosFiltros = () => {

  return (
    <div className="page-verde">
      <Helmet>
        <title>Óleos e Filtros | Zero 20 Garage</title>
        <meta name="description" content="Troca completa de óleo e filtros. Trabalhamos com todas as viscosidades e marcas renomadas para veículos nacionais e importados." />
      </Helmet>

      {/* 1. Banner Principal */}
      <section className="of-banner">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="of-video-bg desktop-only"
          poster="https://res.cloudinary.com/dlyeywiwk/video/upload/f_auto,q_auto,so_0/v1764821682/wl0kcac1fvfhm2rgdeja.jpg"
        >
            <source src={bannerVideoDesktop} type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="of-video-bg mobile-only"
          poster="https://res.cloudinary.com/dlyeywiwk/video/upload/f_auto,q_auto,so_0,w_800/v1764822609/fokcyaolucoogjmhusx1.jpg"
        >
            <source src={bannerVideoMobile} type="video/mp4" />
        </video>
      </section>

      <div className="container-claro of-container-top">
          <h1 className="titulo-claro">Troca Completa de Óleo e Filtros</h1>
          <p className="subtitulo-claro">A Saúde do Seu Veículo Começa Aqui!</p>
          <a href="/orcamento" className="button of-cta-button">Solicite já sua troca.</a>

          <table className="of-comparison-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Garagem Comum</th>
                <th>Detalhes</th>
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

      <div className="container-claro of-container-center">
        {/* 2. Quem Somos e Logos */}
        <section className="of-logos-section">
          <img src={logoGarage} alt="Zero 20 Garage" className="of-logo-img of-logo-img-large" width="200" height="100" />
          <h2 className="of-plus-sign">+</h2>
          <div className="of-logo-wrapper">
            <img src={logoGarage} alt="Zero 20 Óleos" className="of-logo-img of-logo-oleos" width="200" height="100" />
            <p className="of-logo-text"></p>
          </div>
        </section>

        <section className="of-intro-section">
          <h2 className="titulo-claro of-intro-title">A Zero 20 Garage também é <br /> <span className="of-text-green">Zero 20 Óleos e Filtros.</span></h2>
          <div className="of-intro-text of-intro-text-container">
            <p className="of-mb-1-5">
              Somos uma empresa especializada em <strong className="of-text-green">serviços automotivos</strong> com <strong className="of-text-green">foco total na troca completa de óleos e filtros</strong>.
              Entendemos que a manutenção preventiva é o coração da longevidade do seu veículo.
            </p>
            <p>
              <strong className="of-text-green-lg">O que fazemos:</strong> A execução do nosso serviço vai além da simples substituição. Realizamos a troca do óleo lubrificante e de
              <strong className="of-text-green"> TODOS os filtros</strong> (óleo, ar, combustível e cabine), garantindo que seu motor respire melhor, consuma menos e mantenha a cabine limpa.
              Trabalhamos com todas as <strong className="of-text-green">viscosidades</strong> necessárias, atendendo a <strong className="of-text-green">100% dos veículos de linha leve</strong> presentes no mercado.
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
          <BrandCarousel brands={oilBrands} title="Trabalhamos Apenas com Marcas de Confiança" variant="green" />
        </section>

        {/* 5. Contato e Oficina */}
        <section id="contato" className="of-workshop-section">
          <img src={workshopPhoto} alt="Nossa Oficina" className="of-workshop-img" loading="lazy" width="1200" height="800" />
          <div className="of-workshop-overlay">
            <h2 className="titulo-claro of-workshop-title">Nossa Estrutura</h2>
            <p>Conheça o local onde cuidamos do seu carro com a máxima atenção e tecnologia.</p>
          </div>
        </section>

        <div className="of-contato-wrapper">
            <ContatoCta />
        </div>
      </div>
    </div>
  );
};

export default OleosFiltros;
