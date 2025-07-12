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
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YXye4Rnxvugapp4JcVgXbJWDe2-Z783Hk3InytN5bCbdVOAbWRUh2oXGLbzrqM3EiTKSc2Z4JwT1iVVdtImksgXYkinGaZY__heSlJ-tgWBO8jdkuy6bWpVDh2Aq7YVt3kMWx8ti2hS_qQ5=w960-h1581-p-k-no",
    date: "um mês atrás",
    rating: 5,
  },
  {
    name: "Luiz Henrique",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjUeywaFargV8Te_vT0Noy1ZsdVoOKaIPXk8uncNnfJjQn8vdq8D=w36-h36-p-rp-mo-br100",
    review: "Melhor retifica da região, além disso conta com uma oficina mecânica especializada em motores v6, v,8, motores nacionais e importados.",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YWgLzwVS3JwlOP5UgCDc88vtFhQtC1dCfE6Yxn5WhxHP6Ws24DcMweMbmavcvNtIfdk9N4JigL9qAAE3R3yrp3Zg4e9aLYnzLD3251m4PdGJpAaxznK-_FUp_eBmE-AQc_IATbCmDzqvy8=w960-h1581-p-k-no",
    date: "um ano atrás",
    rating: 5,
  },
  {
    name: "Willian “Shadow” Felix",
    profilePhoto: "https://lh3.googleusercontent.com/a-/ALV-UjVvr5y0RStji1v1niyfzTxRF6tlFMFSn86M6u4ls0y9QsN5bRFj=w72-h72-p-rp-mo-br100",
    review: "Preço bom e qualidade de serviço top. DEUS OS ABENÇOE SEMPRE 🙏🏽",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YXjifafiH1uQB5B5dr-mi2eKBVGvolNuAB-4LxSCVBgSre_UR7IHCTg-Ub0u0gX2W-kKTcBq1V39jPc3gKR4R3hcT_kioDQklUqmTQ1IuBpMVcxC-ExZLV3jYsitpFlbFIZs5-x6ATM_0zz=w960-h1581-p-k-no",
    date: "Abril de 2025",
    rating: 5,
  },
  {
    name: "Juan Sanchez Gonzales",
    profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocLkaL0Q0O2LhE5g3PV9EJn500fGbb3tJR5hAXC031LcbLht_Q=w72-h72-p-rp-mo-br100",
    review: "Super recomendo serviço top de qualidade sempre atencioso com os clientes agilidade com os serviços precisou de retifica zero20 e o nome da melhor retifica da região Deus abençoe vcs e continue assim",
    servicePhoto: "https://lh3.googleusercontent.com/gps-cs/AIky0YWymIsXUi9UVeZYh3IkijDKd8cEh66x2tPxyzhc5Q0n4odtzbneuOOYXDS7p1p5DPSZg7503zfGniNJ-c98ZlZgk6Bzv_o2nT6HLOfMQBK76doKdrZ0HPpTfQdrKGElDiYZVNJMLnmiGGxb=w960-h1581-p-k-no",
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
