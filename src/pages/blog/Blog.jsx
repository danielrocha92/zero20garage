import { Link } from 'react-router-dom';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import AnimatedPage from '../../components/AnimatedPage';

// ✅ Import das imagens
const sinaisRetificaImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429515/sinais-retifica_kcy7mm.jpg';
const custoRetificaImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429465/custo-retifica_bnpb4x.jpg';
const manutencaoMotoresImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764729616/manutencao-de-motores_iitd4z.png';
const retificaParcialImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429507/retifica-parcial-ou-completa_mqxitk.jpg';
const trocarMotorImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429521/trocar-motor_lqzrhf.jpg';
const valeAPenaRetificarImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429530/valeAPenaRetificarImg_p5wtyt.jpg';

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
        </>
    );
};

export default Blog;
