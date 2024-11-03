// components/ReviewCard.tsx

import EmployeeRating from '@/components/employee/EmployeeRating';
import { Review } from '@/interfaces';

const ReviewCard = ({ review }: { review: Review }) => {
  const { reviewerName, rating, comment, date, reviewerImage } = review;

  // Ruta de la imagen por defecto
  const defaultImageUrl = '/ui/profile/default-avatar.jpg'; // Asegúrate de cambiar esta ruta a tu imagen predeterminada

  return (
    <div className="border-collapse rounded-lg p-4 bg-[#130800]">
      <div className="flex items-start mb-2">
        <img 
          src={reviewerImage || defaultImageUrl} 
          alt={reviewerName} 
          className="w-10 h-10 rounded-full mr-3" 
        />
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg font-semibold">{reviewerName}</h3>
          <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>

      <EmployeeRating rating={rating} />

      <p className="mt-2">{comment}</p>
    </div>
  );
};

export default ReviewCard;
