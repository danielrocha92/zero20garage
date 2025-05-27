import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Instale: npm install react-icons

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar botão ao rolar
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
