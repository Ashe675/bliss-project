'use server';

import prisma from "@/lib/prisma";

export const searchBranches = async (search: string) => {
    try {
        const newSearch = search.trim().toLowerCase().replace(/\s+/g, ' ');

        const branches = await prisma.branchOffice.findMany({
            where: {
                OR: [
                    {
                        address: {
                            contains: newSearch,
                            mode: 'insensitive',
                        }
                    },
                    {
                        name: {
                            contains: newSearch,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: newSearch,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include : {
                images : true
            },
            orderBy : {
                rating: {
                    sort: 'desc',
                    nulls: 'last', // Mueve los valores nulos al final
                }
            }
        })

        return branches
    } catch (error) {
        console.log(error)
        return []
    }
}