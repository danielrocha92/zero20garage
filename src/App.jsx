import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'font-awesome/css/font-awesome.min.css';

import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';

import PainelOrcamentos from './components/PainelOrcamentos';
import Login from './components/Login';

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
import CustoRetifica from './pages/blog/CustoRetifica';
import ManutencaoDeMotores from './pages/blog/ManutencaoDeMotores';
import RetificaParcialOuCompleta from './pages/blog/RetificaParcialOuCompleta';
import SinaisRetifica from './pages/blog/SinaisRetifica';
import TrocarMotor from './pages/blog/TrocarMotor';
import ValeAPenaRetificar from './pages/blog/ValeAPenaRetificar';

import Politica from './pages/footer/Politica';
import NotFound from './pages/footer/NotFound';
import Trocas from './pages/footer/Trocas';
import Faq from './pages/footer/Faq';
import TrabalheConosco from './pages/footer/TrabalheConosco';
import Termos from './pages/footer/Termos';

// Importa o novo componente para a geração de PDF
import GerarPdfPage from './components/GerarPdfPage';

import './App.css';
import './GlobalStyles.css';

/**
 * Componente PrivateRoute
 * Garante que apenas usuários autenticados possam acessar as rotas protegidas.
 * Verifica a existência de um token de autenticação no localStorage.
 * @param {Object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os componentes filhos a serem renderizados se o usuário estiver autenticado.
 */
function PrivateRoute({ children }) {
  // Apenas verifica se o token existe, não o seu valor
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
}

/**
 * Componente AnimatedRoutes
 * Gerencia as rotas do aplicativo com transições de página usando Framer Motion.
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageTransition />}>
        <Routes location={location} key={location.pathname}>

          {/* Rotas de Autenticação e Protegidas */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/painel-orcamentos"
            element={
              <PrivateRoute>
                <PainelOrcamentos />
              </PrivateRoute>
            }
          />

          {/* Rota para o formulário de orçamento público */}
          <Route path="/orcamento" element={<Orcamento />} />

          {/* NOVA ROTA para a página de geração de PDF */}
          <Route path="/gerar-pdf" element={<GerarPdfPage />} />

          {/* Demais rotas públicas */}
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

          {/* Rotas de Rodapé */}
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

/**
 * Componente principal App
 * Configura o roteamento e o layout geral do aplicativo.
 */
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