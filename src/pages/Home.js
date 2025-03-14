import React from 'react';
import './Home.css';
import bannerImage from '../assets/images/banner.jpg';

function Home() {
  return (
    <div className="home">
      <div className="home-banner" style={{ backgroundImage: `url(${bannerImage})` }}></div>
      <div className="home-content">
        <header className="home-header">
          <h1>𝗭𝗘𝗥𝗢𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™</h1>
          <p>Oficina Mecânica e Retífica de Motores Nacionais e Importados</p>
        </header>
        <section className="home">
          {/* Conteúdo adicional */}
        </section>
      </div>
    </div>
  );
}

export default Home;