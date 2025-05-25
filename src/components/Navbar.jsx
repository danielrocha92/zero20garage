import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled-down' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <button
        ref={hamburgerRef}
        className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
        onClick={toggleMenu}
        aria-label="Alternar menu de navegação"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li>
            <Link
              to="/"
              onClick={handleMenuClick}
              className={location.pathname === '/' ? 'glow' : ''}
              translate='no'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/servicos"
              onClick={handleMenuClick}
              className={location.pathname === '/servicos' ? 'glow' : ''}
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link
              to="/orcamento"
              onClick={handleMenuClick}
              className={location.pathname === '/orcamento' ? 'glow' : ''}
            >
              Orçamentos
            </Link>
          </li>
          <li>
            <Link
              to="/contato"
              onClick={handleMenuClick}
              className={location.pathname === '/contato' ? 'glow' : ''}
            >
              Contato
            </Link>
          </li>
          <li>
            <Link
              to="/sobre"
              onClick={handleMenuClick}
              className={location.pathname === '/sobre' ? 'glow' : ''}
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              onClick={handleMenuClick}
              className={location.pathname === '/blog' ? 'glow' : ''}
              translate="no"
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
