import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import DynamicHeader from "./DynamicHeader";
import Breadcrumbs from "./Breadcrumbs";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [erro, setErro] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado para controlar o envio

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setIsSubmitting(true); // Define como true ao iniciar o envio

    try {
      const res = await fetch("https://zero20garage-login.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "ok") {
        localStorage.setItem("authToken", data.token);
        navigate("/painel-orcamentos"); // Redireciona após login bem-sucedido
      } else {
        setErro("E-mail ou senha inválidos");
      }
    } catch (err) {
      setErro("Erro ao conectar ao servidor");
    } finally {
      setIsSubmitting(false); // Define como false, independentemente do sucesso ou falha
    }
  };

  const messages = [
    {
      title: 'Login de Administrador',
      subtitle: 'Acesse o painel de gerenciamento de orçamentos',
    }
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
            className={isSubmitting ? "loading" : ""} // Aplica a classe 'loading' quando isSubmitting é true
            disabled={isSubmitting} // Desabilita o botão enquanto está enviando
          >
            {isSubmitting ? "Entrando..." : "Entrar"} {/* Altera o texto do botão */}
          </button>
          {erro && <p className="erro">{erro}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;