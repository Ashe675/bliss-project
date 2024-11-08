"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import "./styles.css";
import {
  DatesSetArg,
  EventContentArg,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { useEffect, useState } from "react";
import { getAppointmentsByMonth } from "@/actions";
import { SpinnerCircle } from "@/components/ui/loaders/spinner-circle/SpinnerCircle";

interface Props {
  onDateClick: (e: Date) => void;
}

export const AppointmentCalendar = ({ onDateClick }: Props) => {
  const [appoinments, setAppoinments] = useState<EventSourceInput>();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e: DateClickArg) => {
    onDateClick(e.date);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleDateSets = async (arg: DatesSetArg) => {
    const res = await getAppointmentsByMonth(arg.start, arg.end);
    if (!res.ok || !res.data) return;
    const appoinmentsEvents: EventSourceInput =
      res.data.appointments?.map((appoinment) => ({
        title: appoinment.description,
        start: appoinment.appointmentDate,
        end: appoinment.finalDate!,
        extendedProps: {
          status: appoinment.status,
        },
      })) ?? [];

    setAppoinments(appoinmentsEvents);
  };

  return (
    <div className=" p-3 sm:px-0 ">
      {isLoading ? (
        <div
          className=" py-3 h-[420px] flex justify-center"
        >
          <SpinnerCircle size={60} />
        </div>
      ) : (
        <FullCalendar
          eventTimeFormat={{
            // like '14:30:00'
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }}
          // eventClick={handleEvent}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          eventInteractive={false}
          initialView="dayGridMonth"
          allDayText="Todo el dia"
          eventColor="#4E1504"
          eventContent={renderEventContent}
          datesSet={handleDateSets}
          dayHeaderClassNames={" text-xs sm:text-sm"}
          slotLabelFormat={{ hour: "numeric", hour12: true, minute: "2-digit" }}
          locale={"es"}
          dateClick={handleClick}
          dayCellClassNames={
            " relative hover:cursor-pointer hover:bg-secondary transition-all z-10"
          }
          events={appoinments}
          buttonText={{
            day: "Dias",
            today: "Mes Actual",
            month: "Mes",
            week: "Semana",
          }}
          nowIndicator
          height={420}
          dayMaxEventRows={1}
          moreLinkText={"citas"}
          moreLinkClassNames={
            " text-center hover:cursor-default hover:bg-inherint flex w-full justify-center"
          }
          moreLinkClick={"none"}
          headerToolbar={{
            start: "title",
            // end: "today,prev,next,dayGridMonth,timeGridWeek,timeGridDay",
            end: "today,prev,next",
          }}
        />
      )}
    </div>
  );
};

function renderEventContent(event: EventContentArg) {
  return (
    <div
      className={` relative  mx-auto size-2   ${
        event.isPast ? "bg-gray-400" : "bg-yellow-500"
      } rounded-full `}
    />
  );
}
