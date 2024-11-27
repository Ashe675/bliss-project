"use client";
import { getPaginationAppointmentsByStatus } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import { AppointmentList } from "./AppointmentList";
import { SpinnerCircle } from "@/components/ui/loaders/spinner-circle/SpinnerCircle";
import { useState } from "react";
import { Pagination } from "@mui/material";

interface Props {
  refreshDayByDate: (e: Date) => void;
}

export const PendingAppointments = ({ refreshDayByDate }: Props) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["appointments", "pending", page],
    queryFn: () =>
      getPaginationAppointmentsByStatus({ status: "pending", page, take: 10 }),
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading)
    return (
      <div className="py-8">
        <SpinnerCircle size={40} />
      </div>
    );

  if (data)
    return (
      <div className=" pt-3">
        {data.data?.appointments && data.data?.appointments.length ? (
          <>
            <AppointmentList
              appointments={data.data.appointments}
              refreshDayByDate={refreshDayByDate}
            />
            <Pagination
              count={data.data.totalPages}
              page={data.data.page}
              onChange={handleChange}
              className=" flex justify-center my-5"
            />
          </>
        ) : (
          <div className=" text-sm text-white/70 text-center py-6">
            No se encontraron solicitudes.
          </div>
        )}
      </div>
    );
};
