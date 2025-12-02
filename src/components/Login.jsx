import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import DynamicHeader from './ui/DynamicHeader';
import Breadcrumbs from './ui/Breadcrumbs';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseOrcamentos";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("authToken", token); // 🔑 salva token
      setMessage("Login bem-sucedido! Redirecionando...");
      navigate("/painel-orcamentos"); // 🔒 redireciona
    } catch (err) {
      console.error("Erro no login:", err);
      let errorMsg = "Erro ao fazer login.";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMsg = "E-mail ou senha inválidos.";
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = "Muitas tentativas falhas. Tente novamente mais tarde.";
      }
      setMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-escuro">
      <DynamicHeader
        page="login"
        messages={[{ title: "Área Restrita", subtitle: "Acesso exclusivo para administradores." }]}
      />
      <Breadcrumbs />
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Login Admin</h2>
          <form onSubmit={handleSubmit} className="login-form" autoComplete="on">
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="username"
                className="login-input"
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="login-input"
              />
            </div>
            <button
              type="submit"
              className="login-submit"
              disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
            {message && <p className="login-feedback">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
