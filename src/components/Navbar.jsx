import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa o arquivo global de estilos
import logo from '../assets/images/logo.png'; // Certifique-se de que o caminho está correto

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset); // Rastreia a posição anterior
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
      const visible = prevScrollPos > currentScrollPos; // Mostra a navbar se estiver rolando para cima

      setScrolled(!visible); // Inverte o estado para mostrar/ocultar a navbar
      setPrevScrollPos(currentScrollPos); // Atualiza a posição anterior
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]); // Adiciona prevScrollPos como dependência

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled-down' : ''}`}> {/* Altera a classe para 'scrolled-down' */}
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