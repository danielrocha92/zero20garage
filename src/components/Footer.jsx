import React from 'react';
import '../styles/Footer.css' // Importa o arquivo global de estilos
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdPix } from 'react-icons/md'; // Ícone do Pix
import { FaCcVisa, FaCcMastercard, FaBarcode } from 'react-icons/fa'; // Ícones de pagamento

function Footer() {
  const formasPagamento = [
    { nome: 'Visa', icone: <FaCcVisa /> },
    { nome: 'Mastercard', icone: <FaCcMastercard /> },
    { nome: 'Boleto', icone: <FaBarcode /> },
    { nome: 'Pix', icone: <MdPix /> }, // Adicionado o Pix
  ];

  const facebook = [
    { nome: '', link: 'https://www.facebook.com/zero20garage', icone: <FaFacebook className="icon-medium" /> },
  ];

  const instagram = [
    { nome: '', link: 'https://www.instagram.com/zero20garage', icone: <FaInstagram /> },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-content-wrapper">
        
      {/* Seção de navegação */}
      <div className="footer-nav">
        <ul>
          <li><a href="/politica">Política de Privacidade</a></li>
          <li><a href="/termos">Termos de Uso</a></li>
          <li><a href="/trocas">Trocas e Devoluções</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </div>

      <div className="footer-nav">
        <ul>
          <li><a href="/servicos">Serviços</a></li>
          <li><a href="/sobre">Sobre Nós</a></li>
          <li><a href="/contato">Contato</a></li>
          <li><a href="/blog" translate="no">Blog</a></li>
          <li><a href="/trabalhe-conosco">Trabalhe Conosco</a></li>
        </ul>
      </div>
      </div>

      <div className="footer-content-wrapper-Payment">
        {/* Seção Formas de Pagamento */}
        <div className="footer-card">
          <span className="title">Formas de Pagamento:</span>
          <div className="icons">
            {formasPagamento.map((formaPagamento) => (
              <span 
                key={formaPagamento.nome}
                className="payment-icon"
                title={formaPagamento.nome} // Adicionado o tooltip
              >
                {formaPagamento.icone}
              </span>
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

      <div className="footer-card">
        <span className="title">© 2025 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™ Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
