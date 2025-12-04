import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/BrandCarousel.css';

const brands = [
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/600px-Volkswagen_logo_2019.svg.png' },
  { name: 'Chevrolet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Chevrolet_Logo.svg/1200px-Chevrolet_Logo.svg.png' },
  { name: 'Fiat', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/1200px-Fiat_Automobiles_logo.svg.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1200px-Ford_logo_flat.svg.png' },
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1200px-Hyundai_Motor_Company_logo.svg.png' },
  { name: 'Renault', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Renault_2021_Text.svg/1200px-Renault_2021_Text.svg.png' },
  { name: 'Jeep', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Jeep_logo.svg/1200px-Jeep_logo.svg.png' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.png/1200px-Nissan_logo.png' },
  { name: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1200px-Mitsubishi_logo.svg.png' },
  { name: 'Peugeot', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Peugeot_Logo.svg/1200px-Peugeot_Logo.svg.png' },
  { name: 'Citroen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Citro%C3%ABn_2021.svg/1200px-Citro%C3%ABn_2021.svg.png' },
  { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Kia_logo.svg/1200px-Kia_logo.svg.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png' },
  { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png' },
  { name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Land_Rover_logo_black.svg/1200px-Land_Rover_logo_black.svg.png' },
  { name: 'Volvo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Volvo_Iron_Mark_Black.svg/1200px-Volvo_Iron_Mark_Black.svg.png' },
  { name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/1200px-Suzuki_logo_2.svg.png' },
  { name: 'Chery', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Chery_logo.svg/1200px-Chery_logo.svg.png' },
  { name: 'Subaru', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Subaru_logo.svg/1200px-Subaru_logo.svg.png' },
  { name: 'JAC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/JAC_Motors_logo.svg/1200px-JAC_Motors_logo.svg.png' },
  { name: 'Troller', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Troller_logo.svg/1200px-Troller_logo.svg.png' }
];

const BrandCarousel = () => {
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
      <h2 className="titulo-claro home-title">Marcas que Atendemos</h2>
      <Slider {...settings}>
        {brands.map((brand, index) => (
          <div key={index} className="brand-slide">
            <div className="brand-logo-wrapper">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;
