import React from 'react';
import './Blog.css';
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
    <div className="blog-page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <div className="container">
        <BlogNav />
        <BlogSectionRetifica />
        <BlogSectionProcesso />
        <BlogSectionManutencao />
      </div>
    </div>
  );
}

export default Blog;
