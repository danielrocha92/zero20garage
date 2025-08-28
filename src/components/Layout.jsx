import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import './Layout.css';

/**
 * Componente de layout principal que engloba o cabeçalho, conteúdo e rodapé,
 * além de gerenciar a transição de página com uma animação de carregamento.
 * @param {Object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo a ser renderizado entre o cabeçalho e o rodapé.
 */
const Layout = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    // Estado para rastrear o status de autenticação e forçar a re-renderização do cabeçalho
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Efeito para gerenciar a animação de transição e o estado de carregamento
    useEffect(() => {
        setLoading(true);
        setFadeOut(false);

        const fadeTimer = setTimeout(() => setFadeOut(true), 2000); // Inicia fade-out
        const timer = setTimeout(() => setLoading(false), 2500); // Finaliza loading

        return () => {
            clearTimeout(timer);
            clearTimeout(fadeTimer);
        };
    }, [location.pathname]);

    // Efeito para verificar o estado de autenticação no carregamento e em mudanças no localStorage
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('authToken');
            setIsLoggedIn(!!token); // !! converte para booleano
        };

        // Verifica o estado inicial
        checkLoginStatus();

        // Adiciona um listener para o evento de armazenamento para sincronizar o estado entre as abas
        window.addEventListener('storage', checkLoginStatus);

        // Retorna uma função de limpeza para remover o listener
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    // Rotas onde o layout não deve ser exibido (se aplicável)
    const noLayoutRoutes = ['/gerar-pdf', '/not-found'];
    const showLayout = !noLayoutRoutes.includes(location.pathname);

    return (
        <div translate='no' className="layout">
            {/* O Navbar agora recebe o estado de login */}
            {showLayout && <Navbar isLoggedIn={isLoggedIn} />}
            <main className="content">
                {loading && (
                    <div className={`page-transition ${fadeOut ? 'fade-out' : ''}`}>
                        <div className="lottie-wrapper">
                            <DotLottieReact
                                src="https://lottie.host/9a3cc803-f9e3-448d-8648-42066290a6e2/46Wa3QqE3a.lottie"
                                autoplay
                                loop
                                speed={2.5}
                            />
                        </div>
                    </div>
                )}
                {!loading && children}
            </main>
            {!loading && showLayout && <Footer />}
            <div className={`overlay ${loading ? 'visible' : ''}`}></div>
            <WhatsAppButton />
        </div>
    );
};

export default Layout;
