import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Contato from '../pages/Contato';
import Servicos from '../pages/Servicos';
import Dp from '../pages/Dp';
import Tp from '../pages/Tp';
import Mp from '../pages/Mp';
import Td from '../pages/Td';
import Cp from '../pages/Cp';
import Orcamento from '../pages/Orcamento';
import Blog from '../pages/Blog';
import Politica from '../pages/Politica';
import Trocas from '../pages/Trocas';
import Faq from '../pages/FAQ';
import Atendimento from '../pages/Atendimento';
import TrabalheConosco from '../pages/TrabalheConosco';
import MapaDoSite from '../pages/MapaDoSite';
import Termos from '../pages/Termos';
import NotFound from '../pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/mp" element={<Mp />} />
          <Route path="/dp" element={<Dp />} />
          <Route path="/tp" element={<Tp />} />
          <Route path="/td" element={<Td />} />
          <Route path="/cp" element={<Cp />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/politica" element={<Politica />} />
          <Route path="/trocas" element={<Trocas />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/mapa-do-site" element={<MapaDoSite />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRoutes;