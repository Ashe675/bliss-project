import { AppoinmentWithUsers } from "@/interfaces";
import { formatToSpanishDateTime } from "@/lib/date/date";

interface Props {
  appointment: AppoinmentWithUsers;
}

export const AppointmentInfo = ({ appointment }: Props) => {
  return (
    <div className=" bg-black/25 rounded-md p-2">
      <span className=" font-semibold">Fecha solicitada:</span>
      <p className=" mb-2">{formatToSpanishDateTime(appointment.appointmentDate)}</p>
      <span className=" font-semibold">Descripción de la cita:</span>
      <p>{appointment.description}</p>
    </div>
  );
};
