import React from 'react';
import './Home.css';
import bannerImage from '../assets/images/banner.jpg';

// ...existing code...

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>𝗭𝗘𝗥𝗢𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™</h1>
        <p>Oficina Mecânica e Retífica de Motores Nacionais e Importados </p>
      </header>
      <div className="home-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        {/* Conteúdo do banner */}
      </div>
      <section className="home-banner">
        <img src="https://www.canaldapeca.com.br/blog/wp-content/uploads/2016/08/Ret%C3%ADfica-no-Motor-Veja-os-Procedimentos.jpg" alt="Banner" />
      </section>
    </div>
  );
}

export default Home;