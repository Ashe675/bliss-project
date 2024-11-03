// components/EmployeeRating.tsx
import React from 'react';

// Definición de tipos para los props del componente
interface EmployeeRatingProps {
  rating: number; // El rating debe ser un número
}

const EmployeeRating: React.FC<EmployeeRatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.568L24 9.75l-6 5.857L19.335 24 12 19.897 4.665 24 6 15.607 0 9.75l8.332-1.595z" />
      </svg>
    );
  });

  return <div className="flex">{stars}</div>;
};

export default EmployeeRating;
