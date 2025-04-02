import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaCcVisa, FaCcMastercard, FaBarcode } from 'react-icons/fa';

function Footer() {

  const formasPagamento = [
    { nome: 'Visa', icone: <FaCcVisa /> },
    { nome: 'Mastercard', icone: <FaCcMastercard /> },
    { nome: 'Boleto', icone: <FaBarcode /> },
  ];

  const facebook = [
    { nome: '', link: 'https://www.facebook.com/zero20garage', icone: <FaFacebook /> },
  ];

  const instagram = [
    { nome: '', link: 'https://www.instagram.com/zero20garage', icone: <FaInstagram /> },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-content-wrapper">
        {/* Seção Formas de Pagamento */}
        <div className="footer-card">
          <span className="title">Formas de Pagamento:</span>
          <div className="icons">
            {formasPagamento.map((formaPagamento) => (
              <span key={formaPagamento.nome}>{formaPagamento.icone}</span>
            ))}
          </div>
        </div>

        {/* Seção Siga-nos */}
        <div className="footer-card">
          <span className="title">Siga-nos:</span>
          <div className="icons">
            {facebook.map((facebook) => (
              <a
                key={facebook.nome}
                href={facebook.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "1rem" }} // Adiciona o espaçamento entre os ícones
              >
                {facebook.nome}
                <i className="fa fa-facebook"></i>
              </a>
            ))}

            {instagram.map((instagram) => (
              <a
                key={instagram.nome}
                href={instagram.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "1rem" }} // Adiciona o espaçamento entre os ícones
              >
                {instagram.nome}
                <i className="fa fa-instagram"></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Seção de navegação */}
      <div className="footer-nav">
        <ul>
          <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
          <li><a href="/servicos">Serviços</a></li>
          <li><a href="/sobre">Sobre Nós</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
      </div>

      <div className="footer-card">
        <span className="title">© 2025 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™ Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
