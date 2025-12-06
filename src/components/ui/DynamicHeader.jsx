import React, { useState, useEffect } from 'react';
import '../../styles/DynamicHeader.css';

function DynamicHeader({ messages, intervalTime = 4500, page = '' }) {
  const [headerContent, setHeaderContent] = useState(messages[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % messages.length;
        setHeaderContent(messages[index]);
        setFade(true);
      }, 500);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [messages, intervalTime]);

  const getImageSrc = (page) => {
    switch (page) {
      case 'home': return {
        desktop: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429487/home_k6ug8o.jpg',
        mobile: 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto,w_800/v1763429487/home_k6ug8o.jpg'
      };
      case 'sobre': return {
        desktop: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764871614/Design_sem_nome_3_qnkmp0.png',
        mobile: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764871165/Design_sem_nome_2_dhutfq.png'
      };
      case 'servicos': return 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429508/servicos_gblbyy.jpg';
      case 'orcamento': return {
        desktop: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764870173/img-orcamento-dektop_yx6lgf.png',
        mobile: 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1764870173/img_orcamento-mobile_tuwhbz.png'
      };
      case 'contato': return 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429463/contato_ojwrdu.jpg';
      case 'blog': return 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429461/blog-header_vzqvrg.jpg';
      case 'footer': return 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429482/footer_unphiy.jpg';
      default: return 'https://res.cloudinary.com/dlyeywiwk/image/upload/f_auto,q_auto/v1763429485/header_riszob.jpg';
    }
  };

  const imageSrc = getImageSrc(page);
  const isResponsive = typeof imageSrc === 'object';

  return (
    <header className="header">
      <div className="header-background-wrapper">
        {isResponsive ? (
          <picture>
            <source media="(max-width: 768px)" srcSet={imageSrc.mobile} />
            <img
              src={imageSrc.desktop}
              alt="Background"
              className="header-background-image"
              fetchpriority="high"
            />
          </picture>
        ) : (
          <img
            src={imageSrc}
            alt="Background"
            className="header-background-image"
            fetchpriority="high"
          />
        )}
        <div className="header-overlay"></div>
      </div>
      <div className="message-container">
        <h1 className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.title}</h1>
        <p className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>{headerContent.subtitle}</p>
      </div>
    </header>
  );
}

export default DynamicHeader;
