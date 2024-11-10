import { getAppointmentsByStatus } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import { AppointmentList } from "./AppointmentList";

interface Props {
  refreshDayByDate: (e: Date) => void;
}

export const PendingAppointments = ({ refreshDayByDate }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments", "pending"],
    queryFn: () => getAppointmentsByStatus("pending"),
  });

  if (isLoading) return <div>Cargando...</div>;

  if (data)
    return (
      <div>
        {data.data?.appointments && data.data?.appointments.length ? (
          <AppointmentList
            appointments={data.data.appointments}
            refreshDayByDate={refreshDayByDate}
          />
        ) : (
          <div className=" text-sm text-white/70 text-center py-6">
            No se encontraron solicitudes.
          </div>
        )}
      </div>
    );
};
