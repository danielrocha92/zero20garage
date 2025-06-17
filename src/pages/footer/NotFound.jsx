// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import './NotFound.css';

const NotFound = () => {
  const messages = [
    {
      title: 'Erro 404',
      subtitle: 'A página que você está tentando acessar não foi encontrada.',
    },
  ];

  return (
    <div className="not-found-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />
      <div className="not-found-container">
        <section className="not-found-section">
          <h1 className="not-found-title">404</h1>
          <p className="not-found-message">Página não encontrada</p>
          <p className="not-found-description">
            A página que você tentou acessar não existe ou foi movida. Por favor, verifique a URL ou retorne para a página inicial.
          </p>
          <Link to="/" className="not-found-link">
            Voltar para a página inicial
          </Link>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
