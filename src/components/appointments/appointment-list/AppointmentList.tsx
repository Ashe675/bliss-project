"use client";
import AppoinmentListItem from "./AppoinmentListItem";
import { AppoinmentWithUsers } from "@/interfaces";
import { CancelAppointmentModal } from "@/components";
import { useState } from "react";

interface Props {
  appointments: AppoinmentWithUsers[];
}

export const AppointmentList = ({ appointments }: Props) => {
  const [appointmentSelected, setAppointmentSelected] =
    useState<AppoinmentWithUsers>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className=" flex flex-col gap-y-3">
        {appointments.map((appointment) => (
          <AppoinmentListItem
            key={appointment.id}
            appointment={appointment}
            setAppointmentSelected={setAppointmentSelected}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
      {appointmentSelected && (
        <CancelAppointmentModal
          appointment={appointmentSelected}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          setAppointmentSelected={setAppointmentSelected}
        />
      )}
    </>
  );
};
