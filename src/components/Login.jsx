import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import DynamicHeader from "./DynamicHeader";
import Breadcrumbs from "./Breadcrumbs";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [erro, setErro] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setIsSubmitting(true);

    try {
      // Alteração na URL para o novo microserviço
      const res = await fetch("https://zero20-login-api.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "ok") {
        localStorage.setItem("authToken", data.token);
        // Alterado para a rota correta que contém o PainelOrcamentos
        navigate("/painel-orcamentos");
      } else {
        setErro("E-mail ou senha inválidos");
      }
    } catch (err) {
      setErro("Erro ao conectar ao servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const messages = [
    {
      title: "Login de Administrador",
      subtitle: "Acesse o painel de gerenciamento de orçamentos",
    },
  ];

  return (
    <div className="page-escuro">
      <DynamicHeader page="login" messages={messages} />
      <Breadcrumbs />
      <div className="login-container">
        <h2 className="titulo-claro">Login Admin</h2>
        <form onSubmit={handleSubmit} className="form-login">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={isSubmitting ? "loading" : ""}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
          {erro && <p className="erro">{erro}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
