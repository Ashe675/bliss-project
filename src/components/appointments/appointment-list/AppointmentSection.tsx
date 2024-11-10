"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { AppointmentList } from "./AppointmentList";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { AppointmentCalendar } from "../appointment-calendar/AppointmentCalendar";
import { getAppointmentsByUser, getTotalAppointmentsByStatus } from "@/actions";
import { AppoinmentWithUsers } from "@/interfaces";
import { SpinnerCircle } from "@/components";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { PendingAppointments } from "./PendingAppointments";
import { useQuery } from "@tanstack/react-query";

interface Props {
  initialAppointments: AppoinmentWithUsers[];
}

export const AppointmentSection = ({ initialAppointments }: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [appointments, setAppoinments] = useState(initialAppointments);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["total", "appointments", "pending"],
    queryFn: () => getTotalAppointmentsByStatus("pending"),
  });

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
      <section className="  pt-3 sm:py-3 sm:pl-6 sm:pr-3">
        <TabGroup>
          <TabList className={` space-x-3 sm:pt-1.5`}>
            <Tab
              className={` p-1.5 bg-secondary/40 text-white/50 font-semibold rounded-md px-3 data-[hover]:bg-secondary/80 transition-all data-[selected]:bg-primary data-[selected]:text-white`}
            >
              Citas
            </Tab>
            <Tab
              className={` p-1.5 bg-secondary/40 text-white/50 font-semibold rounded-md px-3 data-[hover]:bg-secondary/80 transition-all data-[selected]:bg-primary data-[selected]:text-white relative`}
            >
              Solicitudes
              {data?.data?.totalAppointments != undefined &&
                data.data.totalAppointments > 0 && (
                  <div className=" size-4 flex items-center justify-center bg-yellow-500 rounded-full absolute -right-1 -top-1 text-[10px] font-bold text-white">
                    {data.data.totalAppointments}
                  </div>
                )}
            </Tab>
          </TabList>
          <TabPanels className={` pt-3`}>
            <TabPanel>
              <div className=" flex justify-between pb-4 items-center">
                <h2 className=" text-lg sm:text-xl ">
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
                  <AppointmentList
                    appointments={appointments}
                    refreshDayByDate={handleClickDate}
                  />
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
            </TabPanel>
            <TabPanel>
              <PendingAppointments refreshDayByDate={handleClickDate} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </section>
    </>
  );
};
