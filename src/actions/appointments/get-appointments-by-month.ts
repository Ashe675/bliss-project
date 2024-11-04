'use server';

import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";

import { Appoinment } from "@/interfaces";
import { Session } from "next-auth";

interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user']
        appointments?: Appoinment[]
    },
    message?: string;
}

export const getAppointmentsByMonth = async (startDate: Date, finalDate: Date): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee', 'user'])
    if (!resAuthorize.ok) return resAuthorize

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                OR: [
                    {
                        userScheduledId: resAuth.data?.user.id
                    },
                    {
                        userSchedulerId: resAuth.data?.user.id
                    }
                ],
                appointmentDate: {
                    gte: startDate,
                    lte: finalDate
                }
            }
        })

        return {
            ok: true,
            status: 200,
            data: {
                appointments: appointments
            }
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