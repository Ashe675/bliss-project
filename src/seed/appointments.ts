import { UserData } from "../interfaces";
import bcryptjs from 'bcryptjs';

interface AppointmentData {
    appointmentDate: Date;
    finalDate : Date;
    description: string;
    userScheduler: UserData;
    userScheduled: UserData['user']
}

// Usuarios programados posibles
const userScheduledOptions = [
    "jmartinez_employee", 
    "mgomez_employee", 
    "lvasquez_employee", 
    "dhernandez_employee", 
    "rsanchez_employee", 
    "pcastro_employee", 
    "cortega_employee", 
    "rramirez_employee"
];

// Generar appointments
export const appointments: AppointmentData[] = [];

userScheduledOptions.forEach((userScheduled, index) => {
    appointments.push(
        {
            appointmentDate: new Date(new Date().setDate(new Date().getDate() - 1)), // Ayer
            finalDate : new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(new Date().getHours() + 1)),
            description: `Corte de cabello ${index}`,
            
            userScheduler: {
                firstName: "John",
                lastName: "Doe",
                user: `johndoe${index}@google.com`,
                email: `johndoe${index}@google.com`,
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: "user"
            },
            userScheduled: userScheduled
        },
        {
            appointmentDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Mañana
            finalDate : new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 1)),
            description: `Alisado de cabello ${index}`,
            userScheduler: {
                firstName: "Jane",
                lastName: "Smith",
                user: `janesmith${index}@google.com`,
                email: `janesmith${index}@google.com`,
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: "user"
            },
            userScheduled: userScheduled
        },
        {
            appointmentDate: new Date(new Date().setDate(new Date().getDate() + 2)), // Pasado mañana
            finalDate : new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(new Date().getHours() + 1)),
            description: `Planchado de cabello ${index}`,
            userScheduler: {
                firstName: "Alice",
                lastName: "Brown",
                user: `alicebrown${index}@google.com`,
                email: `alicebrown${index}@google.com`,
                password: bcryptjs.hashSync('123456', 10),
                verified: true,
                role: "user"
            },
            userScheduled: userScheduled
        }
    );
});