import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Droplet, ShieldCheck, Award, Settings, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import useMarketingMedia from '../../hooks/useMarketingMedia';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './OleosFiltros.css';
import ContatoCta from '../../components/ui/ContatoCta';
import BrandCarousel from '../../components/ui/BrandCarousel';
import { oilBrands } from '../../data/brands';

const bannerVideoDesktop = "https://res.cloudinary.com/dlyeywiwk/video/upload/v1764821682/wl0kcac1fvfhm2rgdeja.mp4";
const bannerVideoMobile = "https://res.cloudinary.com/dlyeywiwk/video/upload/v1764822609/fokcyaolucoogjmhusx1.mp4";
const workshopPhoto = "https://images.unsplash.com/photo-1632823471565-1ec2a1ad4015?q=80&w=1200&auto=format&fit=crop";

const OleosFiltros = () => {
  const { media: extraBanners } = useMarketingMedia('oleos-filtros');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const hasCarousel = extraBanners.length > 0;

  return (
    <div className="of-page-verde">
      <Helmet>
        <title>Óleos e Filtros | Zero 20 Garage</title>
        <meta name="description" content="Troca completa de óleo e filtros. Trabalhamos com todas as viscosidades e marcas renomadas para veículos nacionais e importados." />
      </Helmet>

      {/* 1. Banner Principal com Hero Content */}
      <section className="of-banner">
        {hasCarousel ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            speed={1200}
            className="of-banner-swiper"
          >
            {/* Slide original — vídeo */}
            <SwiperSlide>
              <video autoPlay loop muted playsInline className="of-video-bg desktop-only" poster="https://res.cloudinary.com/dlyeywiwk/video/upload/f_auto,q_auto,so_0/v1764821682/wl0kcac1fvfhm2rgdeja.jpg">
                <source src={bannerVideoDesktop} type="video/mp4" />
              </video>
              <video autoPlay loop muted playsInline className="of-video-bg mobile-only" poster="https://res.cloudinary.com/dlyeywiwk/video/upload/f_auto,q_auto,so_0,w_800/v1764822609/fokcyaolucoogjmhusx1.jpg">
                <source src={bannerVideoMobile} type="video/mp4" />
              </video>
            </SwiperSlide>

            {/* Slides extras do marketing */}
            {extraBanners.map((banner) => (
              <SwiperSlide key={banner.id}>
                {banner.tipo === 'video' ? (
                  <video autoPlay loop muted playsInline className="of-video-bg">
                    <source src={banner.url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={banner.url} alt={banner.titulo || 'Banner'} className="of-video-bg" style={{ objectFit: 'cover' }} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            <video autoPlay loop muted playsInline className="of-video-bg desktop-only" poster="https://res.cloudinary.com/dlyeywiwk/video/upload/f_auto,q_auto,so_0/v1764821682/wl0kcac1fvfhm2rgdeja.jpg">
              <source src={bannerVideoDesktop} type="video/mp4" />
            </video>
            <video autoPlay loop muted playsInline className="of-video-bg mobile-only" poster="https://res.cloudinary.com/dlyeywiwk/video/upload/f_auto,q_auto,so_0,w_800/v1764822609/fokcyaolucoogjmhusx1.jpg">
              <source src={bannerVideoMobile} type="video/mp4" />
            </video>
          </>
        )}
        <div className="of-banner-overlay"></div>

        <motion.div className="of-hero-content" initial="hidden" animate="visible" variants={fadeIn}>
          <span className="of-hero-badge">Especialistas em Lubrificação</span>
          <h1 className="of-hero-title">Troca Completa de <br/><span className="of-text-gradient">Óleo e Filtros</span></h1>
          <p className="of-hero-subtitle">A saúde e longevidade do seu motor começam com uma manutenção de excelência. Agende sua troca com especialistas e garanta a máxima performance do seu veículo.</p>
          <a href="/orcamento" className="of-btn-primary">
            Solicite seu Orçamento <ArrowRight className="of-btn-icon" size={20} />
          </a>
        </motion.div>
      </section>

      {/* 2. Quem Somos (Logos e Intro) */}
      <section className="of-intro-section wrapper-padrao">

        <motion.div className="of-intro-text-box" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
          <h2 className="of-section-title">A Zero 20 Garage também é <br/><span className="of-text-gradient">Zero 20 Óleos e Filtros.</span></h2>
          <p>
            Somos uma empresa especializada em serviços automotivos com <strong>foco total na troca completa de óleos e filtros</strong>.
            Entendemos que a manutenção preventiva é o coração da longevidade do seu veículo.
          </p>
          <div className="of-highlight-box">
            <Droplet className="of-highlight-icon" />
            <div>
              <h3>O que fazemos</h3>
              <p>A execução do nosso serviço vai além da simples substituição. Realizamos a troca do óleo lubrificante e de <strong>TODOS</strong> os filtros (óleo, ar, combustível e cabine), garantindo que seu motor respire melhor, consuma menos e mantenha o ar-condicionado limpo. Atendemos a todas as medidas e veículos de linha leve do mercado.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Tabela de Comparação Moderna */}
      <section className="of-comparison-section wrapper-padrao">
        <motion.div className="of-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="of-section-title">Por que escolher a <span className="of-text-gradient">Zero 20</span>?</h2>
          <p className="of-section-desc">Descubra a diferença de optar por um serviço focado em excelência automotiva.</p>
        </motion.div>

        <motion.div className="of-table-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <div className="of-table-glass">
            <div className="of-table-row of-table-header">
              <div className="of-col of-col-feature">Serviço</div>
              <div className="of-col of-col-comum">Oficinas Comuns / Geral</div>
              <div className="of-col of-col-zero20">Zero 20 Óleos e Filtros</div>
            </div>

            <div className="of-table-row">
              <div className="of-col of-col-feature">Escopo da Troca</div>
              <div className="of-col of-col-comum"><XCircle className="icon-red"/> Troca simples ou parcial</div>
              <div className="of-col of-col-zero20"><CheckCircle2 className="icon-green"/> <strong>Completa:</strong> Grande diversidade de óleos e filtros</div>
            </div>

            <div className="of-table-row">
              <div className="of-col of-col-feature">Linhas de Produtos</div>
              <div className="of-col of-col-comum"><XCircle className="icon-red"/> Opções de marcas limitadas</div>
              <div className="of-col of-col-zero20"><CheckCircle2 className="icon-green"/> Econômica, Intermediária e Genuína</div>
            </div>

            <div className="of-table-row">
              <div className="of-col of-col-feature">Especialização</div>
              <div className="of-col of-col-comum"><XCircle className="icon-red"/> Conhecimento superficial</div>
              <div className="of-col of-col-zero20"><CheckCircle2 className="icon-green"/> 100% preparados p/ todas viscosidades</div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 4. Linhas de Produtos (Cards) */}
      <section className="of-products-section wrapper-padrao">
        <motion.div className="of-section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="of-section-title">Linhas de <span className="of-text-gradient">Produtos</span></h2>
          <p className="of-section-desc">Oferecemos diferentes categorias para atender exatamente a necessidade do seu motor e do seu bolso, garantindo 100% de procedência.</p>
        </motion.div>

        <motion.div className="of-cards-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div className="of-product-card" variants={fadeIn}>
            <div className="of-card-icon"><ShieldCheck size={40} /></div>
            <h3 className="of-card-title">Linha Econômica</h3>
            <p className="of-card-desc">Ideal para quem busca a melhor relação custo-benefício. Produtos aprovados no mercado sem abrir mão da segurança e eficiência.</p>
          </motion.div>

          <motion.div className="of-product-card of-card-highlight" variants={fadeIn}>
             <div className="of-card-icon"><Settings size={40} /></div>
            <h3 className="of-card-title">Linha Intermediária</h3>
            <p className="of-card-desc">A escolha dos clientes. Tecnologia sintética proporcionando maior vida útil, redução de atrito e proteção contínua no uso diário intenso.</p>
            <div className="of-popular-badge">Mais Escolhida</div>
          </motion.div>

          <motion.div className="of-product-card" variants={fadeIn}>
             <div className="of-card-icon"><Award size={40} /></div>
            <h3 className="of-card-title">Linha Original</h3>
            <p className="of-card-desc">Genuínos homologados direto pelas montadoras (OEM) e marcas premium. Para exigentes que buscam máxima eficiência e durabilidade.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Carrossel de Marcas */}
      <section className="of-carousel-section wrapper-padrao">
        <BrandCarousel brands={oilBrands} title="Trabalhamos Com as Melhores Marcas do Mercado" variant="green" />
      </section>

      {/* 6. Nossa Estrutura */}
      <section className="of-workshop-section wrapper-padrao">
        <motion.div className="of-workshop-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <img src={workshopPhoto} alt="Nossa Oficina Zero 20 Garage" className="of-workshop-img" loading="lazy" />
          <div className="of-workshop-overlay">
            <div className="of-workshop-content">
              <h2 className="of-workshop-title">Conheça Nossa Estrutura</h2>
              <p>Venha nos visitar. Temos um ambiente limpo, organizado e equipado com a melhor tecnologia atual para cuidar do seu veículo com dedicação, precisão e respeito mecânico.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 7. CTA e Contato */}
      <div className="of-contato-wrapper wrapper-padrao">
         <ContatoCta />
      </div>
    </div>
  );
};

export default OleosFiltros;