import { Link } from 'react-router-dom';
import './Servicos.css';
import DynamicHeader from '../../components/DynamicHeader';
import WhatsAppButton from '../../components/WhatsAppButton';
import { Helmet } from 'react-helmet';
import { FaTools, FaSearch, FaWrench, FaTachometerAlt, FaUsersCog } from 'react-icons/fa';
import AnimatedPage from '../../components/AnimatedPage';

const Servicos = () => {
    const messages = [
        {
            title: 'Nossos Serviços',
            subtitle: 'Conheça tudo o que podemos fazer por você',
        },
    ];

    const services = [
        {
            title: 'Manutenção Preventiva',
            description: 'Manutenção regular para evitar problemas futuros...',
            link: '/mp',
            icon: <FaTools size={60} className="service-icon" />,
        },
        {
            title: 'Diagnóstico de Problemas',
            description: 'Diagnóstico preciso para identificar...',
            link: '/dp',
            icon: <FaSearch size={60} className="service-icon" />,
        },
        {
            title: 'Troca de Peças',
            description: 'Substituição de peças desgastadas...',
            link: '/tp',
            icon: <FaWrench size={60} className="service-icon" />,
        },
        {
            title: 'Teste de Desempenho',
            description: 'Testes rigorosos para garantir...',
            link: '/td',
            icon: <FaTachometerAlt size={60} className="service-icon" />,
        },
        {
            title: 'Consultoria Técnica',
            description: 'Consultoria especializada para ajudar...',
            link: '/cp',
            icon: <FaUsersCog size={60} className="service-icon" />,
        },
    ];

    return (
        <>
            <Helmet>
                <title>
                    Serviços de Retífica de Motores e Manutenção | Zero20 Garage
                </title>
                <meta name="description" content="Oferecemos serviços especializados" />
            </Helmet>

            <div className="page-escuro">
                <DynamicHeader messages={messages} />
                <WhatsAppButton />
                <AnimatedPage />
                <div className="container-escuro">
                    <section className="section">
                        <div className='highlight-item'>
                            <h2 className='title' translate='no'>Retífica de Motores</h2>
                            <p className="paragraph">Serviço completo de retífica de motores</p>
                            <div className="highlights-grid">
                                {services.map((service) => (
                                    <div
                                        className="service-item"
                                        key={service.title}
                                        data-aos="fade-up">
                                        <Link
                                            to={service.link}
                                            className="ctn-button">
                                            {service.icon}
                                            <h2 className='title'>{service.title}</h2>
                                            <p>{service.description}</p>
                                            <button
                                                type="submit"
                                                className="submit-button">
                                                Saiba Mais
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Servicos;
