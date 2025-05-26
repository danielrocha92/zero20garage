// src/components/Layout.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';
import WhatsAppButton from './WhatsAppButton';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Tempo da animação (ajustável)

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        {loading ? <PageTransition /> : children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
