import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/BrandCarousel.css';

const brands = [
  { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/600px-Volkswagen_logo_2019.svg.png' },
  { name: 'Fiat', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/1200px-Fiat_Automobiles_logo.svg.png' },
  { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1200px-Ford_logo_flat.svg.png' },
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1200px-Hyundai_Motor_Company_logo.svg.png' },
  { name: 'Renault', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Renault_2021_Text.svg/1200px-Renault_2021_Text.svg.png' },
  { name: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1200px-Mitsubishi_logo.svg.png' },
  { name: 'Peugeot', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Peugeot_Logo.svg/1200px-Peugeot_Logo.svg.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png' },
  { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1200px-Audi-Logo_2016.svg.png' },
  { name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Land_Rover_logo_black.svg/1200px-Land_Rover_logo_black.svg.png' },
  { name: 'Volvo', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961105/png-clipart-volvo-car-logo-volvo-trucks-ab-volvo-volvo-cars-volvo-logo-emblem-text-removebg-preview_w64aca.png' },
  { name: 'Suzuki', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961105/png-clipart-suzuki-logo-art-suzuki-sx4-car-suzuki-jimny-logo-suzuki-angle-text-thumbnail-removebg-preview_sji61q.png' },
  { name: 'Chery', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961106/chery-logo-4k-hd-chery-11563527110ebyxrf9l1d-removebg-preview_vpzlda.png' },
  { name: 'Subaru', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961106/png-transparent-subaru-forester-car-subaru-wrx-fuji-cdr-emblem-trademark-removebg-preview_fd7qop.png' },
  { name: 'JAC', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961105/63e49ccffeee076c6e584fb6b44fe20b-removebg-preview_fdfjxr.png' },
  { name: 'Chevrolet', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961106/png-clipart-chevrolet-impala-car-general-motors-logo-chevrolet-logo-car-thumbnail-removebg-preview_jwcqqq.png' },
  { name: 'Jeep', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961106/jeep-removebg-preview_indkgl.png' },
  { name: 'Nissan', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961106/png-transparent-nissan-car-logo-nissan-emblem-trademark-desktop-wallpaper-thumbnail-removebg-preview_rytlzs.png' },
  { name: 'Citroen', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961106/png-transparent-citroen-car-logo-brand-citroen-angle-logos-line-removebg-preview_scwx25.png' },
  { name: 'Kia', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961105/png-transparent-kia-logo-kia-motors-kia-spectra-car-kia-cerato-kia-canada-inc-emblem-wikipedia-logo-thumbnail-removebg-preview_ohtei5.png' },
  { name: 'Mercedes-Benz', logo: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764961221/png-transparent-mercedes-benz-car-encapsulated-postscript-logo-mercedes-benz-cdr-angle-trademark-thumbnail-removebg-preview_cnhyum.png' }
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
