import React, { useState, useEffect } from 'react';

const ImagensVeiculo = ({ imagens, getCloudinaryThumb }) => {
  const [objectUrls, setObjectUrls] = useState([]);

  useEffect(() => {
    const urls = imagens
      .map(img => {
        if (img instanceof File) return URL.createObjectURL(img);
        if (typeof img === 'string') return getCloudinaryThumb ? getCloudinaryThumb(img) : img;
        if (img?.data?.data) return `data:image/jpeg;base64,${img.data.data}`;
        if (img?.url) return img.url;
        if (img?.uri) return img.uri;
        return '';
      })
      .filter(url => url); // filtra URLs vazias
    setObjectUrls(urls);

    return () => {
      imagens.forEach((img, idx) => {
        if (img instanceof File) URL.revokeObjectURL(urls[idx]);
      });
    };
  }, [imagens, getCloudinaryThumb]);

  const handleImageError = (e) => {
    e.currentTarget.src = 'https://via.placeholder.com/150'; // fallback caso 404
  };

  return (
    <section className="imagens-section">
      <h2>Imagens do Veículo</h2>
      <div className="imagens-container">
        {objectUrls.map((src, idx) => (
          <div key={idx} className="thumb-wrapper">
            {src ? (
              <img
                src={src}
                alt={`Foto ${idx + 1}`}
                className="thumb-img"
                onError={handleImageError}
              />
            ) : (
              <span>Imagem inválida</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImagensVeiculo;
