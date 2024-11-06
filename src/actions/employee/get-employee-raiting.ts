'use server';

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const getEmployeeRating = async (id: string): Promise<number | null> => {
    try {
        const employee = await prisma.user.findUnique({
            where: {
                id, // Suponiendo que 'id' es el campo que utilizas para buscar al empleado
            },
            include: {
                reviewsReceived: true
            },
        });

        // Si no se encuentra el empleado, retornar null
        if (!employee) {
            return null;
        }

        let totalRating: number = 0;
        let count: number = 0;

        // Asegúrate de que reviewsReceived es un arreglo antes de iterar
        if (employee.reviewsReceived && Array.isArray(employee.reviewsReceived)) {
            employee.reviewsReceived.forEach(element => {
                totalRating += element.raiting; // Asumiendo que 'raiting' es de tipo number
                count++;
            });
        }

        // Si no hay reseñas, retornar null o un rating default
        if (count === 0) {
            return null; // O podrías retornar 0 o algún valor por defecto si así lo deseas
        }

        // Calcular el rating promedio
        const averageRating = totalRating / count; // Esto mantiene el valor como decimal
        return averageRating; // Si prefieres un entero, puedes usar Math.round(averageRating)
        
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error('Unable to fetch employee data');
    }
};
