import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function GoogleReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyCPvu_jBGzUauSJuUKqRXfO2eOJ4wwBWmo', // Substitua pela sua API Key
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      const placeId = 'AIzaSyCPvu_jBGzUauSJuUKqRXfO2eOJ4wwBWmo'; // Substitua pelo Place ID do seu negócio
      const request = {
        placeId: placeId,
        fields: ['reviews'],
      };

      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setReviews(place.reviews || []);
        }
      });
    });
  }, []);

  return (
    <div className="google-reviews">
      <h2>Avaliações</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.author_name}</strong></p>
            <p>Nota: {review.rating} / 5</p>
            <p>{review.text}</p>
          </div>
        ))
      ) : (
        <p>Carregando avaliações...</p>
      )}
    </div>
  );
}

export default GoogleReviews;