// components/ReviewCard.tsx

import EmployeeRating from '@/components/employee/EmployeeRating';
import { Review } from '@prisma/client';

interface ReviewCardProps {
  review: Review; // Propiedad review que espera un objeto de tipo Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { reviewerId, raiting, comment, date } = review;

  // Aquí asumimos que tienes un método para obtener el nombre del revisor y su imagen basado en reviewerId.
  // Reemplaza estas líneas con tu lógica para obtener el nombre e imagen del revisor si es necesario
  const reviewerName = reviewerId; // Cambiar esto para que coincida con tu lógica real
  const reviewerImage = null; // Cambiar esto para que coincida con tu lógica real

  // Ruta de la imagen por defecto
  const defaultImageUrl = '/ui/profile/default-avatar.jpg'; // Asegúrate de cambiar esta ruta a tu imagen predeterminada

  return (
    <div className="border-collapse rounded-lg p-4 bg-[#130800]">
      <div className="flex items-start mb-2">
        <img 
          src={reviewerImage || defaultImageUrl} 
          alt={reviewerName || 'Reviewer'} // Añadir un texto alternativo adecuado
          className="w-10 h-10 rounded-full mr-3" 
        />
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg font-semibold">{reviewerName || 'Anonymous'}</h3>
          <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>

      <EmployeeRating rating={raiting} /> {/* Asegúrate de que este componente pueda manejar el tipo de raiting */}

      <p className="mt-2">{comment || 'No comment provided.'}</p> {/* Mensaje para cuando no hay comentario */}
    </div>
  );
};

export default ReviewCard;
