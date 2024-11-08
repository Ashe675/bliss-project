"use client";
import AppoinmentListItem from "./AppointmentListItem";
import { AppoinmentWithUsers } from "@/interfaces";
import {
  AcceptAppointmentModal,
  CancelAppointmentModal,
  DeclineAppointmentModal,
} from "@/components";
import { useState } from "react";

interface Props {
  appointments: AppoinmentWithUsers[];
  refreshDayByDate: (e: Date) => void;
}

export enum ModalType {
  None = "NONE",
  Cancel = "CANCEL",
  Accept = "ACCEPT",
  Decline = "DECLINE",
}


export const AppointmentList = ({ appointments, refreshDayByDate }: Props) => {
  const [appointmentSelected, setAppointmentSelected] =
    useState<AppoinmentWithUsers>();

  const [modalType, setModalType] = useState<ModalType>(ModalType.None);

  const closeModal = () => {
    setModalType(ModalType.None);
    setAppointmentSelected(undefined);
  };

  return (
    <>
      <div className=" flex flex-col gap-y-3">
        {appointments.map((appointment) => (
          <AppoinmentListItem
            key={appointment.id}
            appointment={appointment}
            setAppointmentSelected={setAppointmentSelected}
            setModalType={setModalType}
            modalType ={ modalType}
          />
        ))}
      </div>
      {true && (
        <CancelAppointmentModal
          appointment={appointmentSelected}
          isOpen={modalType === ModalType.Cancel}
          closeModal={closeModal}
          setAppointmentSelected={setAppointmentSelected}
          refreshDayByDate={refreshDayByDate}
        />
      )}
      <AcceptAppointmentModal
        appointment={appointmentSelected}
        isOpen={modalType === ModalType.Accept}
        closeModal={closeModal}
        setAppointmentSelected={setAppointmentSelected}
        refreshDayByDate = {refreshDayByDate}
      />
      <DeclineAppointmentModal
        appointment={appointmentSelected}
        isOpen={modalType === ModalType.Decline}
        closeModal={closeModal}
        setAppointmentSelected={setAppointmentSelected}
        refreshDayByDate = {refreshDayByDate}
      />
    </>
  );
};
