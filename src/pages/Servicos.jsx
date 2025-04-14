import { Link } from 'react-router-dom';
import './Servicos.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import { Helmet } from 'react-helmet';

const Servicos = () => {
  const messages = [
    {
      title: 'Nossos Serviços',
      subtitle: 'Conheça tudo o que podemos fazer por você',
    },
    {
      title: 'Retífica de Motores',
      subtitle: 'Serviços especializados para motores nacionais e importados',
    },
    {
      title: 'Manutenção Preventiva',
      subtitle: 'Cuide do seu carro com nossa equipe experiente',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Serviços de Retífica de Motores e Manutenção | Zero20 Garage</title>
        <meta name="description" content="Oferecemos serviços especializados em retífica de motores, manutenção preventiva, diagnóstico e mais. Solicite um orçamento agora." />
      </Helmet>

      <div className="services">
        <DynamicHeader messages={messages} />
        <WhatsAppButton />

        <div className="container">
          <section className="section">
            <div className="highlight-item">
              <h2>Retífica de Motores</h2>
              <p>Serviço completo de retífica de motores para garantir o melhor desempenho do seu veículo.</p>
            </div>

            <div className="service-grid">
              <div className="service-item" data-aos="fade-up">
                <Link to="/mp" className="service-button">
                  <h2>Manutenção Preventiva</h2>
                  <p>Manutenção regular para evitar problemas futuros e prolongar a vida útil do motor.</p>
                </Link>
              </div>
              <div className="service-item" data-aos="fade-up">
                <Link to="/dp" className="service-button">
                  <h2>Diagnóstico de Problemas</h2>
                  <p>Diagnóstico preciso para identificar e resolver problemas no motor do seu veículo.</p>
                </Link>
              </div>
              <div className="service-item" data-aos="fade-up">
                <Link to="/tp" className="service-button">
                  <h2>Troca de Peças</h2>
                  <p>Substituição de peças desgastadas ou danificadas por componentes de alta qualidade.</p>
                </Link>
              </div>
              <div className="service-item" data-aos="fade-up">
                <Link to="/td" className="service-button">
                  <h2>Teste de Desempenho</h2>
                  <p>Testes rigorosos para garantir que o motor esteja funcionando de maneira eficiente.</p>
                </Link>
              </div>
              <div className="service-item" data-aos="fade-up">
                <Link to="/ct" className="service-button">
                  <h2>Consultoria Técnica</h2>
                  <p>Consultoria especializada para ajudar você a tomar as melhores decisões para o seu veículo.</p>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Servicos;
