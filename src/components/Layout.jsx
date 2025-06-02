// src/components/Layout.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => setFadeOut(true), 2000); // Inicia fade-out
    const timer = setTimeout(() => setLoading(false), 2500);    // Finaliza loading

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navbar />
      <main className="content">
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
        {!loading && children}
      </main>
      {!loading && <Footer />}
      <div className={`overlay ${loading ? 'visible' : ''}`}></div>
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
