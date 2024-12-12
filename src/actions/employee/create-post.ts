
'use server';

import prisma from '@/lib/prisma';
import { authorizeRole, isAuthenticate, uploadImages } from '@/utils';
import { Prisma } from '@prisma/client';
import { Session } from 'next-auth';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const RequestSchema = z.object({
    title:
        z.string({ message: 'Título inválido.' }).min(4, { message: 'El título debe ser mayor a 4 caracteres.' })
})

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user'];
    },
    message?: string;
}


export const createPost = async (formData: FormData): Promise<Response> => {
    const data = Object.fromEntries(formData);

    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ title: data?.title })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: `Errors: ${safeData.error.issues.join(', ')}`
        }
    }

    if (formData.getAll('images').length > 5) {
        return {
            ok: false,
            status: 400,
            message: 'Solo se permiten 5 imágenes!'
        }
    }

    if (!(formData.getAll('images') as File[]).every(img => img.type.startsWith('image/') && img.size < 10 * 1024 * 1024)) {
        return {
            ok: false,
            status: 400,
            message: 'El archivo debe ser una imagen y no debe exceder los 10MB!'
        };
    }


    try {

        await prisma.$transaction(async tx => {
            const post = await tx.post.create({
                data: {
                    title: safeData.data.title,
                    userId: resAuth.data!.user.id
                }
            })

            const res = await uploadImages({
                images: formData.getAll('images') as File[], folder: 'employees-posts', transformationOptions: {
                    aspect_ratio: '1:1',
                    height: 720,
                    crop: 'fill',
                    quality: 'auto',
                    gravity: 'auto'
                }
            })

            if (!res) {
                throw new Error('Una imagen no se pudo subir a la nube.');
            }

            await tx.image.createMany({
                data: res.map(img => ({ imageType: 'post', publicId: img.public_id, url: img.secure_url, postId: post.id }))
            })


        })

        revalidatePath(`/employee/${resAuth.data?.user.id}`,)

        return {
            ok: true,
            status: 201,
            message: `¡Publicación subida exitosamente!`
        }

    } catch (error) {
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                ok: false,
                status: 400,
                message: `Error: ${error.message}`
            };
        }
        return {
            ok: false,
            status: 500,
            message: `Server internal error.`
        }
    }
}