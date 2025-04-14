import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Rola para o topo da página
  }, [pathname]); // Executa sempre que o caminho da URL mudar

  return null; // Este componente não renderiza nada
}

export default ScrollToTop;