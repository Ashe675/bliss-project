'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate, uploadImages } from "@/utils";
import { slugify } from "@/utils/strings";
import { BranchOffice, Prisma } from "@prisma/client";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import z from 'zod';

const RequestSchema = z.object({
    id: z.string().uuid({ message: 'Id de la sucursal no válido.' }).optional(),
    name: z.string({ message: 'El nombre debe de ser una o más palabras.' }),
    description: z.string({ message: 'La descripción debe de ser una o más palabras.' }),
    address: z.string({ message: 'La dirección debe de ser una o más palabras.' }),
    longevityYear: z
        .string({ message: 'El año de inaguración es inválido.' })
        .transform((value) => {
            const numberValue = Number(value);
            if (isNaN(numberValue)) {
                throw new Error('El año de inaguración debe ser un número.');
            }
            return numberValue;
        })
        .refine((value) => Number.isInteger(value), { message: 'El año de inaguración debe ser un número entero.' }),
    officeType: z.enum(["barbershop", "salon"], { message: "Tipo de sucursal inválida." }),
})

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user'];
    },
    message: string;
}

export const createUpdateBranch = async (formData: FormData) => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['admin'])
    if (!resAuthorize.ok) return resAuthorize


    const data = Object.fromEntries(formData)

    const safeData = RequestSchema.safeParse(data)


    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: `Datos inválidos: ${safeData.error.issues.map(issue => issue.message).join(', ')}.`
        }
    }

    if (!safeData.data.id && formData.getAll('images').length < 1) {
        return {
            ok: false,
            status: 400,
            message: 'Se debe de subir una imagen!'
        }
    }

    if (formData.getAll('images').length > 4) {
        return {
            ok: false,
            status: 400,
            message: 'Solo se permiten 4 imágenes!'
        }
    }

    if (!(formData.getAll('images') as File[]).every(img => img.type.startsWith('image/') && img.size < 5 * 1024 * 1024)) {
        return {
            ok: false,
            status: 400,
            message: 'El archivo debe ser una imagen y no debe exceder los 5MB!'
        };
    }

    const { data: newData } = safeData;

    try {
        await prisma.$transaction(async (tx) => {
            let branchCreatedUpdated: BranchOffice
            if (newData.id) {
                const branch = await tx.branchOffice.findFirst({
                    where: {
                        id: newData.id,
                        userOwnerId: resAuth.data?.user.id
                    }
                })

                if (!branch) {
                    throw new Error('La sucusal a editar no existe.')
                }

                branchCreatedUpdated = await tx.branchOffice.update({
                    where: {
                        id: newData.id,
                        userOwnerId: resAuth.data?.user.id
                    },
                    data: {
                        name: newData.name,
                        address: newData.address,
                        description: newData.description,
                        longevityYear: newData.longevityYear,
                        officeType: newData.officeType
                    }
                })
            } else {
                const totaltBranchesWithSameName = await tx.branchOffice.count({
                    where: {
                        OR: [
                            {
                                name: newData.name,
                            },
                            {
                                slug: slugify(newData.name)
                            }
                        ]
                    }
                })

                const totalBranchesByAdmin = await tx.branchOffice.count({
                    where: {
                        userOwnerId: resAuth.data?.user.id
                    }
                })

                if (totalBranchesByAdmin >= 5) {
                    throw new Error('No puedes crear más de 5 sucursales.')
                }

                branchCreatedUpdated = await tx.branchOffice.create({
                    data: {
                        name: newData.name,
                        description: newData.description,
                        address: newData.address,
                        longevityYear: newData.longevityYear,
                        officeType: newData.officeType,
                        slug: `${slugify(newData.name) + (totaltBranchesWithSameName ? totaltBranchesWithSameName + 1 : '').toString()}`,
                        userOwnerId: resAuth.data!.user.id
                    }
                })
            }

            const res = await uploadImages({
                images: formData.getAll('images') as File[], folder: 'branch-images', transformationOptions: {
                    aspect_ratio: '16:9',
                    height: 720,
                    crop: 'fill',
                    quality: 'auto',
                    gravity: 'auto'
                }
            })

            if (!res) {
                throw new Error('La imagen no se pudo subir a la nube.');
            }

            await tx.image.createMany({
                data: res.map(img => ({ imageType: 'branch', publicId: img.public_id, url: img.secure_url, branchOfficeId: branchCreatedUpdated.id }))
            })

            revalidatePath(`/branch/${branchCreatedUpdated.slug}`)
            revalidatePath(`/admin/branches/${branchCreatedUpdated.slug}`)
            revalidatePath(`/admin/branches`)
        })


        return {
            ok: true,
            status: 200,
            message: `Sucursal ${!newData.id ? 'creada' : 'actualizada'} con éxito.`
        }

    } catch (error) {
        console.log(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                ok: false,
                status: 400,
                message: `Error en la base de datos: ${error.message}`
            };
        }
        return {
            ok: false,
            status: 500,
            message: `Error inesperado: ${error}`
        };
    }

}