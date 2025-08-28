import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png';

/**
 * Componente de navegação principal.
 * Ele gerencia o menu responsivo, a visibilidade com base no scroll
 * e exibe links de navegação.
 * @param {Object} props - As propriedades do componente.
 * @param {boolean} props.isLoggedIn - O status de autenticação do usuário.
 */
function Navbar({ isLoggedIn }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navRef = useRef(null);
    const hamburgerRef = useRef(null);
    const location = useLocation();

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Função para fechar o menu ao clicar em um link
    const handleMenuClick = () => {
        setMenuOpen(false);
    };

    // Efeito para adicionar e remover o listener de scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.pageYOffset > 0);
        };

        window.addEventListener('scroll', handleScroll);
        // Chama a função uma vez para definir o estado inicial
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Efeito para fechar o menu ao mudar a rota
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Efeito para fechar o menu ao clicar fora dele
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
                <NavLink to="/" onClick={handleMenuClick}>
                    <img src={logo} alt="Logo" />
                </NavLink>
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
                        <NavLink to="/" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''} translate='no'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/servicos" onClick={handleMenuClick} className={({ isActive }) => isActive ? 'glow' : ''}>Serviços</NavLink>
                    </li>
                    <li>
                        {/* Lógica condicional para o link de Orçamentos */}
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
                    {/* Exibe o link de Login apenas se o usuário não estiver logado */}
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
