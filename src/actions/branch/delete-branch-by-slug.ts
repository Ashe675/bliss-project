'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, deleteImageFromCloud, isAuthenticate } from "@/utils";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";


interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user']
    },
    message: string;
}

const RequestSchema = z.object({
    branchSlug:
        z.string({ message: 'La sucursal es inválida' })
})

export const deleteBranchBySlug = async (branchSlug: string): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['admin'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ branchSlug })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }
    const { data: { branchSlug: branchSlugDelete } } = safeData;


    try {

        const branchFound = await prisma.branchOffice.findFirst({
            where: {
                slug: branchSlugDelete,
                userOwnerId: resAuth.data?.user.id
            },
            include: {
                employees: {
                    select: {
                        id: true
                    }
                },
                images: true
            }
        })


        if (!branchFound) {
            return {
                ok: false,
                status: 400,
                message: 'La sucursal a eliminar no existe.',
            }
        }

        if (branchFound.employees.length > 0) {
            return {
                ok: false,
                status: 400,
                message: 'Antes de eliminar la sucursal debe de eliminar a sus empleados o cambiarlos a otra sucursal.',
            }
        }

        await prisma.branchOffice.delete({
            where: {
                slug: branchSlugDelete
            }
        })

        await prisma.image.deleteMany({
            where: {
                branchOfficeId: branchFound.id
            }
        })

        const promises = branchFound.images.map(img => deleteImageFromCloud(img.publicId));
        await Promise.all(promises)

        revalidatePath('/admin/branches');
        revalidatePath('/home');


        return {
            ok: true,
            status: 200,
            message: '¡Sucursal eliminada correctamente!'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            status: 500,
            message: 'Internal server error.',
        }
    }

}