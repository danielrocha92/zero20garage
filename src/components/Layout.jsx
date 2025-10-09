import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Controla o loading em cada mudança de rota
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  useEffect(() => {
    setLoading(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => setFadeOut(true), 2000); // fade-out da animação
    const timer = setTimeout(() => setLoading(false), 2500); // finaliza loading

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [location.pathname]);

  // Verifica login e sincroniza entre abas
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const noLayoutRoutes = ['/gerar-pdf', '/not-found'];
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <div translate="no" className="layout">
      {/* Navbar sempre visível */}
      {showLayout && <Navbar isLoggedIn={isLoggedIn} />}

      <main className="content">
        {/* Conteúdo carregando */}
        {loading && (
          <div className={`page-transition ${fadeOut ? 'fade-out' : ''}`}>
            <div className="lottie-wrapper">
              <DotLottieReact
                src="https://lottie.host/9a3cc803-f9e3-448d-8648-42066290a6e2/46Wa3QqE3a.lottie"
                autoplay
                loop
                speed={2.5}
              />
            </div>
          </div>
        )}

        {/* Conteúdo real */}
        {children}
      </main>

      {/* Footer sempre visível depois do carregamento */}
      {!loading && showLayout && <Footer />}

      {/* Overlay para impedir interação durante o loading */}
      <div className={`overlay ${loading ? 'visible' : ''}`}></div>

      <WhatsAppButton />
    </div>
  );
};

export default Layout;
