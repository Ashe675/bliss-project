'use server';

import { authorizeRole, isAuthenticate } from "@/utils";

import { Session } from "next-auth";
import { z } from "zod";
import prisma from "@/lib/prisma";

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user']
        appointmentsRange?: {
            startDate: Date;
            finalDate: Date;
        }[]
    },
    message?: string;
}

const RequestSchema = z.object({
    date:
        z.date()
})

export const getAppointmentsAcceptedByDayRange = async (date: Date): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee', 'user'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ date })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }

    // Obtener el inicio y fin del día
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Establecer la hora a 23:59:59

    const { user } = resAuth.data!;

    try {

        const appointments = await prisma.appointment.findMany({
            where: {
                OR: [
                    {
                        userScheduledId: user.id
                    },
                    {
                        userSchedulerId: user.id
                    }
                ],
                appointmentDate: {
                    lte: endOfDay,
                    gte: startOfDay
                },
                status: 'accepted'
            },
            select: {
                appointmentDate: true,
                finalDate: true,
            }
        })

        const appointmentsRange = appointments.map(appointment => ({ startDate: appointment.appointmentDate, finalDate: appointment.finalDate! }))

        return {
            ok: true,
            status: 200,
            message: 'Success',
            data: {
                appointmentsRange : appointmentsRange
            }
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