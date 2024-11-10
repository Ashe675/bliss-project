'use server';

import prisma from "@/lib/prisma";
import { BranchData } from "@/interfaces/branch.interface"; 

export const searchBranchByName = async (search: string): Promise<BranchData | null> => {
    try {
        const newSearch = search.trim().toLowerCase().replace(/\s+/g, ' ');

        const branches = await prisma.branchOffice.findFirst({
            where: {
                OR: [
                    { address: { contains: newSearch, mode: 'insensitive' } },
                    { name: { contains: newSearch, mode: 'insensitive' } },
                    { description: { contains: newSearch, mode: 'insensitive' } }
                ]
            },
            include: {
                images: true,
                userOwner: true, 
                employees: true, 
            },
            orderBy: {
                rating: 'desc'
            }
        });

        if (!branches) return null;

        return branches as BranchData; 
    } catch (error) {
        console.error("Error fetching branch data:", error);
        return null;
    }
};
