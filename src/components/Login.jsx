import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    try {
      const res = await fetch("https://SEU-BACKEND-URL/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "ok") {
        localStorage.setItem("authToken", data.token);
        navigate("/painel-orcamentos");
      } else {
        setErro("E-mail ou senha inválidos");
      }
    } catch {
      setErro("Erro ao conectar ao servidor");
    }
  };

  return (
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
        <button type="submit">Entrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </div>
  );
};

export default Login;
