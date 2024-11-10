'use client';

import React, { useState } from 'react';
import styles from './Stars.module.css';

type StarsProps = {
  onRatingChange: (rating: number) => void;
};

const Stars: React.FC<StarsProps> = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating); // Actualizar el estado local
    onRatingChange(rating);     // Pasar la calificación al componente padre
  };

  return (
    <div className="rating-wrapper">
      <div className={styles.rating}>
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}> 
            <input
              type="radio"
              id={`star-${star}`}
              name="star-radio"
              value={String(star)}
              checked={selectedRating === star}
              onChange={() => handleRatingChange(star)}
            />
            <label htmlFor={`star-${star}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <div className="selected-rating">Seleccionaste {selectedRating} estrellas</div>
    </div>
  );
};

export default Stars;
