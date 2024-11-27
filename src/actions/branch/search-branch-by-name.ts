'use server';

import prisma from "@/lib/prisma";
import { BranchData } from "@/interfaces/branch.interface";

export const searchBranchByName = async (search: string): Promise<BranchData | null> => {
    try {
        const newSearch = search.trim().toLowerCase().replace(/\s+/g, ' ');

        const branches = await prisma.branchOffice.findFirst({
            where: {
                OR: [
                    { slug: search },
                ]
            },
            include: {
                images: true,
                userOwner: true,
                employees: true,
            },
            orderBy : {
                rating: {
                    sort: 'desc',
                    nulls: 'last', // Mueve los valores nulos al final
                }
            }
        });

        if (!branches) return null;

        return branches as BranchData;
    } catch (error) {
        console.error("Error fetching branch data:", error);
        return null;
    }
};
