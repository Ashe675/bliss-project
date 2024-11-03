// components/ReviewCard.tsx

import EmployeeRating from '@/components/employee/EmployeeRating';

import { Review } from '@/interfaces';

const ReviewCard = ({ review }: {review: Review}) => {
  const { reviewerName, rating, comment, date } = review;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-700">{reviewerName}</h3>
        <span className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>
      </div>

      <EmployeeRating rating={rating} />

      <p className="text-gray-600 mt-2">{comment}</p>
    </div>
  );
};

export default ReviewCard;
