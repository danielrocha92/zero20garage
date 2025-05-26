// App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css';

import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';


import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Contato from './pages/contato/Contato';
import Servicos from './pages/servicos/Servicos';
import Dp from './pages/servicos/Dp';
import Tp from './pages/servicos/Tp';
import Mp from './pages/servicos/Mp';
import Td from './pages/servicos/Td';
import Cp from './pages/servicos/Cp';

import Diagnostico from './pages/home/Diagnostico';
import Desmontagem from './pages/home/Desmontagem';
import Usinagem from './pages/home/Usinagem';
import MontagemTeste from './pages/home/MontagemTeste';

import Orcamento from './pages/orcamento/Orcamento';
import Blog from './pages/blog/Blog';
import SinaisRetifica from './pages/blog/SinaisRetifica';
import CustoRetifica from './pages/blog/CustoRetifica';
import ManutencaoDeMotores from './pages/blog/ManutencaoDeMotores';
import RetificaParcialOuCompleta from './pages/blog/RetificaParcialOuCompleta';
import ValeAPenaRetificar from './pages/blog/ValeAPenaRetificar';
import Politica from './pages/footer/Politica';
import NotFound from './pages/footer/NotFound';
import Trocas from './pages/footer/Trocas';
import Faq from './pages/footer/Faq';
import TrabalheConosco from './pages/footer/TrabalheConosco';
import Termos from './pages/footer/Termos';

import './App.css';
import './GlobalStyles.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageTransition />}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/Sobre" element={<Sobre />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Servicos" element={<Servicos />} />
        <Route path="/Mp" element={<Mp />} />
        <Route path="/Dp" element={<Dp />} />
        <Route path="/Tp" element={<Tp />} />
        <Route path="/Td" element={<Td />} />
        <Route path="/Cp" element={<Cp />} />

        {/* ✅ Novas rotas explicativas */}
        <Route path="/Home/diagnostico" element={<Diagnostico />} />
        <Route path="/Home/desmontagem" element={<Desmontagem />} />
        <Route path="/Home/usinagem" element={<Usinagem />} />
        <Route path="/Home/montagemteste" element={<MontagemTeste />} />

        <Route path="/Orcamento" element={<Orcamento />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/sinaisretifica" element={<SinaisRetifica />} />
        <Route path="/custoretifica" element={<CustoRetifica />} />
        <Route path="/manutencao-de-motores" element={<ManutencaoDeMotores />} />
        <Route path="/retifica-parcial-ou-completa" element={<RetificaParcialOuCompleta />} />
        <Route path="/retifica-ou-troca" element={<ValeAPenaRetificar />} />
        <Route path="/Politica" element={<Politica />} />
        <Route path="/Trocas" element={<Trocas />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/Termos" element={<Termos />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
        <ScrollToTop />
        <ScrollToTopButton />
      </Layout>
    </Router>
  );
}

export default App;