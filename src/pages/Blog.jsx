import React from 'react';
import '../styles/Blog.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import BlogNav from '../components/BlogNav';
import BlogSectionRetifica from '../components/BlogSectionRetifica';
import BlogSectionProcesso from '../components/BlogSectionProcesso';
import BlogSectionManutencao from '../components/BlogSectionManutencao';

function Blog() {
  const messages = [
    {
      title: 'Blog',
      subtitle: 'Artigos e novidades sobre retífica de motores',
    },
    {
      title: 'Dicas e Truques',
      subtitle: 'Aprenda mais sobre manutenção e cuidados com seu motor',
    },
    {
      title: 'Notícias do Setor',
      subtitle: 'Fique por dentro das últimas tendências e tecnologias',
    },
  ];

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <div className="container-escuro">
      <section className="section-escuro">
        <h2>Blog ZER0 20 GARAGE™</h2>
        <p className="section-paragraph">
          Explore artigos, dicas e notícias sobre manutenção automotiva, retífica de motores e inovações do setor.
        </p>
        <BlogNav />
        <BlogSectionRetifica />
        <BlogSectionProcesso />
        <BlogSectionManutencao />
      </section>
    </div>
    </div>
  );
}

export default Blog;
