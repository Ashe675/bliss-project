import AppoinmentListItem from "./AppoinmentListItem";
import { AppoinmentWithUsers } from "@/interfaces";

interface Props { 
  appointments : AppoinmentWithUsers[]
}

export const AppointmentList = ({appointments} : Props) => {
  return (
    <div className=" flex flex-col gap-y-3">
      {appointments.map((appointment) => (
        <AppoinmentListItem key={appointment.id} appointment ={ appointment} />
      ))}
    </div>
  );
};
