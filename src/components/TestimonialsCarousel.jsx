import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../components/TestimonialsCarousel.css';

const testimonials = [
  {
    name: "João Silva",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjV3V-xfFY_0eTCNQe89YfldGeb5fOwEaLmHUvz6y526WJ__ef0G=w72-h72-p-rp-mo-ba2-br100",
    review: "Já Fiz o motor de 2 carros com eles e sinceramente é um trabalho excelente parece uma obra de arte sem falar do tratamento excepcional que eles dão te explicam Tudo certinho e estão sempre a disposição para qualquer dúvidas e sem falar que cumprem com o prazo de entrega e fazem o serviço mto rápido. Resumindo super indico esta oficina",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YXuA2kj36VCUoqGzVQZBXC3GOPHF5_k4o_78lEhUms9P2lSMatTJtJEbQ4R1lOvheftjya1na9XSP0qw6EfjzxZa5tuXPWP5vlBIPRWy1pGdZMSOlBxSbmuwsGw7nvAhBcUM-rvtJKI-IoG=w600-h988-p-k-no",
    date: "um mês atrás",
    rating: 5,
  },
  {
    name: "Luiz Henrique",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjUeywaFargV8Te_vT0Noy1ZsdVoOKaIPXk8uncNnfJjQn8vdq8D=w36-h36-p-rp-mo-br100",
    review: "Melhor retifica da região, além disso conta com uma oficina mecânica especializada em motores v6, v,8, motores nacionais e importados.",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YUqltF3cQaCwopKT8aDLkHSdkcxBQE4YE4Hz_M_YfozqCWfzujlibKiGYVrB_q0LLaF3ZTBUVogVY7-QU3tCA6TdYvpCyWbeKh5KNE5b-lsJsyCSMK_Ed_Kw2kfEoUfbJ9wBWOLKDa8PPxW=w600-h988-p-k-no",
    date: "um ano atrás",
    rating: 5,
  },
  {
    name: "Willian “Shadow” Felix",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVvr5y0RStji1v1niyfzTxRF6tlFMFSn86M6u4ls0y9QsN5bRFj=w72-h72-p-rp-mo-br100",
    review: "Preço bom e qualidade de serviço top. DEUS OS ABENÇOE SEMPRE 🙏🏽",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YXraYpKEmesm5Q71AKNqQ2LO8V-WTgI2uwkbclsM53mA5AX0o81i7iV0fcE1PUk5dB6KlGUDcC_Ky4DdJR_0VIMEbBVNDxnd22kuZAYm6YhZNglFK8f9ktH0S5IK1xy9VIkvBteDFjbdl5O=w600-h988-p-k-no",
    date: "Abril de 2025",
    rating: 5,
  },
  {
    name: "Orlandison Gomes Da Silva",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjU0idG0RZW4weoKeJSGGRUcoIwcvOdZ6WqlhXkGlQKmc4LBFCVktA=w72-h72-p-rp-mo-ba2-br100",
    review: "Top demais",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YXraYpKEmesm5Q71AKNqQ2LO8V-WTgI2uwkbclsM53mA5AX0o81i7iV0fcE1PUk5dB6KlGUDcC_Ky4DdJR_0VIMEbBVNDxnd22kuZAYm6YhZNglFK8f9ktH0S5IK1xy9VIkvBteDFjbdl5O=w600-h988-p-k-no",
    date: "Abril de 2025",
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
              <div className="highlight-card">
                <img src={item.profilePhoto} alt={item.name} className="user-photo" />
                <strong><p>{item.review.substring(0, 100)}...</p></strong>
                <div className="service-photo-container">
                  <img src={item.servicePhoto} alt={`Serviço de ${item.name}`} className="service-photo" />
                </div>
                <span className="review-date">{item.date}</span>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="star">{i < item.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <p>- {item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedTestimonial && (
        <div className="testimonial-modal" onClick={() => setSelectedTestimonial(null)}>
          <div className="testimonial-modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedTestimonial.profilePhoto} alt={selectedTestimonial.name} className="user-photo" />
            <strong><p>{selectedTestimonial.review}</p></strong>
            <div className="service-photo-container">
              <img src={selectedTestimonial.servicePhoto} alt={`Serviço de ${selectedTestimonial.name}`} className="service-photo" />
            </div>
            <span className="review-date">{selectedTestimonial.date}</span>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="star">{i < selectedTestimonial.rating ? '★' : '☆'}</span>
              ))}
            </div>
            <p>- {selectedTestimonial.name}</p>
            <button onClick={() => setSelectedTestimonial(null)} className="button">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;