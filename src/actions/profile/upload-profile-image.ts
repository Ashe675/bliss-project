'use server';


import prisma from "@/lib/prisma";
import { authorizeRole, deleteImageFromCloud, isAuthenticate, uploadImages } from "@/utils";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";


interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user']
    },
    message: string;
}

export const uploadProfileImage = async (formData: FormData): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee', 'user', 'admin'])
    if (!resAuthorize.ok) return resAuthorize

    const { user } = resAuth.data!;

    try {

        if (formData.getAll('profileImage').length !== 1) {
            return {
                ok: false,
                status: 400,
                message: 'Se debe de subir una imagen!'
            }
        }

        if (!(formData.getAll('profileImage')[0] as File).type.startsWith('image/')) {
            return {
                ok: false,
                status: 400,
                message: 'El archivo debe ser una imagen!'
            }
        }

        const res = await uploadImages({
            images: formData.getAll('profileImage') as File[], folder: 'profile-image', transformationOptions: {
                aspect_ratio: '1:1',
                width: 720, 
                height: 720, 
                crop: 'fill',
                quality: 'auto'
            }
        })

        if (!res) {
            return {
                ok: false,
                status: 400,
                message: 'La imagen no se pudo subir a la nube.',
            }
        }

        const userFounded = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        if (userFounded?.profileImage) {
            const response = await deleteImageFromCloud(userFounded.profileImage)
            if (!response) {

                await deleteImageFromCloud(res[0].public_id)

                return {
                    ok: false,
                    status: 400,
                    message: 'La imagen anterior no se pudo eliminar de la nube.',
                }
            }
        }


        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                profileImage: res[0].secure_url
            }
        })

        revalidatePath('/profile')

        return {
            ok: true,
            status: 200,
            message: 'Imagen subida!'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            status: 500,
            message: 'Server internal error.',
        }
    }
}