"use client";

import { AppoinmentWithUsers } from "@/interfaces";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IconDotsVertical, IconXboxXFilled } from "@tabler/icons-react";
import Image from "next/image";
import { formatDateTo12Hour } from "../../../lib/date/date";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

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
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AppoinmentListItem({
  appointment,
  setAppointmentSelected,
  setIsModalOpen,
}: Props) {
  const { data: session } = useSession();
  const isTheSameUser = session?.user.id === appointment.userSchedulerId;
  const showUser = isTheSameUser
    ? appointment.userScheduled
    : appointment.userScheduler;

  const handleClickCancel = () => {
    setAppointmentSelected(appointment);
    setIsModalOpen(true);
  };

  return (
    <div
      className={` flex relative ${
        appointment.status === StatusAppointment.declined && "text-white/60"
      }`}
    >
      {appointment.status === StatusAppointment.declined && (
        <span className=" absolute right-1 top-1 p-1 px-2 text-xs uppercase">
          Cancelada
        </span>
      )}
      <div
        className={clsx(
          " flex flex-col text-sm  p-2 w-24 text-center justify-center rounded-l-md",
          {
            "bg-zinc-700": appointment.status === StatusAppointment.declined,
            "bg-gradient-to-t from-[#311502] to-[#4A1404]":
              appointment.status === StatusAppointment.accepted,
          }
        )}
      >
        <span>{formatDateTo12Hour(appointment.appointmentDate)}</span>
        <span>{formatDateTo12Hour(appointment.finalDate!)}</span>
      </div>
      <div
        className={clsx(" flex w-full text-sm p-2  rounded-r-md ", {
          "bg-zinc-700": appointment.status === StatusAppointment.declined,
          "bg-gradient-to-t from-[#180000] to-[#250F00]":
            appointment.status === StatusAppointment.accepted,
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
            <span>{showUser.firstName + " " + showUser.lastName}</span>
          </div>
          <p className=" flex-1 text-white/60">{appointment.description}</p>
        </div>
        {appointment.status === StatusAppointment.accepted && (
          <Menu >
            <MenuButton>
              <IconDotsVertical stroke={2} />
            </MenuButton>
            <MenuItems
              transition
              anchor="top end"
              className={
                "  bg-secondary w-40 origin-top-right rounded-md border border-white/5 p-1 transition duration-100 ease-out shadow-md "
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
          </Menu>
        )}
      </div>
    </div>
  );
}
