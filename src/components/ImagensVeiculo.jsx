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
    e.currentTarget.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22150%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22150%22%20height%3D%22150%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23aaa%22%3EImg%3C%2Ftext%3E%3C%2Fsvg%3E'; // fallback caso 404
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
