"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { AppointmentList } from "./AppointmentList";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { AppointmentCalendar } from "../calendar/AppointmentCalendar";
import { getAppointmentsByUser } from "@/actions";
import { AppoinmentWithUsers } from "@/interfaces";
import { SpinnerCircle } from "@/components";

interface Props {
  initialAppointments: AppoinmentWithUsers[];
}

export const AppointmentSection = ({ initialAppointments }: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [appointments, setAppoinments] = useState(initialAppointments);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickDate = async (e: Date) => {
    setIsLoading(true);
    setCurrentDate(dayjs(e));

    const res = await getAppointmentsByUser(dayjs(e).toDate());
    if (res.ok && res.appointments) {
      setAppoinments(res.appointments);
    }
    setIsLoading(false);
  };

  const nextDay = async () => {
    setIsLoading(true);
    setCurrentDate((currentDate) => currentDate.add(1, "day"));
    const res = await getAppointmentsByUser(currentDate.add(1, "day").toDate());
    if (res.ok && res.appointments) {
      setAppoinments(res.appointments);
    }
    setIsLoading(false);
  };

  const prevDay = async () => {
    setIsLoading(true);
    setCurrentDate((currentDate) => currentDate.subtract(1, "day"));
    const res = await getAppointmentsByUser(
      currentDate.subtract(1, "day").toDate()
    );
    if (res.ok && res.appointments) {
      setAppoinments(res.appointments);
    }
    setIsLoading(false);
  };

  return (
    <>
      <AppointmentCalendar onDateClick={handleClickDate} />
      <section className=" px-3 pt-10 sm:py-3 ">
        <div className=" flex justify-between pb-4 items-center">
          <h2 className=" text-lg sm:text-xl font-semibold">
            {currentDate.locale("es").format("ddd D [de] MMMM [de] YYYY")}
          </h2>
          <div className=" flex space-x-0.5 items-center">
            <IconChevronLeft
              onClick={prevDay}
              stroke={2}
              className=" size-8 hover:cursor-pointer hover:text-white/70 "
            />
            <IconChevronRight
              stroke={2}
              onClick={nextDay}
              className=" size-8 hover:cursor-pointer hover:text-white/70 "
            />
          </div>
        </div>
        {!isLoading &&
          (appointments.length ? (
            <AppointmentList appointments={appointments} />
          ) : (
            <div className=" text-sm text-white/70 text-center py-6">
              No se encontraron citas para este día.
            </div>
          ))}
        {isLoading && (
          <div className=" py-6">
            <SpinnerCircle size={40} />
          </div>
        )}
      </section>
    </>
  );
};
