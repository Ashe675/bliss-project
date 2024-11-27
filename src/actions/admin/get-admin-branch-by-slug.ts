'use server';
import { BranchWithServices } from "@/interfaces";
import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";
import { Session } from "next-auth";
import z from 'zod';

const RequestSchema = z.object({
    slugParam:
        z.string({ message: 'Slug inválido.' })
})

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user'];
        branch? : BranchWithServices | null
    },
    message?: string;
}


export const getAdminBranchBySlug = async (slugParam: string) : Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['admin'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ slugParam })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }

    const { data : { slugParam : slug } } = safeData;

    try {

        const branch = await prisma.branchOffice.findFirst({
            where : {
                userOwnerId : resAuth.data?.user.id,
                slug,
            },
            include: {
                images: true,
                userOwner: true, 
                employees: true, 
                services: {
                    select : {
                        idService : true,
                        name:  true,
                        price: true
                    }
                }
            }
        })

        return {
            ok: true,
            status: 200,
            data : {
                branch : branch as BranchWithServices
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