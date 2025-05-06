import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ToTop.css';

function ToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
      {isVisible && (
        <button onClick={scrollToTop} aria-label="Voltar ao topo">
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default ToTop;