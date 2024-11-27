"use client";

import { CustomModal, notifyError, notifySuccess } from "@/components";
import { AppoinmentWithUsers } from "@/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { AppointmentInfo } from "../appointment-info/AppointmentInfo";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { declineAppointmentById } from "@/actions";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  appointment: AppoinmentWithUsers | undefined;
  setAppointmentSelected: Dispatch<
    SetStateAction<AppoinmentWithUsers | undefined>
  >;
  refreshDayByDate: (e: Date) => void;
}

export const DeclineAppointmentModal = ({
  isOpen,
  closeModal,
  appointment,
  setAppointmentSelected,
  refreshDayByDate,
}: Props) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const handleClickCloseModal = () => {
    if (isLoading) return;
    setAppointmentSelected(undefined);
    closeModal()
  };

  const handleClickDecline = async () => {
    if (!appointment) return;
    setIsLoading(true);
    const response = await declineAppointmentById(appointment.id);
    if (!response.ok) {
      setIsLoading(false);
      return notifyError({ message: response.message });
    }
    refreshDayByDate(appointment.appointmentDate);
    queryClient.invalidateQueries({ queryKey: ["appointments", "pending"] });
    queryClient.invalidateQueries({
      queryKey: ["total", "appointments", "pending"],
    });
    closeModal();
    notifySuccess({ message: response.message });
    setIsLoading(false);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={handleClickCloseModal}
      onClickBackDrop={handleClickCloseModal}
    >
      {appointment && (
        <>
          <h2 className=" text-xl py-2 ">
            ¿Seguro que desea rechazar la cita de{" "}
            <span className=" font-bold">
              {appointment.userScheduler.firstName +
                " " +
                appointment.userScheduler.lastName}
            </span>
            ?
          </h2>
          <AppointmentInfo appointment={appointment} />
          <div className=" pt-4 flex w-full justify-between gap-3">
            <CustomButton
              onClick={closeModal}
              disabled={isLoading}
              type="cancel"
              className=" w-full  "
            >
              Cerrar
            </CustomButton>
            <CustomButton
              type="success"
              className=" w-full "
              onClick={handleClickDecline}
              disabled={isLoading}
            >
              Rechazar Cita
            </CustomButton>
          </div>
        </>
      )}
    </CustomModal>
  );
};
