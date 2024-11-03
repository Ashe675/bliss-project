'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getAppointmentsByUser = async (date: Date) => {
    const session = await auth();
    if (!session?.user || session.user.role === 'admin') {
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
                        profileImage: true,
                        phoneNumber: true
                    }
                },
                userScheduler: {
                    select: {
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                        phoneNumber: true
                    }
                }
            }
        })

        return {
            ok :  true,
            appointments
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Server Error'
        }
    }
}