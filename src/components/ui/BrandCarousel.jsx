import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/BrandCarousel.css';

const BrandCarousel = ({ brands, title = "Marcas que Atendemos", variant = "default" }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <div className="brand-carousel-container">
      <h2 className="titulo-claro home-title">{title}</h2>
      <Slider {...settings}>
        {brands && brands.map((brand, index) => (
          <div key={index} className="brand-slide">
            <div className={`brand-logo-wrapper ${variant}`}>
                <img src={brand.logo} alt={brand.name} className="brand-logo" loading="lazy" width="150" height="150" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;
