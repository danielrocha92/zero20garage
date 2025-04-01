import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaCcVisa, FaCcMastercard, FaBarcode } from 'react-icons/fa';

function Footer() {

  const formasPagamento = [
    { nome: 'Visa', icone: <FaCcVisa /> },
    { nome: 'Mastercard', icone: <FaCcMastercard /> },
    { nome: 'Boleto', icone: <FaBarcode /> },
  ];

  const redesSociais = [
    { nome: 'Facebook', link: 'https://www.facebook.com/zero20garage', icone: <FaFacebook /> },
    { nome: 'Instagram', link: 'https://www.instagram.com/zero20garage', icone: <FaInstagram /> },
  ];

  return (
      <footer className="footer">
      <div className='footer-card'>
      <span>Formas de Pagamento:</span>
        {formasPagamento.map(formaPagamento => (
          <span key={formaPagamento.nome}>{formaPagamento.icone}</span>
        ))}
        {redesSociais.map(redeSocial => (
          <a key={redeSocial.nome} href={redeSocial.link} target="_blank" rel="noopener noreferrer">
            {redeSocial.nome}
          </a>
        ))}
      </div>
        <p>© 2025 Zero 20 Garage. Todos os direitos reservados.</p>
      </footer>
  );
}
export default Footer;

