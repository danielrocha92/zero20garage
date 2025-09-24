import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import DynamicHeader from '../components/DynamicHeader';

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
      const res = await fetch("https://zero20-login-api.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        setMessage(`Erro ${res.status}: ${text}`);
        return;
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("authToken", data.token); // 🔑 salva token
        setMessage("Login bem-sucedido! Redirecionando...");
        navigate("/painel-orcamentos"); // 🔒 redireciona
      } else {
        setMessage("E-mail ou senha inválidos.");
      }
    } catch (err) {
      setMessage(`Erro de conexão: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <DynamicHeader
        page="login"
        messages={[{ title: "Área Restrita", subtitle: "Acesso exclusivo para administradores." }]}
      />
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
