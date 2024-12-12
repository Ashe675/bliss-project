
'use server';

import prisma from '@/lib/prisma';
import { authorizeRole, deleteImageFromCloud, isAuthenticate } from '@/utils';
import { Prisma } from '@prisma/client';
import { Session } from 'next-auth';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const RequestSchema = z.object({
    postId:
        z.string({ message: 'Post inválido.' })
})

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user'];
    },
    message?: string;
}


export const deletePostById = async (postId: string): Promise<Response> => {

    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ postId })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: `Errors: ${safeData.error.issues.join(', ')}`
        }
    }

    try {

        const postFounded = await prisma.post.findMany({
            where: {
                id: postId,
                userId: resAuth.data?.user.id
            }
        })

        if (!postFounded) {
            return {
                ok: false,
                status: 400,
                message: `La publicación no existe`
            }
        }

        await prisma.$transaction(async tx => {
            const post = await tx.post.delete({
                where: {
                    id: postId
                },
                include: {
                    images : true
                }
            })

            const promises = post.images.map(img => deleteImageFromCloud(img.publicId))

            const responses = await Promise.all(promises)

            if (!responses.every(res => res === true )) {
                throw new Error('Una imagen no se pudo eliminar de la nube.');
            }

            await tx.image.deleteMany({
                where : {
                    postId : post.id
                }
            })

        })

        revalidatePath(`/employee/${resAuth.data?.user.id}`,)

        return {
            ok: true,
            status: 200,
            message: `¡Publicación eliminado exitosamente!`
        }

    } catch (error) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                ok: false,
                status: 400,
                message: `Error: ${error.message}`
            };
        };
        
        return {
            ok: false,
            status: 500,
            message: `Server internal error.`
        }
    }
}