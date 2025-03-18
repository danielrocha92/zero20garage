import React, { useState, useEffect } from 'react';
import './Home.css';
import GoogleReviews from '../components/GoogleReviews';

function Home() {
  const [headerContent, setHeaderContent] = useState({
    title: '𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™',
    subtitle: 'Oficina Mecânica e Retífica de Motores Nacionais e Importados',
  });

  useEffect(() => {
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

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setHeaderContent(messages[index]);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <header className="header">
          <h1 className="fade">{headerContent.title}</h1>
          <p className="fade">{headerContent.subtitle}</p>
        </header>
        <section className="home">
          <GoogleReviews />
          {/* Conteúdo adicional */}

          {/* Mensagem Principal */}
            <header className="hero">
              <h1>Excelência em Retífica de Motores e Soluções Mecânicas Sob Medida</h1>
              <p>Atendimento especializado para veículos nacionais e importados.</p>
              <a href="/orcamento" className="cta-button">Solicite um Orçamento</a>
            </header>

            {/* Serviços Destacados */}
            <section className="services">
              <h2>Nossos Serviços</h2>
              <div className="services-grid">
                <div className="service-item">
                  <img src="/images/retifica.jpg" alt="Retífica de Motores" />
                  <h3>Retífica de Motores</h3>
                  <p>Recuperação completa do motor com precisão e qualidade.</p>
                </div>
                <div className="service-item">
                  <img src="/images/manutencao.jpg" alt="Manutenção Preventiva" />
                  <h3>Manutenção Preventiva</h3>
                  <p>Evite problemas futuros com revisões regulares.</p>
                </div>
                <div className="service-item">
                  <img src="/images/revisao.jpg" alt="Revisão Completa" />
                  <h3>Revisão Completa</h3>
                  <p>Diagnóstico avançado para garantir o melhor desempenho do seu veículo.</p>
                </div>
              </div>
            </section>

            {/* Destaques */}
            <section className="highlights">
              <h2>Por que Escolher a Zero20 Garage?</h2>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <h3>Ofertas Especiais</h3>
                  <p>Descontos exclusivos para serviços de retífica e manutenção.</p>
                </div>
                <div className="highlight-item">
                  <h3>Certificações</h3>
                  <p>Equipe certificada e equipamentos de última geração.</p>
                </div>
                <div className="highlight-item">
                  <h3>Clientes Satisfeitos</h3>
                  <p>Veja o que nossos clientes dizem sobre nossos serviços.</p>
                </div>
              </div>
            </section>

            {/* Depoimentos */}
            <section className="testimonials">
              <h2>O que Nossos Clientes Dizem</h2>
              <div className="testimonial-item">
                <p>"Serviço impecável! Meu carro nunca esteve tão bom. Recomendo a Zero20 Garage para todos."</p>
                <strong>- João Silva</strong>
              </div>
              <div className="testimonial-item">
                <p>"Atendimento rápido e eficiente. A equipe é muito profissional e confiável."</p>
                <strong>- Maria Oliveira</strong>
              </div>
            </section>

            {/* Contato Rápido */}
            <section className="contact">
              <h2>Entre em Contato</h2>
              <p>Estamos prontos para atender você. Ligue ou envie uma mensagem agora mesmo!</p>
              <div className="contact-info">
                <p><strong>Telefone:</strong> (11) 94109-7471</p>
                <p><strong>E-mail:</strong> contato@zero20garage.com</p>
                <a href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.3263499,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="cta-button">Ver Localização</a>
              </div>
            </section>

        </section>
      </div>
    </div>
  );
}

export default Home;