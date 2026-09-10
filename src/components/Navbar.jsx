import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/Navbar.css";

const logo = "https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto,w_200,h_200,c_limit/v1763429492/logo_mqvkvh.png";

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
    <nav ref={navRef} className={`navbar ${scrolled ? "scrolled-down" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <NavLink to="/" onClick={handleMenuClick} aria-label="Página Inicial">
          <img src={logo} alt="Logo Zero 20 Garage" width="96" height="96" decoding="async" />
        </NavLink>
      </div>

      {/* Links Desktop/Mobile */}
      <div className={`navbar-menu-container ${menuOpen ? "open" : ""}`} id="site-menu">
        <ul className="navbar-links">
          <li>
            <NavLink to="/" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/servicos" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink to="/oleos-filtros" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Óleos e Filtros
            </NavLink>
          </li>
          <li>
            <NavLink to={isLoggedIn ? "/painel-orcamentos" : "/orcamento"} onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Orçamentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Contato
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
              Blog
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" onClick={handleMenuClick} className={({ isActive }) => (isActive ? "glow" : "")}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Botão Hambúrguer (Mobile) */}
      <button
        className="mobile-toggle-btn"
        onClick={toggleMenu}
        aria-label="Alternar menu"
        aria-controls="site-menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={32} color="#fff" /> : <Menu size={32} color="#fff" />}
      </button>
    </nav>
  );
}

export default Navbar;
