import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../components/Navbar.css';
import logo from '../assets/images/logo.png'; // Certifique-se de que o caminho está correto

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header'); // Selecione sua tag <header>
      const headerHeight = header ? header.offsetHeight : 0;

      if (window.scrollY > headerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false); // Fecha o menu ao mudar de rota
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/" onClick={handleMenuClick}>Home</Link></li>
          <li><Link to="/servicos" onClick={handleMenuClick}>Serviços</Link></li>
          <li><Link to="/orcamento" onClick={handleMenuClick}>Orçamentos</Link></li>
          <li><Link to="/contato" onClick={handleMenuClick}>Contato</Link></li>
          <li><Link to="/sobre" onClick={handleMenuClick}>Sobre</Link></li>
          <li><Link to="/blog" onClick={handleMenuClick}>Blog</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;