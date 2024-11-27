'use server';

import prisma from "@/lib/prisma";

export async function postEmployeeReview(data: {
  comment: string;
  rating: number;
  revieweeId: string;
  reviewerId: string;
  date: string;
}) {
  try {
    const newReview = await prisma.review.create({
      data: {
        comment: data.comment,
        raiting: data.rating,
        revieweeId: data.revieweeId,
        reviewerId: data.reviewerId,
        date: new Date(data.date),
      },
    });
    return { success: true, review: newReview };
  } catch (error) {
    console.error('Error al crear la reseña:', error);
    return { success: false, error: 'Error al crear la reseña' };
  }
}
