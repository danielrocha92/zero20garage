import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver autenticado, renderize os componentes filhos da rota
  return children ? children : <Outlet />;
};

export default ProtectedRoute;