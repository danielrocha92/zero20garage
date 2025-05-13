import { Link } from 'react-router-dom';
import '../styles/Blog.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import { Helmet } from 'react-helmet';
import { FaPen, FaRegNewspaper, FaTools, FaWrench } from 'react-icons/fa'; // Ícones para o blog

const Blog = () => {
    const messages = [
        {
            title: 'Blog',
            subtitle: 'Artigos e novidades sobre retífica de motores e manutenção automotiva',
        },
    ];

    const blogPosts = [
        {
            title: 'Retífica de Motores: Como Saber Quando Seu Motor Precisa de Reparo?',
            description: 'Aprenda a identificar sinais de que seu motor pode precisar de retífica.',
            link: '/sinais-retifica',
            icon: <FaPen size={60} />, // Ícone para artigo de retífica
        },
        {
            title: 'Quanto Custa uma Retífica de Motor?',
            description: 'Entenda os custos envolvidos no processo de retífica de motores.',
            link: '/custoretifica',
            icon: <FaRegNewspaper size={60} />, // Ícone para custo de retífica
        },
        {
            title: 'Manutenção de Motores: Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor',
            description: 'Saiba como cuidar do motor do seu veículo para que ele dure mais tempo.',
            link: '/manutencao-de-motores',
            icon: <FaTools size={60} />, // Ícone para manutenção de motores
        },
        {
            title: 'Retífica Parcial ou Completa: Qual a Melhor Opção para o Seu Motor?',
            description: 'Descubra quando é melhor optar por uma retífica parcial ou completa.',
            link: '/retifica-parcial-ou-completa',
            icon: <FaWrench size={60} />, // Ícone para retífica parcial ou completa
        },
        {
            title: 'Retífica Vale a Pena ou é Melhor Trocar o Motor',
            description: 'Neste artigo, explicamos os prós e contras de cada opção.',
            link: '/retifica-parcial-ou-completa',
            icon: <FaWrench size={60} />, // Ícone para retífica parcial ou completa
        },
    ];

    return (
        <>
            <Helmet>
                <title>Blog de Retífica de Motores e Manutenção | Zero20 Garage</title>
                <meta name="description" content="Artigos sobre manutenção automotiva, retífica de motores e mais." />
            </Helmet>

            <div className="page-escuro">
                <DynamicHeader messages={messages} />
                <WhatsAppButton />

                <div className="container-escuro">
                    <section className="section">
                        <div className='highlight-item'>
                          <div className='highlight-item'>
                            <h2 className='title' translate='no'>Blog ZER0 20 GARAGE™</h2>
                            <p className="paragraph">Explore artigos, dicas e novidades sobre manutenção automotiva e retífica de motores.</p>
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
                                            {post.icon} {/* Exibe o ícone */}
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
