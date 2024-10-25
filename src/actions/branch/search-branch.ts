'use server';

import prisma from "@/lib/prisma";

export const searchBranches = async (search: string) => {
    try {
        const newSearch = search.trim().toLowerCase().replace(/ /g, '');
        console.log(newSearch)

        const branches = await prisma.branchOffice.findMany({
            where: {
                OR: [
                    {
                        address: {
                            contains: newSearch,
                            mode: 'insensitive'
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
            }
        })

        console.log(branches)
    } catch (error) {
        console.log(error)
        return []
    }
}