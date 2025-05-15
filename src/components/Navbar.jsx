import React, { useState, useEffect, useRef } from 'react'; // Importe useRef
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Crie refs para a navbar e o botão hambúrguer
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    // Feche o menu quando um link for clicado
    setMenuOpen(false);
  };

  // Efeito para lidar com a rolagem
  useEffect(() => {
    const handleScroll = () => {
      // Defina scrolled como true se a página for rolada para baixo mais de 0px
      setScrolled(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Verificação inicial caso a página seja carregada com rolagem
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Array de dependência vazio significa que este efeito roda uma vez no mount

  // Efeito para fechar o menu na troca de rota
  useEffect(() => {
    setMenuOpen(false);
    // Redefinir o estado de rolagem ao trocar de rota também pode ser desejável, dependendo do design
    // setScrolled(false); // Opcional: descomente se quiser que o cabeçalho expanda em cada novo carregamento de página
  }, [location]);

  // Efeito para fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o menu estiver aberto e o clique for fora da nav E fora do botão hambúrguer
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current && // Verifique se a ref existe
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    // Adicione o listener de evento apenas quando o menu estiver aberto
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Limpe o listener de evento
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]); // Re-execute o efeito quando o estado de menuOpen mudar

  return (
    // Anexe a ref ao elemento nav
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled-down' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      {/* Anexe a ref ao botão hambúrguer e adicione a classe para animação */}
      <button
        ref={hamburgerRef}
        className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
        onClick={toggleMenu}
        aria-label="Alternar menu de navegação" // Adicione um rótulo de acessibilidade
      >
        {/* Linhas do hambúrguer - estas serão estilizadas no CSS */}
        <span></span>
        <span></span>
        <span></span>
      </button>
      {/* A div 'menu' contém os links e controla sua exibição no mobile */}
      {/* Aplicamos condicionalmente a classe 'open' para estilização */}
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul className="navbar-links">
          {/* Aplique a prevenção de tradução aos links, se necessário (por exemplo, para 'Blog') */}
          <li><Link to="/" onClick={handleMenuClick}>Home</Link></li>
          <li><Link to="/servicos" onClick={handleMenuClick}>Serviços</Link></li>
          <li><Link to="/orcamento" onClick={handleMenuClick}>Orçamentos</Link></li>
          <li><Link to="/contato" onClick={handleMenuClick}>Contato</Link></li>
          <li><Link to="/sobre" onClick={handleMenuClick}>Sobre</Link></li>
          {/* Exemplo com translate="no" para o link do Blog */}
          <li><Link to="/blog" onClick={handleMenuClick} translate="no">Blog</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;