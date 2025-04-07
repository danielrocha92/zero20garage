// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Importe o arquivo de estilos

function NotFound() {
  return (
    <div className="not-found-container">
      <section className="info-section">
        <div className='info-section'>
          <div className='highlight-item'>
            <h1>
              404
              </h1>
                <p className="not-found-message">Página não encontrada</p>
                <p className="not-found-description">
                  A página que você tentou acessar não existe ou foi movida.
                  Por favor, verifique a URL ou retorne para a página inicial.
                </p>
                <Link to="/" className="not-found-link">
                  Voltar para a página inicial
                </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;