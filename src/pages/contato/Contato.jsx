import React from 'react';
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
    <Breadcrumbs />


      <div className="container-escuro">

        {/* Seção de Contato */}
        <ContatoCta />

        {/* Seção do Mapa */}
          <div className="highlight-item">
            <h2 className="titulo-claro">Onde Estamos</h2>
            <p className="subtitulo-claro">Venha nos visitar ou encontre facilmente no Google Maps:</p>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.799744734953!2d-46.5745093!3d-23.3263499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceede375ca12c9%3A0xa22173d27f744745!2sZERO%2020%20GARAGE!5e0!3m2!1spt-BR!2sbr!4v1711478418134!5m2!1spt-BR!2sbr"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Zero 20 Garage"
              ></iframe>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Contato;
