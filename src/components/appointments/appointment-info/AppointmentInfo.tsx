import { AppoinmentWithUsers } from "@/interfaces";

interface Props {
  appointment: AppoinmentWithUsers;
}

export const AppointmentInfo = ({ appointment }: Props) => {
  return (
    <div className=" bg-black/25 rounded-md p-2">
      <span className=" font-semibold">Fecha solicitada:</span>
      <p className=" mb-2">{appointment.appointmentDate.toLocaleString()}</p>
      <span className=" font-semibold">Descripción de la cita:</span>
      <p>{appointment.description}</p>
    </div>
  );
};
