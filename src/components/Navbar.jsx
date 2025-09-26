// Navbar.js - Nenhuma alteração necessária, pois o JSX está correto.
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';

/**
 * Componente de navegação principal.
 */
function Navbar({ isLoggedIn }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navRef = useRef(null);
    const hamburgerRef = useRef(null);
    const location = useLocation();

    // ... (Funções e Efeitos de Scroll/Menu/ClickOutside) ...
    const toggleMenu = () => { setMenuOpen(!menuOpen); };
    const handleMenuClick = () => { setMenuOpen(false); };

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.pageYOffset > 0); };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => { window.removeEventListener('scroll', handleScroll); };
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
        <nav
            ref={navRef}
            className={`main-navbar ${scrolled ? 'scrolled-down' : ''}`} // Mudança de 'navbar' para 'main-navbar' para especificidade
            aria-label="Navegação Principal" // ID não é necessário aqui
        >
            <div className="navbar-logo">
                <NavLink to="/" onClick={handleMenuClick}>
                    <img src={logo} alt="Logo da 020 Garage" />
                </NavLink>
            </div>

            <button
                ref={hamburgerRef}
                className={`hamburger-menu ${menuOpen ? 'hamburger--open' : ''}`} // Mudança de 'hamburger' para 'hamburger-menu'
                onClick={toggleMenu}
                aria-label="Alternar menu de navegação"
                aria-controls="main-menu-list" // Liga o botão à lista de links
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`menu-wrapper ${menuOpen ? 'open' : ''}`}> {/* Mudança de 'menu' para 'menu-wrapper' */}
                <ul id="main-menu-list" className="navbar-links"> {/* Adicionado ID */}
                    <li>
                        <NavLink to="/" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''} translate='no'>Home</NavLink>
                    </li>
                    {/* ... (Outros links) ... */}
                    <li>
                        <NavLink to="/servicos" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''}>Serviços</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={isLoggedIn ? "/painel-orcamentos" : "/orcamento"}
                            onClick={handleMenuClick}
                            className={({ isActive }) => isActive ? 'glow' : ''}
                        >
                            Orçamentos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contato" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''}>Contato</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sobre" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''}>Sobre</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''} translate="no">Blog</NavLink>
                    </li>
                    {!isLoggedIn && (
                        <li>
                            <NavLink to="/login" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''}>Login</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;