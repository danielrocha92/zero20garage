import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// import 'font-awesome/css/font-awesome.min.css';

import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import ScrollToTopButton from './components/ScrollToTopButton';

import './App.css';
import './GlobalStyles.css';

const PainelOrcamentos = lazy(() => import('./components/orcamento/PainelOrcamentos'));
const Login = lazy(() => import('./components/Login'));

const Home = lazy(() => import('./pages/home/Home'));
const Sobre = lazy(() => import('./pages/sobre/Sobre'));
const Contato = lazy(() => import('./pages/contato/Contato'));
const Servicos = lazy(() => import('./pages/servicos/Servicos'));
const Mp = lazy(() => import('./pages/servicos/Mp'));
const Dp = lazy(() => import('./pages/servicos/Dp'));
const Tp = lazy(() => import('./pages/servicos/Tp'));
const Td = lazy(() => import('./pages/servicos/Td'));
const Cp = lazy(() => import('./pages/servicos/Cp'));

const Diagnostico = lazy(() => import('./pages/home/Diagnostico'));
const Desmontagem = lazy(() => import('./pages/home/Desmontagem'));
const Usinagem = lazy(() => import('./pages/home/Usinagem'));
const MontagemTeste = lazy(() => import('./pages/home/MontagemTeste'));

const Orcamento = lazy(() => import('./pages/orcamento/Orcamento'));
const GerarPdfPage = lazy(() => import('./components/GerarPdfPage'));

const Blog = lazy(() => import('./pages/blog/Blog'));
const SinaisRetifica = lazy(() => import('./pages/blog/SinaisRetifica'));
const CustoRetifica = lazy(() => import('./pages/blog/CustoRetifica'));
const ManutencaoDeMotores = lazy(() => import('./pages/blog/ManutencaoDeMotores'));
const RetificaParcialOuCompleta = lazy(() => import('./pages/blog/RetificaParcialOuCompleta'));
const TrocarMotor = lazy(() => import('./pages/blog/TrocarMotor'));
const ValeAPenaRetificar = lazy(() => import('./pages/blog/ValeAPenaRetificar'));

const Politica = lazy(() => import('./pages/footer/Politica'));
const NotFound = lazy(() => import('./pages/footer/NotFound'));
const Trocas = lazy(() => import('./pages/footer/Trocas'));
const Faq = lazy(() => import('./pages/footer/Faq'));
const TrabalheConosco = lazy(() => import('./pages/footer/TrabalheConosco'));
const Termos = lazy(() => import('./pages/footer/Termos'));



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
