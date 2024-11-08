"use client";
import { CustomModal } from "@/components";
import { AppoinmentWithUsers, AppointmentRange } from "@/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AppointmentInfo } from "../appointment-info/AppointmentInfo";
import CustomTimePicker from "../date-time-pickers/CustomTimePicker";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import dayjs, { Dayjs } from "dayjs";
import {
  acceptAppointmentById,
  getAppointmentsAcceptedByDayRange,
} from "@/actions";
import { ErrorMessageSmall } from "@/components/ui/error-message/ErrorMessageSmall";
import { TimeValidationError } from "@mui/x-date-pickers/models";
import { notifyError } from "@/components/ui/toast-notification/ToastNotification";
import { notifySuccess } from "../../ui/toast-notification/ToastNotification";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  appointment: AppoinmentWithUsers | undefined;
  setAppointmentSelected: Dispatch<
    SetStateAction<AppoinmentWithUsers | undefined>
  >;
}

export const AcceptAppointmentModal = ({
  isOpen,
  closeModal,
  appointment,
  setAppointmentSelected,
}: Props) => {
  const handleClickBackdrop = () => {
    setAppointmentSelected(undefined);
  };
  const [error, setError] = useState(
    "La hora final debe ser mayor que la hora de la cita."
  );
  const router = useRouter()

  const [finalDate, setFinalDate] = useState<Dayjs | null>(
    dayjs(appointment?.appointmentDate)
  );
  
  const [appointmentsRange, setAppoinmentsRange] =
    useState<AppointmentRange[]>();

  const handleErrorDate = (error: TimeValidationError) => {
    if (
      error === "shouldDisableTime-hours" ||
      error === "shouldDisableTime-minutes" ||
      error === "shouldDisableTime-seconds"
    ) {
      return setError("Horario no disponible");
    }
    setError("Horario no válido");
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setError("");
    setFinalDate(newValue);
    if (newValue?.isSame(dayjs(appointment?.appointmentDate))) {
      setError("La hora final debe ser mayor que la hora de la cita.");
    }
  };

  useEffect(() => {
    const fetchAppointmentsRange = async () => {
      if (appointment) {
        setFinalDate(dayjs(appointment.appointmentDate));
        const data = await getAppointmentsAcceptedByDayRange(
          appointment.appointmentDate
        );
        if (data.ok && data.data && data.data.appointmentsRange) {
          setAppoinmentsRange(data.data.appointmentsRange);
        }
      }
    };
    fetchAppointmentsRange();
  }, [appointment]);

  const handleClickAccept = async () => {
    if (!appointment || !finalDate) return;
    const response = await acceptAppointmentById(appointment.id, finalDate.toDate());
    if (!response.ok) return notifyError({ message: response.message });
    router.refresh()
    closeModal()
    notifySuccess({ message: response.message });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      onClickBackDrop={handleClickBackdrop}
    >
      {appointment && (
        <>
          <h2 className=" text-xl pb-2 ">
            ¿Seguro que desea aceptar la cita de{" "}
            <span className=" font-bold">
              {appointment.userScheduler.firstName +
                " " +
                appointment.userScheduler.lastName}
            </span>
            ?
          </h2>
          <AppointmentInfo appointment={appointment} />
          <div className=" mt-2">Seleccione la hora final de la cita</div>
          <div className=" mt-3">
            <CustomTimePicker
              date={finalDate}
              disableDate={appointment.appointmentDate}
              datesDisable={appointmentsRange ?? []}
              handleChange={handleChangeDate}
              handleError={handleErrorDate}
            />
            {error && <ErrorMessageSmall>*{error}</ErrorMessageSmall>}
          </div>
          <div className=" pt-4 flex w-full justify-between gap-3">
            <CustomButton
              onClick={closeModal}
              type="cancel"
              className=" w-full"
            >
              Cerrar
            </CustomButton>
            <CustomButton
              type="success"
              className=" w-full"
              disabled={!!error}
              onClick={handleClickAccept}
            >
              Aceptar Cita
            </CustomButton>
          </div>
        </>
      )}
    </CustomModal>
  );
};
