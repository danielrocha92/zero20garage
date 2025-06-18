// TrabalheConosco.jsx
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

import '../../styles/Institucional.css'; // Estilos compartilhados

function TrabalheConosco() {
  const messages = [
    {
      title: 'Junte-se à Nossa Equipe',
      subtitle: 'Buscamos profissionais motivados, criativos e que valorizem um ambiente colaborativo.',
    },
    {
      title: 'Faça Parte da Zero 20 Garage',
      subtitle: 'Envie seu currículo e venha crescer com a gente!',
    },
  ];

  return (
    <div className="institucional-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="institucional-container">
        <section className="institucional-section">
          <h2 className="institucional-title">Trabalhe Conosco</h2>

          <p className="institucional-paragraph" translate='no'>
            Se você é apaixonado por mecânica e deseja fazer parte de uma equipe que valoriza a excelência, a <strong>Zero 20 Garage</strong> está sempre em busca de novos talentos que buscam desafios e evolução constante. Se você quer fazer parte de uma equipe apaixonada por excelência automotiva, envie seu currículo!
          </p>

          <p className="institucional-paragraph" translate='no'>
            Para candidatar-se, envie um e-mail para: <a href="mailto:contato@zero20garage.com.br">contato@zero20garage.com.br</a>
          </p>

          <p className="institucional-paragraph">
            Acompanhe também nossas atualizações de vagas e novidades pelo nosso LinkedIn:
          </p>

          <a
            href="https://www.linkedin.com/company/zero-20-garage/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-button"
          >
            <FaLinkedin size={20} style={{ marginRight: '0.5rem' }} />
            Visite nosso LinkedIn
          </a>
        </section>
      </div>
    </div>
  );
}

export default TrabalheConosco;
