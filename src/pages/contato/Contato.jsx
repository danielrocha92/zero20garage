import React from 'react';
import { Helmet } from 'react-helmet-async';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

import './Contato.css';
import ContatoCta from '../../components/ui/ContatoCta';

function Contato() {
  const messages = [
    {
      title: 'Fale Conosco',
      subtitle: 'Estamos prontos para atender você',
    },
    {
      title: 'Entre em Contato',
      subtitle: 'Tire suas dúvidas ou agende um serviço',
    },
    {
      title: 'Estamos Aqui',
      subtitle: 'Visite nossa oficina ou fale conosco pelos canais abaixo',
    },
  ];

  return (
    <div className="page-escuro">
    <DynamicHeader page="contato" messages={messages} />
    {/* SEO On-Page: Helmet com title e description otimizados */}
    <Helmet>
        <title>Contato e Localização | Zero 20 Garage - Oficina Mecânica em Mairiporã-SP</title>
        <meta name="description" content="Fale com a Zero 20 Garage via WhatsApp ou formulário. Oficina mecânica e retífica de motores em Mairiporã-SP. Saiba como nos encontrar." />
        <link rel="canonical" href="https://zero20garage.com.br/contato" />
    </Helmet>
    <Breadcrumbs />


        {/* Seção de Contato */}
        <ContatoCta />

          {/* Seção do Mapa */}
          <div className="highlight-item">
            {/* SEO Semântica: H1 único por página com palavra-chave de localização */}
            <h1 className="titulo-claro contato-h1">Contato e Localização em Mairiporã</h1>
            <h2 className="subtitulo-claro contato-h2">Venha Nos Fazer uma Visita Hoje!</h2>
            <p className="paragrafo-claro contato-intro-text">Zero20 Garage – Estr. dos Macacos, 742 - Mairiporã - SP. Encontre facilmente no Google Maps:</p>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.799744734953!2d-46.5745093!3d-23.3263499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceede375ca12c9%3A0xa22173d27f744745!2sZERO%2020%20GARAGE!5e0!3m2!1spt-BR!2sbr!4v1711478418134!5m2!1spt-BR!2sbr"
                width="100%"
                height="500"
                className="mapa-embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Zero 20 Garage em Mairiporã-SP"
              ></iframe>
            </div>
          </div>
    </div>
  );
}

export default Contato;
