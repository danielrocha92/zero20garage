// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

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
          <Route path="/mp" element={<Mp />} />
          <Route path="/dp" element={<Dp />} />
          <Route path="/tp" element={<Tp />} />
          <Route path="/td" element={<Td />} />
          <Route path="/cp" element={<Cp />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <ToTop />
      </Layout>
    </Router>
  );
}

export default App;