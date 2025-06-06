import React from 'react';

function ServicosNav() {
  return (
    <section className="blog-highlights highlight-item">
      <h2 className='subtitulo-claro' translate='no'>Artigos do Blog</h2>
      <ul className="blog-links">
        <li>
          <a href="#retifica-de-motores">
            Retífica de Motores: Como Saber Quando Seu Motor Precisa de Reparo?
          </a>
        </li>
        <li>
          <a href="#processo-de-retifica">
            O Processo de Retífica: Como Funciona e Quais Ferramentas São Usadas?
          </a>
        </li>
        <li>
          <a href="#manutencao-de-motores">
            Manutenção de Motores: Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor
          </a>
        </li>
      </ul>
    </section>
  );
}

export default ServicosNav;
