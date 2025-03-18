import React, { useState, useEffect } from 'react';
import './DynamicHeader.css';

function DynamicHeader({ messages, intervalTime = 5000 }) {
  const [headerContent, setHeaderContent] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setHeaderContent(messages[index]);
    }, intervalTime);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [messages, intervalTime]);

  return (
    <header className="header">
      <h1 className="fade">{headerContent.title}</h1>
      <p className="fade">{headerContent.subtitle}</p>
    </header>
  );
}

export default DynamicHeader;