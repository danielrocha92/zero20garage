import { Link } from 'react-router-dom';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Helmet } from 'react-helmet';
import AnimatedPage from '../../components/AnimatedPage';

// ✅ Import das imagens
import sinaisRetificaImg from '../../assets/images/sinais-retifica.jpg';
import custoRetificaImg from '../../assets/images/custo-retifica.jpg';
import manutencaoMotoresImg from '../../assets/images/manutencao-de-motores.jpg';
import retificaParcialImg from '../../assets/images/retifica-parcial-ou-completa.jpg';
import trocarMotorImg from '../../assets/images/trocar-motor.jpg';

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
            link: '/sinais-retifica',
            image: sinaisRetificaImg
        },
        {
            title: 'Quanto Custa uma Retífica de Motor?',
            description: 'Entenda os custos envolvidos no processo de retífica de motores.',
            link: '/custo-retifica',
            image: custoRetificaImg
        },
        {
            title: 'Manutenção de Motores',
            description: 'Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor',
            link: '/manutencao-de-motores',
            image: manutencaoMotoresImg
        },
        {
            title: 'Retífica Parcial ou Completa',
            description: 'Qual a Melhor Opção para o Seu Motor?',
            link: '/retifica-parcial-ou-completa',
            image: retificaParcialImg
        },
        {
            title: 'Retíficar ou Trocar o Motor?',
            description: 'Neste artigo, explicamos os prós e contras de cada opção.',
            link: '/trocar-motor',
            image: trocarMotorImg
        },
    ];

    return (
        <>
            <Helmet>
                <title>Blog de Retífica de Motores e Manutenção | Zero20 Garage</title>
                <meta name="description" content="Artigos sobre manutenção automotiva, retífica de motores e mais." />
            </Helmet>

            <div className="page modo-escuro">
                <DynamicHeader page="blog" messages={messages} />
                <Breadcrumbs />
                <AnimatedPage />

                <div className="container-black">
                    <section className="section">
                        <div className='highlight-item'>
                            <h2 translate='no'>Blog ZER0 20 GARAGE™</h2>
                            <p className="paragrafo-claro">Explore artigos, dicas e novidades sobre manutenção automotiva e retífica de motores.</p>

                            <div className="blog-grid">
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
                                            <button
                                                type="submit"
                                                className="submit-button">
                                                Leia Mais
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

export default Blog;
