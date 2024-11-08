'use server';

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
    appoinmetnId:
        z.string({ message: 'La cita es inválida' })
            .uuid({ message: 'Cita inválida' })
})

export const declineAppointmentById = async (appointmentId: string): Promise<Response> => {
    const resAuth = await isAuthenticate()
    if (!resAuth.ok) return resAuth

    const resAuthorize = await authorizeRole(['employee'])
    if (!resAuthorize.ok) return resAuthorize

    console.log(appointmentId)

    const safeData = RequestSchema.safeParse({ appointmentId })
    if (!safeData.success) {
        return {
            ok: false,
            status: 400,
            message: 'Datos inválidos.'
        }
    }
    const { data } = safeData;
    console.log(data)

    try {

        


        return {
            ok: true,
            status: 200,
            message: 'Nothing',
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