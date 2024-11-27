'use server';

import prisma from "@/lib/prisma";
import { StatusAppointment } from "@prisma/client";

export async function postClientAppoinment(data: {
  appointmentDate: Date;
  status: StatusAppointment;
  userSchedulerId: string;
  userScheduledId: string;
  description: string;
}) {
try {
  console.log('Datos recibidos para crear cita:', data);
  
  const newAppoinment = await prisma.appointment.create({
    data: {
      appointmentDate: data.appointmentDate,  
      status: "pending",
      userSchedulerId: data.userSchedulerId,
      userScheduledId: data.userScheduledId,
      description: data.description,
    },
  });

  console.log('Cita creada con éxito:', newAppoinment);
  return { success: true, review: newAppoinment };
} catch (error) {
  console.error('Error al crear la cita:', error);
  return { success: false, error: 'Error al crear la cita' };
}
}
