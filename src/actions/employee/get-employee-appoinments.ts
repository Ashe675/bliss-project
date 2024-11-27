'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface Response {
    ok: boolean;
    appointments?: {
        id: string;
        appointmentDate: Date;
        finalDate: Date | null;
    }[];
    message?: string;
}

export const getEmployeeAppoinments = async (employeeId: string): Promise<Response> => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: "Acceso denegado",
        };
    }

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                OR: [
                    {
                        userScheduledId: employeeId,
                    },
                    {
                        userSchedulerId: employeeId,
                    },
                ],
            },
            select: {
                id: true,
                appointmentDate: true,
                finalDate: true,
            },
            orderBy: {
                appointmentDate: "asc",
            },
        });

        return {
            ok: true,
            appointments
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: "Server Error",
        };
    }
};
