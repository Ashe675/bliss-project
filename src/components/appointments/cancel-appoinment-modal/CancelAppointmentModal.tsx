"use client";

import { cancelAppoinment } from "@/actions";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { ErrorMessageSmall } from "@/components/ui/error-message/ErrorMessageSmall";
import CustomModal from "@/components/ui/modal/CustomModal";
import {
  notifyError,
  notifySuccess,
} from "@/components/ui/toast-notification/ToastNotification";
import { AppoinmentWithUsers } from "@/interfaces";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  appointment: AppoinmentWithUsers | undefined;
  setAppointmentSelected: Dispatch<
    SetStateAction<AppoinmentWithUsers | undefined>
  >;
  handleClickDate: (e: Date) => void;
}

interface FormData {
  cancelMessage: string;
}

export const CancelAppointmentModal = ({
  isOpen,
  setIsOpen,
  appointment,
  setAppointmentSelected,
  handleClickDate
}: Props) => {
  const handleCancelClick = () => {
    setIsOpen(false);
    setAppointmentSelected(undefined);
    reset();
  };
  
  const router = useRouter();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!appointment) return;
    const response = await cancelAppoinment(appointment.id, data.cancelMessage);
    if (!response.ok) return notifyError({ message: response.message });
    notifySuccess({ message: response.message });
    router.refresh()
    handleClickDate(appointment.appointmentDate)
    setIsOpen(false);
    reset();
    setAppointmentSelected(undefined);
  };

  const handleClickBackdrop = () => {
    reset();
  }

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} onClickBackDrop={handleClickBackdrop}>
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
              <CustomButton disabled={isLoading} type="cancel" onClick={handleCancelClick}>
                No Cancelar
              </CustomButton>
              <CustomButton disabled={isLoading} type="success" isSubmit={true}>
                Cancelar cita
              </CustomButton>
            </div>
          </form>
        </>
      )}
    </CustomModal>
  );
};
