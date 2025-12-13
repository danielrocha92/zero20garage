import { Link } from 'react-router-dom';
import './Servicos.css';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import { FaOilCan, FaSearch, FaCogs, FaChartLine, FaUserTie } from 'react-icons/fa';
import FAQSection from '../../components/ui/FAQSection';

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
            link: '/servicos/mp',
            icon: <FaOilCan className="service-icon" />,
        },
        {
            title: 'Diagnóstico de Problemas',
            description: 'Diagnóstico preciso para identificar...',
            link: '/servicos/dp',
            icon: <FaSearch className="service-icon" />,
        },
        {
            title: 'Troca de Peças',
            description: 'Substituição de peças desgastadas...',
            link: '/servicos/tp',
            icon: <FaCogs className="service-icon" />,
        },
        {
            title: 'Teste de Desempenho',
            description: 'Testes rigorosos para garantir...',
            link: '/servicos/td',
            icon: <FaChartLine className="service-icon" />,
        },
        {
            title: 'Consultoria Técnica',
            description: 'Consultoria especializada para ajudar...',
            link: '/servicos/cp',
            icon: <FaUserTie className="service-icon" />,
        },
    ];

    return (
        <>
            <Helmet>
                <title translate="no" className='subtitle-claro'>
                    Serviços de Retífica de Motores e Manutenção | Zero20 Garage
                </title>
                <meta name="description" content="Oferecemos serviços especializados" />
            </Helmet>

            <div className="page-escuro">
            <DynamicHeader page="servicos" messages={messages} />
            <Breadcrumbs />
                    <div className='highlight-item'>
                        <h2 className='titulo-claro servicos-page-title' translate='no'>Serviços que executamos</h2>
                        <div className="service-grid">
                            {services.map((service) => (
                                <div
                                    className="service-item"
                                    key={service.title}
                                    data-aos="fade-up">
                                    <Link to={service.link} className="ctn-button">
                                        <div className="icon-wrapper">
                                            {service.icon}
                                        </div>
                                        <h3 className='service-item__title'>{service.title}</h3>
                                        <p className="service-item__description">{service.description}</p>
                                        <span className="service-item-link">
                                            Saiba Mais
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <FAQSection />
            </div>
        </>
    );
};

export default Servicos;
