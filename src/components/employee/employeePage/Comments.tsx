
"use client";
import React, { useState } from "react";
import { IconCarambola, IconCarambolaFilled } from "@tabler/icons-react";

interface Review {
  id: string;
  raiting: number;
  comment: string | null;
  date: string | Date;
  reviewer: {
    firstName: string;
    lastName: string;
    profileImage: string | null;
  };
}

interface CommentsProps {
  totalRatings: number;
  reviews: Review[];
}

const Comments: React.FC<CommentsProps> = ({ totalRatings, reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(5); 

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 10); 
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mt-6 mb-4">
        Comentarios: {totalRatings}
      </h3>

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-primary border-red-950/50 via-red-600/50 to-primary rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold text-white mb-4">
            ¡Sé el primero en dejar tu comentario!
          </h4>
          <p className="text-lg text-gray-200">
            Tu opinión es importante para otros usuarios. ¡Comparte tu
            experiencia!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gradient-to-r from-red-900/80 border-red-950 via-red-950 to-primary border rounded-lg mb-2 shadow-sm space-y-2"
            >
              <div className="flex space-x-2 items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      review.reviewer.profileImage
                        ? review.reviewer.profileImage
                        : "/user/user-placeholder.webp"
                    }
                    alt={review.reviewer.firstName}
                  />
                </div>
                <p className="text-lg md:text-1xl">{review.reviewer.firstName}</p>
                <p className="text-lg md:text-1xl">{review.reviewer.lastName}</p>
              </div>

              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) =>
                  index < review.raiting ? (
                    <IconCarambolaFilled
                      key={index}
                      size={14}
                      className="text-yellow-400 mx-0.5"
                    />
                  ) : (
                    <IconCarambola
                      key={index}
                      size={14}
                      className="text-yellow-400 mx-0.5"
                    />
                  )
                )}
                <p className="text-sm mx-4 text-gray-300">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>

              <p className="text-lg">
                {review.comment || "Sin comentario."}
              </p>
            </div>
          ))}

          {reviews.length > visibleReviews && (
            <div className="text-end">
              <button
                onClick={handleLoadMore}
                className="bg-primary px-4 py-2 text-white rounded-md font-semibold hover:bg-primary/80 hover:scale-105"
              >
                Ver más
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Comments;
