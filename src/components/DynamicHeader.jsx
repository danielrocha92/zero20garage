import React, { useState, useEffect } from 'react';
import './DynamicHeader.css';

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

  const backgroundClass = page ? `bg-${page}` : 'bg-default';

  return (
    <header className={`header ${backgroundClass}`}>
      <div className="message-container">
        <h1 className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.title}</h1>
        <p className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.subtitle}</p>
      </div>
    </header>
  );
}

export default DynamicHeader;
