import { Link } from 'react-router-dom';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';

import { Helmet } from 'react-helmet';
import AnimatedPage from '../../components/AnimatedPage'; // Importe o componente AnimatedPage



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
        image: '/images/retifica.jpg' // Caminho da imagem
    },
    {
        title: 'Quanto Custa uma Retífica de Motor?',
        description: 'Entenda os custos envolvidos no processo de retífica de motores.',
        link: '/custoretifica',
        image: '/images/custo.jpg'
    },
    {
        title: 'Manutenção de Motores',
        description: 'Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor',
        link: '/manutencao-de-motores',
        image: '/images/manutencao.jpg'
    },
    {
        title: 'Retífica Parcial ou Completa',
        description: 'Qual a Melhor Opção para o Seu Motor?',
        link: '/retifica-parcial-ou-completa',
        image: '/images/retifica-parcial.jpg'
    },
    {
        title: 'Retíficar ou Trocar o Motor?',
        description: 'Neste artigo, explicamos os prós e contras de cada opção.',
        link: '/retifica-parcial-ou-completa',
        image: '/images/trocar-motor.jpg'
    },
];


    return (
        <>
            <Helmet>
                <title>Blog de Retífica de Motores e Manutenção | Zero20 Garage</title>
                <meta name="description" content="Artigos sobre manutenção automotiva, retífica de motores e mais." />
            </Helmet>

            <div className="page-black">
            <DynamicHeader page="blog" messages={messages} />
                <AnimatedPage />
                {/* Card padrão Section */}
                <div className="container-black">
                    <section className="section">
                        <div className='highlight-item'>
                          <div className='highlight-item'>
                            <h2 translate='no'>Blog ZER0 20 GARAGE™</h2>
                            <p>Explore artigos, dicas e novidades sobre manutenção automotiva e retífica de motores.</p>
                            </div>
 <div className="blog-grid">
    {blogPosts.map((post) => (
        <div
            className="blog-item"
            key={post.title}
            data-aos="fade-up">
            <Link
                to={post.link}
                className="ctn-button">

                {/* ✅ Apenas imagem no topo */}
                <img
                    src={post.image}
                    alt={post.title}
                    className="blog-item__image"
                />

                {/* ✅ Remover linha {post.icon} */}

                <h2 className='title'>{post.title}</h2>
                <p>{post.description}</p>

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
