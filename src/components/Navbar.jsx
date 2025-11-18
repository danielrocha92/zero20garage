import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const logo = "https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429492/logo_mqvkvh.png";

function Navbar({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((o) => !o);
  const handleMenuClick = () => setMenuOpen(false);

  // Muda estilo da navbar ao scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 0);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Fecha menu ao clicar fora da navbar
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  // Evita scroll do body quando menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? "scrolled-down" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <NavLink to="/" onClick={handleMenuClick}>
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Links Desktop */}
      <div className={`menu ${menuOpen ? "open" : ""}`} id="site-menu">
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              onClick={handleMenuClick}
              className={({ isActive }) => (isActive ? "glow" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/servicos"
              onClick={handleMenuClick}
              className={({ isActive }) => (isActive ? "glow" : "")}
            >
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink
              to={isLoggedIn ? "/painel-orcamentos" : "/orcamento"}
              onClick={handleMenuClick}
              className={({ isActive }) => (isActive ? "glow" : "")}
            >
              Orçamentos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contato"
              onClick={handleMenuClick}
              className={({ isActive }) => (isActive ? "glow" : "")}
            >
              Contato
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sobre"
              onClick={handleMenuClick}
              className={({ isActive }) => (isActive ? "glow" : "")}
            >
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              onClick={handleMenuClick}
              className={({ isActive }) => (isActive ? "glow" : "")}
            >
              Blog
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/login"
                onClick={handleMenuClick}
                className={({ isActive }) => (isActive ? "glow" : "")}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Botão Hambúrguer (aparece só no mobile) */}
      <button
        className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
        onClick={toggleMenu}
        aria-label="Alternar menu"
        aria-controls="site-menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
