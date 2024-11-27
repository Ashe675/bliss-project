'use server';

import prisma from "@/lib/prisma";

export const getEmployeeRating = async (id: string): Promise<number | null> => {
    try {
        const employee = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                reviewsReceived: true
            },
        });

        if (!employee) {
            return null;
        }

        let totalRating: number = 0;
        let count: number = 0;

        if (employee.reviewsReceived && Array.isArray(employee.reviewsReceived)) {
            employee.reviewsReceived.forEach(element => {
                totalRating += element.raiting; 
                count++;
            });
        }

        if (count === 0) {
            return null; 
        }

        const averageRating = totalRating / count; 
        return averageRating; 
        
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error('Unable to fetch employee data');
    }
};
