  import React from 'react';
  import '../styles/Home.css' // Importa o arquivo global de estilos
  import DynamicHeader from '../components/DynamicHeader';
  import WhatsAppButton from '../components/WhatsAppButton';
  import AnimatedPage from '../components/AnimatedPage';

  function Home() {
      const messages = [
        {
          title: '𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™',
          subtitle: 'Oficina Mecânica e Retífica de Motores Nacionais e Importados',
        },
        {
          title: 'Especialistas em Motores',
          subtitle: 'Serviços de alta qualidade para veículos nacionais e importados',
        },
        {
          title: 'Confiança e Qualidade',
          subtitle: 'Seu carro em boas mãos com nossa equipe experiente',
        },
      ];

    return (
      <div className="page-black">
        <DynamicHeader messages={messages} />
        <WhatsAppButton />
        <AnimatedPage />
            {/* Card padrão Section */}
            <div className="container-black">
              <section className="section">
                <div className='highlight-item'>
                <h2 className="title">Retífica de Motores e Soluções Mecânicas Sob Medida</h2>
                <h3>Atendimento especializado para veículos nacionais e importados.</h3>
                  <a href="/orcamento" className="button">Solicite um Orçamento</a>
                </div>
              </section>

              {/* Destaques */}
              <section className="section">
               <div className='highlight-item'>
                <h2 className="title">Por que a Zero 20 Garage?</h2>
                <div className="highlights-grid">
                  <div className="highlight-card">
                    <h3>Pagamento Facilitado</h3>
                    <p>Até 12x ou 5% de desconto à vista.</p>
                  </div>
                  <div className="highlight-card">
                    <h3>Entrega Ágil</h3>
                    <p>Serviço nacional: 4 a 7 dias úteis.<br/>Importados: até 15 dias.</p>
                  </div>
                  <div className="highlight-card">
                    <h3>Especialistas em Motores</h3>
                    <p>Equipe qualificada e equipamentos modernos.</p>
                  </div>
                </div>
                </div>
              </section>
            {/* Conteúdo adicional */}

            {/* Depoimentos */}
            <section className="section">
                <div className='highlight-item'>
                  <h2>O que Nossos Clientes Dizem</h2>
                  {/* Avaliações Google Maps */}
                  <div className="highlights-grid">
                  <div className="testimonial-item">
                    <div className="highlight-card">
                      <strong><p>"Serviço impecável! Meu carro nunca esteve tão bom. Recomendo a Zero20 Garage para todos."</p></strong>
                        <span className="review-date">Junho de 2024</span>
                        <div className="stars">
                          <span className="star">★</span>
                          <span className="star">★</span>
                          <span className="star">★</span>
                          <span className="star">★</span>
                          <span className="star">☆</span>
                        </div>
                        <p>- João Silva</p>
                      </div>
                  </div>
                  <div className="testimonial-item">
                    <div className="highlight-card">
                  <strong><p>"Atendimento rápido e eficiente. A equipe é muito profissional e confiável."</p></strong>
                    <span className="review-date">Abril de 2025</span>
                    <div className="stars">
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">★</span>
                      <span className="star">☆</span>
                    </div>
                    <p>- Maria Oliveira</p>
                  </div>
                  </div>
                  </div>
                </div>
            </section>

              {/* home */}
              <div className="highlight-item">
                <address className="address">
                  <strong>ZER0 20 GARAGE™</strong><br />
                  <a href='https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D'target='blank'>Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
                  <a href="tel:+5511941097471">(11) 94109-7471</a><br />
                  <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a><br />
                  <a href="https://www.instagram.com/zero20garage/" target="_blank" rel="noopener noreferrer">Instagram</a><br />
                </address>
              </div>
          </div>
        </div>
    );
  }
  export default Home;