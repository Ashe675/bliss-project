'use client';
// components/EmployeeReviews.tsx
import { Review } from '@prisma/client';
import ReviewCard from '@/components/employee/ReviewCard';

interface EmployeeReviewsProps {
  reviews: Review[]; // Define la interfaz para los props
}

const EmployeeReviews = ({ reviews }: EmployeeReviewsProps) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">This employee has no reviews yet.</p>
      )}
    </div>
  );
};

export default EmployeeReviews;
