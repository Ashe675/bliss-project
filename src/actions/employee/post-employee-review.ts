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

    const branch = await prisma.branchOffice.findFirst({
      where: {
        employees: {
          some: {
            id: data.revieweeId
          }
        }
      },
      include: {
        employees: {
          include: {
            reviewsReceived: true,
          }
        }
      }
    })

    const resume = branch?.employees.reduce((resume, employee) => {
      resume.totalRaiting += employee.reviewsReceived.reduce((sum, review) => sum + review.raiting, 0);
      resume.count += employee.reviewsReceived.reduce((count) => count + 1, 0);
      return resume;
    }, { totalRaiting: 0, count: 0 });

    if (resume) {
      await prisma.branchOffice.update({
        where: {
          id: branch?.id
        },
        data: {
          rating: Math.round(resume.totalRaiting / resume.count)
        }
      })
    }

    return { success: true, review: newReview };
  } catch (error) {
    console.error('Error al crear la reseña:', error);
    return { success: false, error: 'Error al crear la reseña' };
  }
}
