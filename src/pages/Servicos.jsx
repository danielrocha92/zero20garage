import { Link } from 'react-router-dom';
import './Servicos.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import { Helmet } from 'react-helmet';
import { FaTools, FaSearch, FaWrench, FaTachometerAlt, FaUsersCog } from 'react-icons/fa'; // Importe os ícones

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
            icon: <FaTools size={90} />, // Ícone para Manutenção Preventiva
        },
        {
            title: 'Diagnóstico de Problemas',
            description: 'Diagnóstico preciso para identificar...',
            link: '/dp',
            icon: <FaSearch size={90} />, // Ícone para Diagnóstico de Problemas
        },
        {
            title: 'Troca de Peças',
            description: 'Substituição de peças desgastadas...',
            link: '/tp',
            icon: <FaWrench size={90} />, // Ícone para Troca de Peças
        },
        {
            title: 'Teste de Desempenho',
            description: 'Testes rigorosos para garantir...',
            link: '/td',
            icon: <FaTachometerAlt size={90} />, // Ícone para Teste de Desempenho
        },
        {
            title: 'Consultoria Técnica',
            description: 'Consultoria especializada para ajudar...',
            link: '/ct',
            icon: <FaUsersCog size={90} />, // Ícone para Consultoria Técnica
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
                        <div className="service-item">
                            <h2>Retífica de Motores</h2>
                            <p>Serviço completo de retífica de motores...</p>
                        </div>

                        <div className="service-grid">
                            {services.map((service) => (
                                <div className="service-item" key={service.title} data-aos="fade-up">
                                    <Link to={service.link} className="service-button">
                                        {service.icon} {/* Exibe o ícone */}
                                        <h2>{service.title}</h2>
                                        <p>{service.description}</p>
                                        <ctn-button>Saiba Mais</ctn-button>
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