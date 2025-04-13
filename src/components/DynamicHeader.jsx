import React, { useState, useEffect } from 'react';
import './DynamicHeader.css';

function DynamicHeader({ messages, intervalTime = 4500 }) {
  const [headerContent, setHeaderContent] = useState(messages[0]);
  const [fade, setFade] = useState(true); // Inicialmente, o conteúdo aparece

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFade(false); // Inicia o fade out
      setTimeout(() => {
        index = (index + 1) % messages.length;
        setHeaderContent(messages[index]);
        setFade(true); // Inicia o fade in
      }, 500); // Tempo de transição (ajuste conforme necessário)
    }, intervalTime);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [messages, intervalTime]);

  return (
    <header className="header">
      <h1 className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.title}</h1>
      <p className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.subtitle}</p>
    </header>
  );
}

export default DynamicHeader;