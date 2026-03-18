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
            {/* SEO On-Page: Helmet com title, description e canonical otimizados */}
            <Helmet>
                <title>Serviços da Zero 20 Garage | Retífica, Manutenção e Diagnóstico em Mairiporã-SP</title>
                <meta name="description" content="Retífica de motores, revisão completa e manutenção automotiva em Mairiporã-SP. Conheça todos os serviços da Zero 20 Garage e peça seu orçamento." />
                <link rel="canonical" href="https://zero20garage.com.br/servicos" />
            </Helmet>

            <div className="page-escuro">
            <DynamicHeader page="servicos" messages={messages} />
            <Breadcrumbs />
                    {/* SEO Semântica: H1 único com palavra-chave principal da página */}
                    <div className='highlight-item'>
                        <h1 className='titulo-claro servicos-page-title servicos-h1' translate='no'>Nossos Serviços Mecânicos em Mairiporã</h1>
                        <p className="paragrafo-claro servicos-intro-paragraph">Rodar pelas estradas de Mairiporã exige um motor confiável. Nossos serviços focados em retífica, diagnóstico preciso e lubrificação garantem total segurança e performance para você e sua família no trânsito local da serra.</p>
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
