// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import ScrollToTop from './components/ScrollToTop';

import Layout from './components/Layout';
import ToTop from './components/ToTop';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Servicos from './pages/Servicos';
import Dp from './pages/Dp';
import Tp from './pages/Tp';
import Mp from './pages/Mp';
import Td from './pages/Td';
import Cp from './pages/Cp';
import Orcamento from './pages/Orcamento';
import Blog from './pages/Blog';
import Politica from './pages/Politica';
import NotFound from './pages/NotFound'; // Importe o componente NotFound
import Trocas from './pages/Trocas';
import Faq from './pages/Faq';
import TrabalheConosco from './pages/TrabalheConosco';
import Termos from './pages/Termos';
import './App.css';
import './GlobalStyles.css';
import './styles/global.css';
import './styles/components.css';



function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Defina suas rotas aqui */}
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
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/termos" element={<Termos />} />
          
          {/* Adicione outras rotas aqui conforme necessário */}
          {/* Rota para a página de serviços - exemplo de rota aninhada */}
      
          {/* Rota para a página 404 - deve ser a última rota */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToTop />
      </Layout>
    </Router>
  );
}

export default App;