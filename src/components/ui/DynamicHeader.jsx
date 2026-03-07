import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import useMarketingMedia from '../../hooks/useMarketingMedia';
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../../styles/DynamicHeader.css';

// Apenas a HOME tem imagem fixa de sistema.
// Demais páginas usam estas URLs como FALLBACK caso não exista banner no Firebase.
const FALLBACK_IMAGES = {
  home: {
    desktop: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429487/home_k6ug8o.jpg',
    mobile: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto,w_800/v1763429487/home_k6ug8o.jpg'
  },
  sobre: {
    desktop: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1765200812/IMG_3062_aldoim.jpg',
    mobile: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1765200812/IMG_3061_ich3gp.jpg'
  },
  servicos: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429508/servicos_gblbyy.jpg',
  orcamento: {
    desktop: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764870173/img-orcamento-dektop_yx6lgf.png',
    mobile: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764870173/img_orcamento-mobile_tuwhbz.png'
  },
  contato: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429463/contato_ojwrdu.jpg',
  blog: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429461/blog-header_vzqvrg.jpg',
  footer: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429482/footer_unphiy.jpg',
  default: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429485/header_riszob.jpg'
};

function DynamicHeader({ messages, intervalTime = 4500, page = '' }) {
  const [headerContent, setHeaderContent] = useState(messages[0]);
  const [fade, setFade] = useState(true);

  // Buscar banners do Firebase (para todas as páginas)
  const activePage = page || 'default';
  const { media: marketingBanners } = useMarketingMedia(activePage);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % messages.length;
        setHeaderContent(messages[index]);
        setFade(true);
      }, 500);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [messages, intervalTime]);

  // Determinar qual imagem/slide usar
  const fallback = FALLBACK_IMAGES[activePage] || FALLBACK_IMAGES.default;
  const isHome = activePage === 'home';

  // HOME: sempre usa a imagem de sistema (fixa) + extras do Firebase como carrossel
  // DEMAIS: se houver banners no Firebase, eles SUBSTITUEM o fallback
  const buildSlides = () => {
    const slides = [];

    if (isHome) {
      // Home: imagem fixa de sistema como primeiro slide, extras adicionais
      const isResponsive = typeof fallback === 'object';
      slides.push({
        id: 'system-home',
        url: isResponsive ? fallback.desktop : fallback,
        mobileSrc: isResponsive ? fallback.mobile : null,
        tipo: 'imagem'
      });

      // Adicionar extras do Firebase (carrossel)
      marketingBanners.forEach(banner => {
        slides.push({
          id: banner.id,
          url: banner.url,
          mobileSrc: null,
          tipo: banner.tipo
        });
      });
    } else {
      // Demais: se tem banner no Firebase, usa apenas eles (substitui o padrão)
      if (marketingBanners.length > 0) {
        marketingBanners.forEach(banner => {
          slides.push({
            id: banner.id,
            url: banner.url,
            mobileSrc: null,
            tipo: banner.tipo
          });
        });
      } else {
        // Sem banner no Firebase: usa o fallback original
        const isResponsive = typeof fallback === 'object';
        slides.push({
          id: `fallback-${activePage}`,
          url: isResponsive ? fallback.desktop : fallback,
          mobileSrc: isResponsive ? fallback.mobile : null,
          tipo: 'imagem'
        });
      }
    }

    return slides;
  };

  const slides = buildSlides();
  const hasCarousel = slides.length > 1;

  const renderSlide = (slide) => {
    if (slide.tipo === 'video') {
      return (
        <video
          src={slide.url}
          autoPlay
          loop
          muted
          playsInline
          className="header-background-image"
        />
      );
    }
    if (slide.mobileSrc) {
      return (
        <picture>
          <source media="(max-width: 768px)" srcSet={slide.mobileSrc} />
          <img
            src={slide.url}
            alt="Background"
            className="header-background-image"
            fetchpriority="high"
          />
        </picture>
      );
    }
    return (
      <img
        src={slide.url}
        alt="Background"
        className="header-background-image"
        fetchpriority="high"
      />
    );
  };

  return (
    <header className="header">
      <div className="header-background-wrapper">
        {hasCarousel ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            speed={1200}
            className="header-swiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {renderSlide(slide)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          renderSlide(slides[0])
        )}
        <div className="header-overlay"></div>
      </div>
      <div className="message-container">
        <h1 className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.title}</h1>
        <p className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.subtitle}</p>
      </div>
    </header>
  );
}

export default DynamicHeader;
