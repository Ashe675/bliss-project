'use server';

import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export const getEmployeePosts = async (id: string): Promise<Post[] | null> => {
    try {
        const employee = await prisma.user.findUnique({
            where: {
                id, // Suponiendo que 'id' es el campo que utilizas para buscar al empleado
            },
            include: {
                posts: {
                    include:{
                        images:true
                    }
                }
            },
        });

        // Si no se encuentra el empleado, retornar null
        if (!employee) {
            return null;
        }

        return employee.posts; // Si prefieres un entero, puedes usar Math.round(averageRating)
        
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error('Unable to fetch employee data');
    }
};
