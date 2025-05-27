import React, { useState, useEffect } from 'react';
import './DynamicHeader.css';

import headerDefault from '../assets/images/header.jpg';
import home from '../assets/images/home.jpg';
import sobre from '../assets/images/sobre.jpg';
import servicos from '../assets/images/servicos.jpg';
import orcamento from '../assets/images/orcamento.jpg';
import contato from '../assets/images/contato.jpg';
import blog from '../assets/images/blog-header.jpg';
import footer from '../assets/images/footer.jpg';

const imageMap = {
  home,
  sobre,
  servicos,
  orcamento,
  contato,
  blog,
  footer,
};

function DynamicHeader({ messages, intervalTime = 4500, page = '' }) {
  const [headerContent, setHeaderContent] = useState(messages[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % messages.length;
        setHeaderContent(messages[index]);
        setFade(true);
      }, 500);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [messages, intervalTime]);

  const backgroundImage = imageMap[page] || headerDefault;

  return (
    <header
      className={`header ${page}`}
      style={{
        background: `linear-gradient(rgba(0,0,0,0.89), rgba(0,0,0,0.753)), url(${backgroundImage}) center/cover no-repeat`,
      }}
    >
      <h1 className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.title}</h1>
      <p className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.subtitle}</p>
    </header>
  );
}

export default DynamicHeader;
