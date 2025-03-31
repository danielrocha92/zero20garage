// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Servicos from './pages/Servicos';
import Orcamento from './pages/Orcamento';
import Blog from './pages/Blog';
import Layout from './components/Layout';
import ToTop from './components/ToTop';
import ManutencaoPreventiva from './pages/ManutencaoPreventiva';
import Diagnostico from './pages/Diagnostico'; // Importe o componente Diagnostico


import './App.css';
import './GlobalStyles.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/servico/manutencao-preventiva" element={<ManutencaoPreventiva />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
        </Routes>
        <ToTop />
      </Layout>
    </Router>
  );
}

export default App;