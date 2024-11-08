import { CustomModal } from "@/components";
import { AppoinmentWithUsers } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";
import { AppointmentInfo } from "../appointment-info/AppointmentInfo";
import { CustomButton } from "@/components/ui/buttons/CustomButton";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  appointment: AppoinmentWithUsers | undefined;
  setAppointmentSelected: Dispatch<
    SetStateAction<AppoinmentWithUsers | undefined>
  >;
}

export const DeclineAppointmentModal = ({
  isOpen,
  closeModal,
  appointment,
  setAppointmentSelected,
}: Props) => {
  const handleClickBackdrop = () => {
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
              type="cancel"
              className=" w-full  "
            >
              Cerrar
            </CustomButton>
            <CustomButton type="success" className=" w-full ">
              Rechazar Cita
            </CustomButton>
          </div>
        </>
      )}
    </CustomModal>
  );
};
