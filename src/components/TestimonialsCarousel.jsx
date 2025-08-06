import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../components/TestimonialsCarousel.css';

// Remova todos os 'imports' de imagem aqui, pois os arquivos estão agora na pasta 'public'.

const testimonials = [
  {
    name: "Silas Sales",
    profilePhoto: "/testimonials/silas_profile.jpg", // Novo caminho
    review: "Já Fiz o motor de 2 carros com eles e sinceramente é um trabalho excelente parece uma obra de arte sem falar do tratamento excepcional que eles dão te explicam Tudo certinho e estão sempre a disposição para qualquer dúvidas e sem falar que cumprem com o prazo de entrega e fazem o serviço mto rápido. Resumindo super indico esta oficina",
    servicePhoto: "/testimonials/silas_service.jpg", // Novo caminho
    date: "um mês atrás",
    rating: 5,
  },
  {
    name: "Luiz Henrique",
    profilePhoto: "/testimonials/luiz_profile.jpg", // Novo caminho
    review: "Melhor retifica da região, além disso conta com uma oficina mecânica especializada em motores v6, v,8, motores nacionais e importados.",
    servicePhoto: "/testimonials/luiz_service.jpg", // Novo caminho
    date: "um ano atrás",
    rating: 5,
  },
  {
    name: "Willian “Shadow” Felix",
    profilePhoto: "/testimonials/willian_profile.jpg", // Novo caminho
    review: "Preço bom e qualidade de serviço top. DEUS OS ABENÇOE SEMPRE 🙏🏽",
    servicePhoto: "/testimonials/willian_service.jpg", // Novo caminho
    date: "Abril de 2025",
    rating: 5,
  },
  {
    name: "Juan Sanchez Gonzales",
    profilePhoto: "/testimonials/juan_profile.jpg", // Novo caminho
    review: "Super recomendo serviço top de qualidade sempre atencioso com os clientes agilidade com os serviços precisou de retifica zero20 e o nome da melhor retifica da região Deus abençoe vcs e continue assim",
    servicePhoto: "/testimonials/juan_service.jpg", // Novo caminho
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
              <div className="highlight-testimonial-card">
                <img src={item.profilePhoto} alt={item.name} className="user-photo" />
                <strong>
                  <p className="paragrafo-claro">{item.review.substring(0, 100)}...</p>
                </strong>
                <div className="service-photo-container">
                  <img src={item.servicePhoto} alt={`Serviço de ${item.name}`} className="service-photo" />
                </div>
                <span className="review-date">{item.date}</span>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="star">
                      {i < item.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <p className="paragrafo-claro">- {item.name}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedTestimonial && (
        <div className="testimonial-modal" onClick={() => setSelectedTestimonial(null)}>
          <div className="testimonial-modal-content" onClick={e => e.stopPropagation()}>
            <img src={selectedTestimonial.profilePhoto} alt={selectedTestimonial.name} className="user-photo" />
            <strong>
              <p className="paragrafo-claro">{selectedTestimonial.review}</p>
            </strong>
            <div className="service-photo-container">
              <img
                src={selectedTestimonial.servicePhoto}
                alt={`Serviço de ${selectedTestimonial.name}`}
                className="service-photo"
              />
            </div>
            <span className="review-date">{selectedTestimonial.date}</span>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="star">
                  {i < selectedTestimonial.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <p className="paragrafo-claro">- {selectedTestimonial.name}</p>
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