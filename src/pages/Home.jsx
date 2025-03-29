import React from 'react';
import './Home.css' // Importa o arquivo global de estilos
import GoogleReviews from '../components/GoogleReviews';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

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
    <div className="home">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
          {/* Card padrão Section */}
          <div className="container">
            <section className="contato-info-section">
              <div className='contato-info-section'>
                <div className='highlight-item'>
                <h1>Zero 20 Garage</h1>
                <h2>Excelência em Retífica de Motores e Soluções Mecânicas Sob Medida</h2>
                <h3>Atendimento especializado para veículos nacionais e importados.</h3>
                  <a href="/orcamento" className="cta-button">Solicite um Orçamento</a>
                </div>
              </div>
            </section>

          {/* Destaques */}
          <section className="contato-info-section">
              <div className='contato-info-section'>
                <div className='highlight-item'>
                  <h2>Por que Escolher a Zero20 Garage?</h2>
                  <div className="highlights-grid">
                  <div className="highlight-item">
                      <h2>Ofertas Especiais</h2>
                      <p>Descontos exclusivos para serviços de retífica e manutenção.</p>
                    </div>
                    <div className="highlight-item">
                      <h2>Certificações</h2>
                      <p>Equipe certificada e equipamentos de última geração.</p>
                    </div>
                    <div className="highlight-item">
                      <h2>Clientes Satisfeitos</h2>
                      <p>Veja o que nossos clientes dizem sobre nossos serviços.</p>
                    </div>
                </div>
              </div>
              </div>
          </section>

            {/* Serviços Destacados */}
            <section className="contato-info-section">
              <div className='contato-info-section'>
                <div className='highlight-item'>
                      <h2>Retífica de Motores</h2>
                      <p>Recuperação completa do motor com precisão e qualidade.</p>
                    <div className="highlights-grid">
                      <div className="highlight-item">
                      <h2>Manutenção Preventiva</h2>
                      <p>Evite problemas futuros com revisões regulares.</p>
                    </div>
                    <div className="highlight-item">
                      <h2>Revisão Completa</h2>
                      <p>Diagnóstico avançado para garantir o melhor desempenho do seu veículo.</p>
                    </div>
                </div>
              </div>
              </div>
            </section>

          {/* Conteúdo adicional */}
    
          {/* Depoimentos */}
          <section className="contato-info-section">
            <div className='contato-info-section'>
              <div className='highlight-item'>
                <h2>O que Nossos Clientes Dizem</h2>
                {/* Avaliações Google Maps */}
                <GoogleReviews />
                <div className="testimonial-item">
                <strong><p>"Serviço impecável! Meu carro nunca esteve tão bom. Recomendo a Zero20 Garage para todos."</p></strong>
                  <p>- João Silva</p>
                </div>
                <div className="testimonial-item">
                <strong><p>"Atendimento rápido e eficiente. A equipe é muito profissional e confiável."</p></strong>
                  <p>- Maria Oliveira</p>
                </div>
              </div>
            </div>
          </section>

      {/* Contato */}
      <div className='home-section'>
            <div className="highlight-item">
              <div className="contato-info">
                <h2>Estamos Aqui para Ajudar</h2>
                <p>Entre em contato conosco para agendar um serviço ou tirar dúvidas.</p>
                <a href="/contato" className="cta-button">Fale Conosco</a>
                </div>
                <div className="contact-info">
                <p><strong>Telefone:</strong> (11) 94109-7471</p>
                <p><strong>E-mail:</strong> contato@zero20garage.com</p>
                <a href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.3263499,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="cta-button">Ver Localização</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;