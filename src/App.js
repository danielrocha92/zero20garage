import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Servicos from './pages/Servicos';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';
import './App.css';
import './pages/Home.css';
import './pages/Sobre.css';
import './pages/Contato.css';
import './pages/Servicos.css';
import './pages/Blog.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;