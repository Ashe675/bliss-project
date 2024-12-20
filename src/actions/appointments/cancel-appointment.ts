'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import z from 'zod';

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user']
    },
    message: string;
}

const RequestSchema = z.object({
    cancelMessage:
        z.string({ message: 'El motivo debe de ser texto' })
            .min(5, { message: 'El motivo debe de tener minimo 5 caracteres' })
            .max(150, { message: 'El motivo no puede tener mas de 150 caracteres.' }),
    appoinmetnId:
        z.string({ message: 'La cita es inválida' })
            .uuid({ message: 'Cita inválida' })
})

export const cancelAppointment = async (appoinmetnId: string, cancelMessage: string): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee', 'user'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ cancelMessage, appoinmetnId })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }

    try {

        const appoinmentFounded = await prisma.appointment.findFirst({
            where: {
                id: safeData.data.appoinmetnId,
                status: "accepted",
                appointmentDate: {
                    gte : new Date()
                },
                OR: [
                    {
                        userScheduledId: resAuth.data?.user.id
                    },
                    {
                        userSchedulerId: resAuth.data?.user.id
                    }
                ]
            },
        })

        if (!appoinmentFounded) {
            return {
                ok: false,
                status: 404,
                message: '¡Cita no encontrada!'
            }
        }

        const appoinmentUpdated = await prisma.appointment.update({
            where: {
                id: safeData.data.appoinmetnId,
                status: "accepted",
                appointmentDate: {
                    gte : new Date()
                },
                OR: [
                    {
                        userScheduledId: resAuth.data?.user.id
                    },
                    {
                        userSchedulerId: resAuth.data?.user.id
                    }
                ]
            },
            data: {
                cancelMessage: safeData.data.cancelMessage,
                status: 'canceled'
            }
        })

        if (!appoinmentUpdated) {
            return {
                ok: false,
                status: 404,
                message: '¡Error al cancelar la cita!'
            }
        }

        revalidatePath('/appointments')

        return {
            ok: true,
            status: 200,
            message: '¡Cita cancelada correctamente!'
        }


    } catch (error) {
        console.log(error)
        return {
            ok: false,
            status: 500,
            message: 'Internal server error.',
        }
    }
}