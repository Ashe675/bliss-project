import { StatusAppointment } from "@prisma/client";

export interface UserAppointment {
    firstName: string;
    lastName: string;
    profileImage: string | null;
    phoneNumber: string | null;
}

export interface AppoinmentWithUsers {
    id: string;
    appointmentDate: Date;
    status: StatusAppointment
    description: string
    response?: string | null
    createdAt: Date;
    userScheduler: UserAppointment
    userSchedulerId: string
    userScheduled: UserAppointment
    userScheduledId: string
    finalDate?: Date | null
}

export interface Appoinment {
    id: string;
    appointmentDate: Date;
    status: StatusAppointment
    description: string
    response?: string | null
    createdAt: Date;
    userScheduler?: UserAppointment
    userSchedulerId: string
    userScheduled?: UserAppointment
    userScheduledId: string
    finalDate?: Date | null
}