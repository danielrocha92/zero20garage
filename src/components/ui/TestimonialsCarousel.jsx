import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../styles/TestimonialsCarousel.css';

const testimonials = [
  {
    name: "Willian Felix",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVvr5y0RStji1v1niyfzTxRF6tlFMFSn86M6u4ls0y9QsN5bRFj=w36-h36-p-rp-mo-br100",
    review: "Preço bom e qualidade de serviço top. DEUS OS ABENÇOE SEMPRE 🙏🏽",
    servicePhoto: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23aaa%22%3EService%3C%2Ftext%3E%3C%2Fsvg%3E",
    date: "um mês atrás",
    rating: 5,
  },
  {
    name: "Luan Goulart",
    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocIg3dakz4-MJ3q-cAJ0w2N7eZ1iSvdCV-PUgXkdANqdkp90UA=w36-h36-p-rp-mo-br100",
    review: "Excelente atendimento, serviço de qualidade e preço justo. Recomendo!",
    servicePhoto: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23aaa%22%3EService%3C%2Ftext%3E%3C%2Fsvg%3E",
    date: "2 meses atrás",
    rating: 5,
  },
  {
    name: "Adriel Cosméticos",
    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocKWeh9HPH1GhqtWY_Ojlk4MZgMTJPRF-U0X2M4YqUQr42CdUA=w36-h36-p-rp-mo-ba3-br100",
    review: "Profissionais qualificados, atendimento nota 10. Meu carro ficou novo de novo!",
    servicePhoto: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23aaa%22%3EService%3C%2Ftext%3E%3C%2Fsvg%3E",
    date: "3 meses atrás",
    rating: 5,
  },
  {
    name: "Luiz Henrique",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjUeywaFargV8Te_vT0Noy1ZsdVoOKaIPXk8uncNnfJjQn8vdq8D=w36-h36-p-rp-mo-br100",
    review: "Melhor retifica da região, além disso conta com uma oficina mecânica especializada em motores v6, v,8, motores nacionais e importados.",
    servicePhoto: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23aaa%22%3EService%3C%2Ftext%3E%3C%2Fsvg%3E",
    date: "um ano atrás",
    rating: 5,
  }
];

const TestimonialsCarousel = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <div className="testimonial-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="testimonial-item"
              onClick={() => setSelectedTestimonial(item)}
            >
              <div className="google-review-card">
                <div className="google-review-header">
                  <img src={item.profilePhoto} alt={item.name} className="google-user-photo" loading="lazy" />
                  <div className="google-user-info">
                    <span className="google-user-name">{item.name}</span>
                    <span className="google-review-date">{item.date}</span>
                  </div>
                  <div className="google-icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                  </div>
                </div>

                <div className="google-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="star">
                      {i < item.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>

                <div className="google-review-body">
                  <p>{item.review.substring(0, 120)}...</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="review-cta-container">
        <a
          href="https://search.google.com/local/writereview?placeid=ChIJyRLKdePtzpQRRUd0f9JzIaI"
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deixe sua Avaliação no Google
        </a>
      </div>

      {selectedTestimonial && (
        <div className="testimonial-modal" onClick={() => setSelectedTestimonial(null)}>
          <div className="testimonial-modal-content" onClick={e => e.stopPropagation()}>
            <div className="google-review-header">
              <img src={selectedTestimonial.profilePhoto} alt={selectedTestimonial.name} className="google-user-photo" />
              <div className="google-user-info">
                <span className="google-user-name">{selectedTestimonial.name}</span>
                <span className="google-review-date">{selectedTestimonial.date}</span>
              </div>
            </div>
            <div className="google-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="star">
                  {i < selectedTestimonial.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <div className="google-review-body">
              <p>{selectedTestimonial.review}</p>
            </div>
            <div className="service-photo-container">
              <img
                src={selectedTestimonial.servicePhoto}
                alt={`Serviço de ${selectedTestimonial.name}`}
                className="service-photo"
                loading="lazy"
              />
            </div>
            <button onClick={() => setSelectedTestimonial(null)} className="button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;