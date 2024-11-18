'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getBranchesByAdmin = async () => {
    const session = await auth();
    
    try {
        const branches = await prisma.branchOffice.findMany(
            {
                where: {
                    userOwnerId: session?.user.id
                },
            }
        );

        return branches;
    }
    catch (error) {
        console.error(error);
        return [];
    }   
} 