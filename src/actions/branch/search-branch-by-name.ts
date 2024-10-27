'use server';

import prisma from "@/lib/prisma";
import { BranchOfficeData } from "@/interfaces/branch.interface"; // Ajusta la ruta según corresponda

export const searchBranchByName = async (search: string): Promise<BranchOfficeData | null> => {
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

        return branches as BranchOfficeData; 
    } catch (error) {
        console.error("Error fetching branch data:", error);
        return null;
    }
};
