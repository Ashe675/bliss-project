"use client";

import { cancelAppointment } from "@/actions";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { ErrorMessageSmall } from "@/components/ui/error-message/ErrorMessageSmall";
import { CustomModal } from "@/components";
import {
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification/ToastNotification";
import { AppoinmentWithUsers } from "@/interfaces";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  appointment: AppoinmentWithUsers | undefined;
  setAppointmentSelected: Dispatch<
    SetStateAction<AppoinmentWithUsers | undefined>
  >;
  refreshDayByDate: (e: Date) => void;
}

interface FormData {
  cancelMessage: string;
}

export const CancelAppointmentModal = ({
  isOpen,
  closeModal,
  appointment,
  setAppointmentSelected,
  refreshDayByDate,
}: Props) => {
  const handleCancelClick = () => {
    closeModal();
    setAppointmentSelected(undefined);
    reset();
  };
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!appointment) return;
    setIsLoading(true);
    const response = await cancelAppointment(
      appointment.id,
      data.cancelMessage.trim().replace(/\s+/, " ")
    );
    if (!response.ok) {
      setIsLoading(false);
      return notifyError({ message: response.message });
    }
    notifySuccess({ message: response.message });
    router.refresh();
    refreshDayByDate(appointment.appointmentDate);
    closeModal();
    reset();
    setIsLoading(false);
    setAppointmentSelected(undefined);
  };

  const handleClickBackdrop = () => {
    reset();
    setAppointmentSelected(undefined);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      onClickBackDrop={handleClickBackdrop}
    >
      {appointment && (
        <>
          <h2 className=" text-xl py-2 ">
            ¿Seguro que desea cancelar la cita de{" "}
            <span className=" font-bold">
              {appointment.userScheduler.firstName +
                " " +
                appointment.userScheduler.lastName}
            </span>
            ?
          </h2>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="cancelMessage" className=" py-1 block ">
              Motivo:
            </label>
            <textarea
              {...register("cancelMessage", {
                minLength: {
                  value: 5,
                  message: "Motivo muy corto",
                },
                validate: (value) => {
                  return value.trim().replace(/\s+/, "").length >= 5
                    ? true
                    : "Motivo muy corto";
                },
                maxLength: {
                  value: 150,
                  message: "Motivo muy largo",
                },
                required: "El motivo es requerido",
              })}
              maxLength={150}
              name="cancelMessage"
              placeholder="Ingrese el motivo de la cancelación (no más de 100 caracteres)"
              className="bg-white/5 font-light outline-none text-white/90 rounded-md p-1.5 px-2 w-full resize-none h-28"
            />
            {errors.cancelMessage && (
              <ErrorMessageSmall>
                *{errors.cancelMessage.message}
              </ErrorMessageSmall>
            )}
            <div className=" flex justify-between flex-wrap py-2 pt-3 ">
              <CustomButton
                disabled={isLoading}
                type="cancel"
                onClick={handleCancelClick}
              >
                No Cancelar
              </CustomButton>
              <CustomButton
                disabled={isLoading || !!errors.cancelMessage}
                type="success"
                isSubmit={true}
              >
                Cancelar cita
              </CustomButton>
            </div>
          </form>
        </>
      )}
    </CustomModal>
  );
};
