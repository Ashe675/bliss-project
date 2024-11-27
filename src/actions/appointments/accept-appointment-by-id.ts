'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";
import dayjs from "dayjs";
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
    appointmentId:
        z.string({ message: 'La cita es inválida' })
            .uuid({ message: 'Cita inválida' }),
    finalDate: z.date()
})

// Tiempo límite para la duración de la cita (en minutos)
const MAX_APPOINTMENT_DURATION_HOURS = 5;

// const TIME_LIMIT_HOURS = 48;

export const acceptAppointmentById = async (appointmentId: string, finalDate: Date): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ appointmentId, finalDate })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }
    const { data } = safeData;

    const finalDateMinusFiveMinutes = dayjs(data.finalDate).subtract(5, 'minutes');

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

        const isBusySchedule = await prisma.appointment.findFirst({
            where: {
                status: 'accepted',
                OR: [
                    {
                        AND: [
                            { appointmentDate: { lte: appointmentFound.appointmentDate } },
                            { finalDate: { gt: appointmentFound.appointmentDate } }
                        ]
                    },
                    {
                        AND: [
                            { appointmentDate: { lt: data.finalDate } },
                            { finalDate: { gte: data.finalDate } }
                        ]
                    },
                    {
                        AND: [
                            { appointmentDate: { gte: appointmentFound.appointmentDate } },
                            { appointmentDate: { lt: data.finalDate } }
                        ]
                    }
                ],
                userScheduledId: resAuth.data?.user.id
            }
        })

        if (isBusySchedule) {
            return {
                ok: false,
                status: 409,
                message: 'Hubo un traslape de citas, verifique que los horarios no choquen.',
            }
        }


        const isBefore = finalDateMinusFiveMinutes.isBefore(appointmentFound.appointmentDate)

        if (isBefore) {
            return {
                ok: false,
                status: 400,
                message: 'La fecha final debe ser por lo menos 5 minutos mayor a la de la cita.',
            }
        }

        const appointmentDate = dayjs(appointmentFound.appointmentDate);
        const durationMinutes = dayjs(data.finalDate).diff(appointmentDate, 'hours');

        // Verificar que la duración de la cita no exceda el máximo permitido
        if (durationMinutes > MAX_APPOINTMENT_DURATION_HOURS) {
            return {
                ok: false,
                status: 400,
                message: `La duración de la cita no debe exceder ${MAX_APPOINTMENT_DURATION_HOURS} horas.`,
            };
        }

        await prisma.appointment.update({
            where: {
                id: data.appointmentId
            },
            data: {
                finalDate: data.finalDate,
                status: 'accepted',
            }
        })

        revalidatePath('/appointments')

        return {
            ok: true,
            status: 200,
            message: '¡Cita agendada con éxito!',
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