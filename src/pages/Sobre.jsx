// Sobre.jsx
import React from 'react';
import './Sobre.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

function Sobre() {
  const messages = [
    {
      title: 'Sobre Nós',
      subtitle: 'Conheça mais sobre a nossa história e missão',
    },
    {
      title: 'Nossa Missão',
      subtitle: 'Oferecer serviços de qualidade com confiança e excelência',
    },
    {
      title: 'Nossa Visão',
      subtitle: 'Ser referência no mercado de retífica e mecânica automotiva',
    },
  ];

  return (
    <div className="sobre">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <div className="container">
        <section className="sobre-section">
          <div className='sobre-section'>
            <div className='highlight-item'>
              <h2>Sobre a Zero20 Garage</h2>
              <h1>Nossa História</h1>
              <p>
                A Zero20 Garage nasceu da paixão por motores e do desejo de oferecer serviços de retífica e mecânica automotiva de alta qualidade. Fundada em 2020, nossa oficina se destaca pela excelência no atendimento e pela precisão em cada serviço realizado.
              </p>
              <p>
                Desde o início, investimos em equipamentos de última geração e na capacitação de nossa equipe, garantindo que cada motor receba o cuidado e a atenção que merece.
              </p>
            </div>
          </div>
        
            <div className="highlights-grid">
              <div className="highlight-item">
                <h2>Nossa Missão, Visão e Valores</h2>
                <h3>Nossa Missão</h3>
                <p>
                  Oferecer serviços de retífica e mecânica automotiva com qualidade, confiança e excelência, superando as expectativas de nossos clientes.
                </p>
            </div>

            <div className="highlight-item">
              <h3>Nossa Visão</h3>
              <p>
                Ser referência no mercado de retífica e mecânica automotiva, reconhecida pela qualidade dos serviços, inovação e compromisso com a satisfação dos clientes.
              </p>

            </div>

            <div className="highlight-item">
              <h3>Nossos Valores</h3>
                <ul>
                  <li>Qualidade: Compromisso com a excelência em cada serviço.</li>
                  <li>Confiança: Relações transparentes e honestas com nossos clientes.</li>
                  <li>Inovação: Busca constante por novas tecnologias e soluções.</li>
                  <li>Compromisso: Dedicação em atender e superar as expectativas dos clientes.</li>
                </ul>
            </div>
         </div>
        </section>

        <section className="sobre-section">
          <div className='sobre-section'>
        <section className="highlights-item">
          <h2>Nossa Equipe</h2>
          <p>
            Contamos com uma equipe de profissionais altamente qualificados e apaixonados por motores. Nossos técnicos são certificados e possuem vasta experiência em retífica e mecânica automotiva.
          </p>
          <p>
            Estamos sempre atualizados com as últimas tendências e tecnologias do mercado, garantindo que nossos clientes recebam o melhor serviço possível.
          </p>
        </section>
        </div>
        </section>

        <section className="sobre-section">
          <div className='sobre-section'>
        <section className="highlights-item">
          <h2>Por que Escolher a Zero20 Garage?</h2>
          <ul>
            <li>Equipamentos de última geração</li>
            <li>Profissionais altamente qualificados</li>
            <li>Serviços personalizados</li>
            <li>Compromisso com a qualidade</li>
            <li>Atendimento diferenciado</li>
          </ul>
        </section>
        </div>
        </section>

        <section className="sobre-section">
          <div className='sobre-section'>
        <section className="highlights-item">
          <h2>Depoimentos de Clientes</h2>
          <p>
            Veja o que nossos clientes dizem sobre nós:
          </p>
          <div className="highlights-grid">
          <div className="testimonial-item">
            <p>"Serviço excelente! Recomendo a Zero20 Garage para todos que precisam de retífica de motores."</p>
            <strong>- João Silva</strong>
          </div>
          </div>

          <div className="highlights-grid">
          <div className="testimonial-item">
            <p>"Atendimento nota 10! A equipe é muito profissional e prestativa."</p>
            <strong>- Maria Oliveira</strong>
          </div>
          </div>

        </section>
        </div>
        </section>

        <section className="sobre-section">
          <div className='sobre-section'>
        <section className="highlights">
          <h2>Entre em Contato</h2>
          <p>
            Estamos prontos para atender você! Entre em contato conosco para agendar um serviço ou tirar dúvidas.
          </p>
          <a href="/contato" className="cta-button">Fale Conosco</a>
        </section>
        </div>
        </section>
        </div>
      </div>
  );
}

export default Sobre;