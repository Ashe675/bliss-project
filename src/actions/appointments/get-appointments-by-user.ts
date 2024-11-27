'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { AppoinmentWithUsers } from "@/interfaces";

interface Response {
    ok: boolean;
    appointments?: AppoinmentWithUsers[]
    message?: string;
}

export const getAppointmentsByUser = async (date: Date): Promise<Response> => {
    const session = await auth();
    if (!session?.user ) {
        return {
            ok: false,
            message: 'Acceso denegado'
        }
    }

    // Obtener el inicio y fin del día
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Establecer la hora a 23:59:59

    const { user } = session;

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
                    gte: startOfDay,
                    lte: endOfDay
                },
            },
            include: {
                userScheduled: {
                    select: {
                        firstName: true,
                        lastName: true,
                        user: true,
                        profileImage: true,
                        phoneNumber: true
                    }
                },
                userScheduler: {
                    select: {
                        firstName: true,
                        lastName: true,
                        user: true,
                        profileImage: true,
                        phoneNumber: true
                    }
                }
            },
            orderBy: {
                appointmentDate: 'asc'
            }
        })

        if (!appointments) {
            return {
                ok: true,
                appointments: []
            }
        }

        const now = dayjs();

        // Filtra las citas pendientes según el mismo día y el tiempo mayor que ahora
        const appointmentsFiltered = appointments.filter((ap) => {
            const appointmentDate = dayjs(ap.appointmentDate);
            if (ap.status === 'pending') {
                return appointmentDate.isAfter(now) && appointmentDate.isSame(endOfDay, 'day');
            }
            return true; // Incluye citas que no están en estado 'pending'
        });

        return {
            ok: true,
            appointments: appointmentsFiltered
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Server Error'
        }
    }
}