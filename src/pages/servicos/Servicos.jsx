import { Link } from 'react-router-dom';
import './Servicos.css';
import DynamicHeader from '../../components/DynamicHeader';
import WhatsAppButton from '../../components/WhatsAppButton';
import { Helmet } from 'react-helmet';
import AnimatedPage from '../../components/AnimatedPage';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
            isLottie: true,
            lottieUrl: 'https://lottie.host/a6897091-f363-45d3-8248-1f401716037c/Zu2Q1IPS9P.lottie',
        },
        {
            title: 'Diagnóstico de Problemas',
            description: 'Diagnóstico preciso para identificar...',
            link: '/dp',
            isLottie: true,
            lottieUrl: 'https://lottie.host/1015c069-5700-45d3-97f2-f384e1ba5077/HtUxdY6MQL.lottie',
        },
        {
            title: 'Troca de Peças',
            description: 'Substituição de peças desgastadas...',
            link: '/tp',
            isLottie: true,
            lottieUrl: 'https://lottie.host/65fd28e9-8bb9-4fc7-a243-49c4aa7483f2/fyhYTYsPTh.lottie',
        },
        {
            title: 'Teste de Desempenho',
            description: 'Testes rigorosos para garantir...',
            link: '/td',
            isLottie: true,
            lottieUrl: 'https://lottie.host/569ca6d8-8079-4e2b-91bf-eed5308fec69/A1ShQBAMgI.lottie',
        },
        {
            title: 'Consultoria Técnica',
            description: 'Consultoria especializada para ajudar...',
            link: '/cp',
            isLottie: true,
            lottieUrl: 'https://lottie.host/22e9c59d-76ec-4deb-9603-5d6540ae2fc2/kYkYTa00QB.lottie',
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

            <div className="page-black">
                <DynamicHeader messages={messages} />
                <WhatsAppButton />
                <AnimatedPage />
                <div className="container-black">
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
                                        <Link to={service.link} className="ctn-button">
                                            {service.isLottie ? (
                                                <DotLottieReact
                                                    src={service.lottieUrl}
                                                    loop
                                                    autoplay
                                                    className="service-animation"
                                                    style={{ height: 120 }}
                                                />
                                            ) : (
                                                service.icon
                                            )}
                                            <h2 className='title'>{service.title}</h2>
                                            <p>{service.description}</p>
                                            <button type="submit" className="submit-button">
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
