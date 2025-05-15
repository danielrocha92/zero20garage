import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos === 0) {
        setScrolled(false); // No topo: centraliza e expande
      } else if (currentScrollPos > prevScrollPos) {
        setScrolled(true); // Rolando para baixo: encolhe e fixa à esquerda
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    setMenuOpen(false);
    setScrolled(false); // Ao trocar de rota: volta à posição inicial
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled-down' : ''}`}>
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
          <li><Link to="/blog" onClick={handleMenuClick} translate="no">Blog</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
