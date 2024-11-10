'use server';

import { AppoinmentWithUsers } from "@/interfaces";
import prisma from "@/lib/prisma";
import { authorizeRole, isAuthenticate } from "@/utils";
import { StatusAppointment } from "@prisma/client";
import { Session } from "next-auth";

import { z } from "zod";


interface Response {
    ok: boolean;
    status: number;
    data?: {
        user?: Session['user']
        appointments?: AppoinmentWithUsers[]
    },
    message?: string;
}

const RequestSchema = z.object({
    status:
        z.enum(["pending", "accepted", "declined", "canceled"])
})


export const getAppointmentsByStatus = async (status: StatusAppointment): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee', 'user'])
    if (!resAuthorize.ok) return resAuthorize

    const safeData = RequestSchema.safeParse({ status })

    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }

    const { user } = resAuth.data!;

    try {
        const appointmentsByStatus = await prisma.appointment.findMany({
            where: {
                status: status,
                OR: [
                    {
                        userScheduledId: user.id
                    },
                    {
                        userSchedulerId: user.id
                    }
                ],
                appointmentDate: {
                    gte: new Date()
                }
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

        return {
            ok: true,
            status: 200,
            data: {
                appointments: appointmentsByStatus
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