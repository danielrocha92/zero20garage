// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [erro, setErro] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("https://zero20garage-login.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("🔎 Resposta bruta:", res);

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Erro HTTP:", res.status, text);
        setErro(`Erro ${res.status}: ${text}`);
        return;
      }

      const data = await res.json();
      console.log("✅ Resposta JSON:", data);

      if (data.status === "ok") {
        localStorage.setItem("authToken", data.token);
        navigate("/painel-orcamentos");
      } else {
        setErro("E-mail ou senha inválidos");
      }
    } catch (err) {
      console.error("🔥 Erro de conexão:", err.message);
      setErro(`Erro ao conectar ao servidor: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-escuro">
      <div className="login-container">
        <h2 className="titulo-claro">Login Admin</h2>
        <form onSubmit={handleSubmit} className="form-login" autoComplete="on">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          {erro && <p className="erro">{erro}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
