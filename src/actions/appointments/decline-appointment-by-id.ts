'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";
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
    appointmentId:
        z.string({ message: 'La cita es inválida' })
            .uuid({ message: 'Cita inválida' })
})

export const declineAppointmentById = async (appointmentId: string): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ appointmentId })
    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }
    const { data } = safeData;

    try {

        const appointmentFound = await prisma.appointment.findFirst({
            where: {
                id: data.appointmentId,
                status: 'pending',
                appointmentDate: {
                    gt: new Date(),
                },
                userScheduledId: resAuth.data?.user.id
            }
        })

        if (!appointmentFound) {
            return {
                ok: false,
                status: 400,
                message: 'La solicitud de cita no existe.',
            }
        }

        await prisma.appointment.update({
            where: {
                id: data.appointmentId
            },
            data: {
                status: 'declined',
            }
        })

        return {
            ok: true,
            status: 200,
            message: '¡Solicitud rechazada correctamente!',
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