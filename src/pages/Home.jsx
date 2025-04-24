import React from 'react';
import '../styles/Home.css' // Importa o arquivo global de estilos
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
    <div className="page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
          {/* Card padrão Section */}
          <div className="container">
            <section className="section">
                <div className='highlight-item'>
                <h1 translate="no">Zero 20 Garage</h1>
                <h2>Excelência em Retífica de Motores e Soluções Mecânicas Sob Medida</h2>
                <h3>Atendimento especializado para veículos nacionais e importados.</h3>
                  <a href="/orcamento" className="button">Solicite um Orçamento</a>
                </div>
            </section>

          {/* Destaques */}
          <section className="section">
                <div className='highlight-item'>
                  <h2>Por que Escolher a Zero20 Garage?</h2>
                  <div className="highlights-grid">
                  <div className="highlight-item">
                      <h2>Pagamento</h2>
                      <p>em até 12x (Consulte Condições)
                      5% de Desconto no valor da Retífica Para Pagamento À Vista</p>
                    </div>
                    <div className="highlight-item">
                      <h2>Garantia</h2>
                      <p>8 Valvulas = 2 anos De garantia ou 100.000KM</p>
                      <p>
                      16 Valvulas = 1 ano ou 50.00KM</p>
                    </div>
                    <div className="highlight-item">
                      <h2>Tempo de entrega</h2>
                      <p>Motor Nacional = 4 a 7 Dias Úteis</p>
                      <p>Motor Importado = 10 a 15 Dias Úteis</p>
                      <p>Motor Diesel = 10 a 15 Dias Úteis</p>
                    </div>
                </div>
              </div>
          </section>

            {/* Serviços Destacados */}
            <section className="section">
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
            </section>

          {/* Conteúdo adicional */}
    
          {/* Depoimentos */}
          <section className="section">
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
          </section>

      {/* home */}
      <div className='page'>
            <div className="highlight-item">
            <address className="address">
          <strong>ZER0 20 GARAGE™</strong><br />
          <a href='https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D'target='blank'>Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP</a><br />
          <a href="tel:+5511941097471">(11) 94109-7471</a><br />
          <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
        </address>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;