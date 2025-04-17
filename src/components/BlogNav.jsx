import React from 'react';

function BlogNav() {
  return (
    <section className="content-section">
      <h1 className="section-title" translate="no">Artigos do Blog</h1>
      <ul className="links">
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

export default BlogNav;
