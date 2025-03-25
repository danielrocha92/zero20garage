import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

    // Função para monitorar o scroll
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    // Função para rolar até o topo
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

  return (
    <div className="layout">
      <Navbar />
      <main className="content">{children}</main>
      {/* Botão "Voltar ao Topo" */}
      {showScrollTop && (
        <button className="arrow-up" onClick={scrollToTop}>
          ☝️
        </button>
      )}
      <Footer />
    </div>
  );
};

export default Layout;