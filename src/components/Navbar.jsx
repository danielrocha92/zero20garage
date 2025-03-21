import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Certifique-se de que o caminho está corretorta o arquivo global de estilos
import logo from '../assets/logo.png'; // Certifique-se de que o caminho para a imagem está correto

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

    // Função para fechar o menu ao clicar em um item
    const handleMenuClick = () => {
      setMenuOpen(false);
    };

  return (
    <nav className="hamburger">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Logo" className="logo-image" /></Link>
      </div>
      {/* Botão "Hambúrguer" */}
      <button className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      {/* Menu Responsivo */}
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/" onClick={handleMenuClick}>Home</Link></li>
          <li><Link to="/servicos" onClick={handleMenuClick}>Serviços</Link></li>
          <li><Link to="/orcamento" onClick={handleMenuClick}>Orçamentos</Link></li>
          <li><Link to="/contato" onClick={handleMenuClick}>Contato</Link></li>
          <li><Link to="/sobre" onClick={handleMenuClick}>Sobre</Link></li>
          <li><Link to="/blog" onClick={handleMenuClick}>Blog</Link></li>
        </ul>
      </nav>
    </nav>
  );
}

export default Navbar;