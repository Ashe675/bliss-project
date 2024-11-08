"use client";

import { AppoinmentWithUsers } from "@/interfaces";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconDotsVertical, IconXboxXFilled } from "@tabler/icons-react";
import Image from "next/image";
import { formatDateTo12Hour, formatToLatinDateTime } from "@/lib/date/date";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { ModalType } from "./AppointmentList";

enum StatusAppointment {
  pending = "pending",
  accepted = "accepted",
  declined = "declined",
  canceled = "canceled",
}

interface Props {
  appointment: AppoinmentWithUsers;
  setAppointmentSelected: Dispatch<
    SetStateAction<AppoinmentWithUsers | undefined>
  >;
  setModalType: Dispatch<SetStateAction<ModalType>>;
  modalType: ModalType;
}

export default function AppoinmentListItem({
  appointment,
  setAppointmentSelected,
  setModalType,
  modalType,
}: Props) {
  const { data: session } = useSession();
  const isTheSameUser = session?.user.id === appointment.userSchedulerId;
  const showUser = isTheSameUser
    ? appointment.userScheduled
    : appointment.userScheduler;

  const handleClickCancel = () => {
    setAppointmentSelected(appointment);
    setModalType(ModalType.Cancel);
  };

  const handleDeclineAppointment = () => {
    setAppointmentSelected(appointment);
    setModalType(ModalType.Decline);
  };
  const handleAcceptAppointment = () => {
    setAppointmentSelected(appointment);
    setModalType(ModalType.Accept);
  };

  if (appointment.status === StatusAppointment.declined && !isTheSameUser)
    return null;

  return (
    <div
      className={` flex relative ${
        appointment.status === StatusAppointment.canceled && "text-white/60"
      }`}
    >
      {appointment.status === StatusAppointment.pending && (
        <div className=" absolute size-4 bg-yellow-500 rounded-full  -top-1 -right-1" />
      )}
      <div
        className={clsx(
          " flex flex-col p-2 w-24 xl:w-44 text-center justify-center items-center rounded-l-md divide-y border-white/20",
          {
            "bg-zinc-700": appointment.status === StatusAppointment.canceled,
            "bg-zinc-600/35": appointment.status === StatusAppointment.declined,
            "bg-gradient-to-t from-[#311502] to-[#4A1404]":
              appointment.status === StatusAppointment.accepted,
            "bg-secondary": appointment.status === StatusAppointment.pending,
          }
        )}
      >
        {(appointment.status === StatusAppointment.accepted ||
          appointment.status === StatusAppointment.canceled) && (
          <>
            <span className=" py-0.5 text-[13px] sm:text-sm xl:text-base">
              {formatDateTo12Hour(appointment.appointmentDate)}
            </span>
            <span className=" py-0.5 text-[13px] sm:text-sm xl:text-base">
              {formatDateTo12Hour(appointment.finalDate!)}
            </span>
          </>
        )}
        {(appointment.status === StatusAppointment.pending ||
          (isTheSameUser &&
            appointment.status === StatusAppointment.declined)) && (
          <div>
            {appointment.status === StatusAppointment.pending ? (
              <div className=" bg-yellow-500 uppercase text-xs p-1 mb-1 font-bold rounded-full">
                Solicitud
              </div>
            ) : (
              <div className=" bg-red-500 uppercase text-[0.6rem] xl:text-xs p-1 mb-1 font-bold rounded-full">
                Solicitud Rechazada
              </div>
            )}
            <span className=" py-0.5 text-sm xl:text-base">
              Fecha solicitada:{" "}
              <span className=" font-bold ">
                {formatToLatinDateTime(appointment.appointmentDate)}
              </span>
            </span>
          </div>
        )}
      </div>
      <div
        className={clsx(" flex w-full text-sm p-2 rounded-r-md ", {
          "bg-zinc-700": appointment.status === StatusAppointment.canceled,
          "bg-zinc-600/35": appointment.status === StatusAppointment.declined,
          "bg-gradient-to-t from-[#180000] to-[#250F00] pr-1":
            appointment.status === StatusAppointment.accepted,
          "bg-secondary": appointment.status === StatusAppointment.pending,
        })}
      >
        <div className=" flex-1 flex flex-col gap-y-2">
          <div className=" flex gap-x-2 items-center">
            <Image
              height={20}
              width={20}
              src={showUser.profileImage ?? "/user/user-placeholder.webp"}
              alt={`Imagen perfil de ${showUser.firstName}`}
              className=" rounded-full"
            />{" "}
            <div className=" flex justify-between w-full items-center ">
              <div className=" flex flex-wrap gap-x-2 items-center max-w-[135px] md:max-w-[148px] xl:max-w-[300px] ">
                {showUser.firstName + " " + showUser.lastName}{" "}
                {!isTheSameUser && (
                  <span className=" text-xs truncate">
                    {showUser.user.split("@")[0]}
                  </span>
                )}
              </div>

              {appointment.status === StatusAppointment.canceled && (
                <span className=" p-1 text-xs uppercase">Cancelada</span>
              )}
            </div>
          </div>
          <p className=" flex-1 text-white/60">{appointment.description}</p>
          {appointment.status === StatusAppointment.canceled &&
            appointment.cancelMessage && (
              <div className=" p-2 bg-zinc-500 rounded-md">
                <div className=" flex-1 text-white/60">
                  <div>Motivo de la cancelación:</div>
                  {appointment.cancelMessage}
                </div>
              </div>
            )}

          {appointment.status === StatusAppointment.pending &&
            !isTheSameUser && (
              <div className=" flex justify-between mt-5 gap-x-2">
                <CustomButton
                  type="cancel"
                  className=" text-xs py-1.5 w-full max-w-[250px]"
                  onClick={handleDeclineAppointment}
                >
                  RECHAZAR
                </CustomButton>
                <CustomButton
                  type="success"
                  className=" text-xs py-1.5 w-full max-w-[250px]"
                  onClick={handleAcceptAppointment}
                >
                  ACEPTAR
                </CustomButton>
              </div>
            )}
        </div>
        {appointment.status === StatusAppointment.accepted &&
          appointment.appointmentDate >= new Date() && (
            <Menu as={"div"}>
              <MenuButton>
                <IconDotsVertical stroke={2} />
              </MenuButton>

              {modalType === ModalType.None && (
                <MenuItems
                  transition
                  unmount
                  anchor="top end"
                  className={
                    "  bg-secondary w-40 origin-top-right rounded-md border border-white/5 p-1 transition duration-100 ease-out shadow-md data-[closed]:opacity-0"
                  }
                >
                  <MenuItem>
                    <button
                      onClick={handleClickCancel}
                      className="flex justify-center gap-x-1 px-1 items-center data-[focus]:bg-white/5 w-full rounded-md p-1 text-sm"
                    >
                      <IconXboxXFilled stroke={2} size={17} />
                      <span>Cancelar</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              )}
            </Menu>
          )}
      </div>
    </div>
  );
}
