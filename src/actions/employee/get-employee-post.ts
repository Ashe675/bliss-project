'use server';

import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export const getEmployeePosts = async (id: string): Promise<Post[] | null> => {
    try {
        const employee = await prisma.user.findUnique({
            where: {
                id, 
            },
            include: {
                posts: {
                    include:{
                        images:true
                    }
                }
            },
        });

        if (!employee) {
            return null;
        }

        return employee.posts; 
        
    } catch (error) {
        console.error("Error fetching employee:", error);
        throw new Error('Unable to fetch employee data');
    }
};
