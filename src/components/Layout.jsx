import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">{children}</main>
      <footer className="footer">
        <p>© 2025 Zero20 Garage. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;