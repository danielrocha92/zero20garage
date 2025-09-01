import { Link } from 'react-router-dom';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import AnimatedPage from '../../components/AnimatedPage';

// ✅ Import das imagens
import sinaisRetificaImg from '../../assets/images/sinais-retifica.jpg';
import custoRetificaImg from '../../assets/images/custo-retifica.jpg';
import manutencaoMotoresImg from '../../assets/images/manutencao-de-motores.jpg';
import retificaParcialImg from '../../assets/images/retifica-parcial-ou-completa.jpg';
import trocarMotorImg from '../../assets/images/trocar-motor.jpg';
import valeAPenaRetificarImg from '../../assets/images/valeAPenaRetificarImg.jpg';

const Blog = () => {
    const messages = [
        {
            title: 'Blog',
            subtitle: 'Artigos e novidades sobre retífica de motores e manutenção automotiva',
        },
    ];

    const blogPosts = [
        {
            title: 'Retífica de Motores',
            description: 'Aprenda a identificar sinais de que seu motor pode precisar de retífica',
            link: '/blog/SinaisRetifica',
            image: sinaisRetificaImg
        },
        {
            title: 'Quanto Custa uma Retífica de Motor?',
            description: 'Entenda os custos envolvidos no processo de retífica de motores.',
            link: '/blog/CustoRetifica',
            image: custoRetificaImg
        },
        {
            title: 'Manutenção de Motores',
            description: 'Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor',
            link: '/blog/ManutencaoDeMotores',
            image: manutencaoMotoresImg
        },
        {
            title: 'Retífica Parcial ou Completa',
            description: 'Qual a Melhor Opção para o Seu Motor?',
            link: '/blog/RetificaParcialOuCompleta',
            image: retificaParcialImg
        },
        {
            title: 'Retíficar ou Trocar o Motor?',
            description: 'Neste artigo, explicamos os prós e contras de cada opção.',
            link: '/blog/TrocarMotor',
            image: trocarMotorImg
        },
                {
            title: 'Vale a Pena Retificar?',
            description: 'Retífica Vale a Pena ou é Melhor Trocar o Motor?',
            link: '/blog/ValeAPenaRetificar',
            image: valeAPenaRetificarImg
        },
    ];

    return (
        <>
            <Helmet>
                <title translate='no'>Blog de Retífica de Motores e Manutenção | Zero20 Garage</title>
                <meta name="description" content="Artigos sobre manutenção automotiva, retífica de motores e mais." />
            </Helmet>

            <div translate='no' className="page-escuro">
                <DynamicHeader page="blog" messages={messages} />
                <Breadcrumbs />
                <AnimatedPage />

                <div className="container-escuro">
                    <div className='highlight-item'>
                        <h2 className='titulo-claro' translate='no'>Blog ZER0 20 GARAGE™</h2>
                        <h3 className="subtitulo-claro">Explore artigos, dicas e novidades sobre manutenção automotiva e retífica de motores.</h3>

                        <div translate='no' className="blog-grid">
                            {blogPosts.map((post) => (
                                <div
                                    className="blog-item"
                                    key={post.title}
                                    data-aos="fade-up">
                                    <Link
                                        to={post.link}
                                        className="ctn-button">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="blog-item__image"
                                        />
                                        <h2 className='title'>{post.title}</h2>
                                        <p className="paragrafo-claro">{post.description}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;
