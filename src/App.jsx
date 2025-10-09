import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css';

import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import ScrollToTopButton from './components/ScrollToTopButton';

import PainelOrcamentos from './components/orcamento/PainelOrcamentos';
import Login from './components/Login';

import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Contato from './pages/contato/Contato';
import Servicos from './pages/servicos/Servicos';
import Mp from './pages/servicos/Mp';
import Dp from './pages/servicos/Dp';
import Tp from './pages/servicos/Tp';
import Td from './pages/servicos/Td';
import Cp from './pages/servicos/Cp';

import Diagnostico from './pages/home/Diagnostico';
import Desmontagem from './pages/home/Desmontagem';
import Usinagem from './pages/home/Usinagem';
import MontagemTeste from './pages/home/MontagemTeste';

import Orcamento from './pages/orcamento/Orcamento';
import GerarPdfPage from './components/GerarPdfPage';

import Blog from './pages/blog/Blog';
import SinaisRetifica from './pages/blog/SinaisRetifica';
import CustoRetifica from './pages/blog/CustoRetifica';
import ManutencaoDeMotores from './pages/blog/ManutencaoDeMotores';
import RetificaParcialOuCompleta from './pages/blog/RetificaParcialOuCompleta';
import TrocarMotor from './pages/blog/TrocarMotor';
import ValeAPenaRetificar from './pages/blog/ValeAPenaRetificar';

import Politica from './pages/footer/Politica';
import NotFound from './pages/footer/NotFound';
import Trocas from './pages/footer/Trocas';
import Faq from './pages/footer/Faq';
import TrabalheConosco from './pages/footer/TrabalheConosco';
import Termos from './pages/footer/Termos';

import './App.css';
import './GlobalStyles.css';

// ----------------------
// PrivateRoute
// ----------------------
function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
}

// ----------------------
// AnimatedRoutes
// ----------------------
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageTransition />}>
        <Routes location={location} key={location.pathname}>

          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Contato" element={<Contato />} />
          <Route path="/Servicos" element={<Servicos />} />
          <Route path="/Servicos/Mp" element={<Mp />} />
          <Route path="/Servicos/Dp" element={<Dp />} />
          <Route path="/Servicos/Tp" element={<Tp />} />
          <Route path="/Servicos/Td" element={<Td />} />
          <Route path="/Servicos/Cp" element={<Cp />} />
          <Route path="/Home/Diagnostico" element={<Diagnostico />} />
          <Route path="/Home/Desmontagem" element={<Desmontagem />} />
          <Route path="/Home/Usinagem" element={<Usinagem />} />
          <Route path="/Home/MontagemTeste" element={<MontagemTeste />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Blog/SinaisRetifica" element={<SinaisRetifica />} />
          <Route path="/Blog/CustoRetifica" element={<CustoRetifica />} />
          <Route path="/Blog/ManutencaoDeMotores" element={<ManutencaoDeMotores />} />
          <Route path="/Blog/RetificaParcialOuCompleta" element={<RetificaParcialOuCompleta />} />
          <Route path="/Blog/TrocarMotor" element={<TrocarMotor />} />
          <Route path="/Blog/ValeAPenaRetificar" element={<ValeAPenaRetificar />} />
          <Route path="/Politica" element={<Politica />} />
          <Route path="/Trocas" element={<Trocas />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/Termos" element={<Termos />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/gerar-pdf" element={<GerarPdfPage />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/painel-orcamentos"
            element={
              <PrivateRoute>
                <PainelOrcamentos />
              </PrivateRoute>
            }
          />

          {/* Fallback para rotas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

// ----------------------
// App
// ----------------------
function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
        <ScrollToTopButton />
      </Layout>
    </Router>
  );
}

export default App;
