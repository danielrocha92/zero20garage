import React, { useState } from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaCcVisa, FaCcMastercard, FaBarcode } from 'react-icons/fa';
import { MdPix } from 'react-icons/md';

function Footer() {
  const formasPagamento = [
    { nome: 'Visa', icone: <FaCcVisa /> },
    { nome: 'Mastercard', icone: <FaCcMastercard /> },
    { nome: 'Boleto', icone: <FaBarcode /> },
    { nome: 'Pix', icone: <MdPix /> },
  ];

  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* DESKTOP FOOTER */}
        <div className="footer-desktop">
          <div className="footer-content-wrapper">
            {/* Seções de Navegação */}
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
            <div className="footer-card">
              <span className="title">Formas de Pagamento:</span>
              <div className="icons">
                {formasPagamento.map((forma) => (
                  <span key={forma.nome} className="payment-icon" title={forma.nome}>
                    {forma.icone}
                  </span>
                ))}
              </div>
            </div>

            <div className="footer-card">
              <span className="title">Siga-nos:</span>
              <div className="icons">
                <a href="https://www.facebook.com/zero20garage" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="icon-medium" />
                </a>
                <a href="https://www.instagram.com/zero20garage" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="icon-medium" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-card">
            <span className="title">© 2025 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™ Todos os direitos reservados.</span>
          </div>
        </div>

        {/* MOBILE FOOTER */}
        <div className="footer-mobile">
          <div className="accordion">
            <div className="accordion-item">
              <button onClick={() => toggleMenu('sobre')} className="accordion-button">Sobre a Zero 20 Garagem</button>
              {activeMenu === 'sobre' && (
                <ul className="accordion-content">
                  <li><a href="/sobre">Sobre Nós</a></li>
                  <li><a href="/trabalhe-conosco">Trabalhe Conosco</a></li>
                </ul>
              )}
            </div>

            <div className="accordion-item">
              <button onClick={() => toggleMenu('privacidade')} className="accordion-button">Portal de Privacidade</button>
              {activeMenu === 'privacidade' && (
                <ul className="accordion-content">
                  <li><a href="/politica">Política de Privacidade</a></li>
                  <li><a href="/faq">FAQ</a></li>
                </ul>
              )}
            </div>

            <div className="accordion-item">
              <button onClick={() => toggleMenu('atendimento')} className="accordion-button">Atendimento</button>
              {activeMenu === 'atendimento' && (
                <ul className="accordion-content">
                  <li><a href="/trocas">Trocas e Devoluções</a></li>
                  <li><a href="/termos">Termos de Uso</a></li>
                </ul>
              )}
            </div>

            <div className="footer-card">
              <span className="title">Siga-nos:</span>
              <div className="icons">
                <a href="https://www.facebook.com/zero20garage" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="icon-medium" />
                </a>
                <a href="https://www.instagram.com/zero20garage" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="icon-medium" />
                </a>
              </div>
            </div>

            <div className="footer-card">
                  <span className="title">Formas de Pagamento:</span>
                  <div className="icons">
                    {formasPagamento.map((forma) => (
                      <span key={forma.nome} className="payment-icon" title={forma.nome}>
                        {forma.icone}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="footer-card">
              <span className="title">© 2025 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
