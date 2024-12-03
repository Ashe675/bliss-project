'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, deleteImageFromCloud, isAuthenticate } from "@/utils";
import { Session } from "next-auth";
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
    imageUrl:
        z.string({ message: 'La url de la imagen es inválida' })
            .url({ message: 'La url de la imagen es inválida' })
})

export const deleteImageByUrl = async (imageUrl: string): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['admin', 'employee'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ imageUrl })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }
    const { data: { imageUrl: imageUrlDelete } } = safeData;


    try {
        const imageFound = await prisma.image.findFirst({
            where: {
                url: imageUrlDelete,
                OR: [
                    {
                        branchOffice: {
                            userOwnerId: resAuth.data?.user.id
                        }
                    },
                    {
                        post: {
                            userId: resAuth.data?.user.id
                        }
                    }
                ]
            }
        })


        if (!imageFound) {
            return {
                ok: false,
                status: 400,
                message: 'La imagen a eliminar no existe.',
            }
        }

        let countImages: number;

        if (imageFound.branchOfficeId) {
            countImages = await prisma.image.count({
                where:{
                    branchOfficeId: imageFound.branchOfficeId
                }
            })
        } else {
            countImages = await prisma.image.count({
                where:{
                    postId: imageFound.postId
                }
            })
        }

        if (countImages <= 1) {
            return {
                ok: false,
                status: 400,
                message: 'No se puede eliminar la imagen ya que es necesario tener al menos una.',
            }
        }

        const imageDeleted = await prisma.image.delete({
            where: {
                id: imageFound.id
            }
        })

        const res = await deleteImageFromCloud(imageDeleted.publicId);

        if (!res) {
            console.log('La imagen no se elimino de la nube.')
        }

        return {
            ok: true,
            status: 200,
            message: 'Imagen eliminada correctamente!'
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