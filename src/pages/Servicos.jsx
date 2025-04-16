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
        // ... (outras mensagens)
    ];

    const services = [
        {
            title: 'Manutenção Preventiva',
            description: 'Manutenção regular para evitar problemas futuros...',
            link: '/mp',
            image: 'images/mp.jpg', // Adicione a URL da imagem
        },
        {
            title: 'Diagnóstico de Problemas',
            description: 'Diagnóstico preciso para identificar...',
            link: '/dp',
            image: '/images/diagnostico.jpg',
        },
        {
            title: 'Troca de Peças',
            description: 'Substituição de peças desgastadas...',
            link: '/tp',
            image: '/images/troca-pecas.jpg',
        },
        {
            title: 'Teste de Desempenho',
            description: 'Testes rigorosos para garantir...',
            link: '/td',
            image: '/images/teste-desempenho.jpg',
        },
        {
            title: 'Consultoria Técnica',
            description: 'Consultoria especializada para ajudar...',
            link: '/ct',
            image: '/images/consultoria-tecnica.jpg',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Serviços de Retífica de Motores e Manutenção | Zero20 Garage</title>
                <meta name="description" content="Oferecemos serviços especializados..." />
            </Helmet>

            <div className="services">
                <DynamicHeader messages={messages} />
                <WhatsAppButton />

                <div className="container">
                    <section className="section">
                        <div className="highlight-item">
                            <h2>Retífica de Motores</h2>
                            <p>Serviço completo de retífica de motores...</p>
                        </div>

                        <div className="service-grid">
                            {services.map((service) => (
                                <div className="service-item" key={service.title} data-aos="fade-up">
                                    <Link to={service.link} className="service-button">
                                        <img src={service.image} alt={service.title} />
                                        <h2>{service.title}</h2>
                                        <p>{service.description}</p>
                                        <button>Saiba Mais</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Servicos;