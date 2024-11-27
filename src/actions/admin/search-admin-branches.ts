'use server';

import { BranchOfficeGridData } from "@/interfaces";
import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";
import { Session } from "next-auth";
import z from 'zod';

const RequestSchema = z.object({
    searchParam:
        z.string({ message: 'Search inválido.' })
})

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user'];
        branches? : BranchOfficeGridData[]
    },
    message?: string;
}

export const searchAdminBranches = async (searchParam : string) : Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['admin'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ searchParam })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }

    const { data : { searchParam : search } } = safeData;

    try {
        const newSearch = search.trim().toLowerCase().replace(/\s+/g, ' ');

        const branches = await prisma.branchOffice.findMany({
            where: {
                userOwnerId : resAuth.data?.user.id,
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

        return {
            ok: true,
            status: 200,
            data : {
                branches
            }
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            status: 500,
            message: 'Server internal error.'
        }
    }
}